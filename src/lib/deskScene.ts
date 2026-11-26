import {
  Camera, DoubleSide, Mesh, Scene, ShaderMaterial, SRGBColorSpace,
  TextureLoader, Vector3, Vector4, WebGLRenderer, type Texture,
} from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { buildHands, keyboardHandCrop } from "./handGeometry";

export type DeskRenderer = {
  resize: () => void;
  draw: (x: number, y: number, press: number) => void;
  dispose: () => void;
};

// Project the moving rig through the same fixed camera gate as room.webp.
const vertexShader = `
  uniform vec3 motion;
  varying vec3 rest;
  varying vec3 surfaceNormal;
  void main() {
    rest = (modelMatrix * vec4(position, 1.)).xyz;
    surfaceNormal = mat3(modelMatrix) * normal;
    float row = 230. + 1300. * rest.y / rest.z;
    float grip = 1. - smoothstep(824., 952., row);
    float travel = -motion.y * .050 * grip;
    vec3 posed = rest + vec3(motion.x * .051 * grip + .36 * travel, -motion.z * .0021 * grip, -travel);
    float depth = -posed.z;
    vec2 pixel = vec2(836., 230.) + 1300. * vec2(posed.x, -posed.y) / depth;
    vec2 ndc = pixel / vec2(1672., 941.) * 2. - 1.;
    gl_Position = vec4(ndc.x * depth, -ndc.y * depth, 1.02 * depth - .202, depth);
  }`;

const fragmentShader = `
  uniform sampler2D surface;
  uniform vec4 crop;
  uniform vec3 motion;
  uniform float skin;
  uniform float cutout;
  varying vec3 rest;
  varying vec3 surfaceNormal;
  void main() {
    vec2 pixel = vec2(836., 230.) + 1300. * vec2(rest.x, -rest.y) / -rest.z;
    vec2 uv = (pixel - crop.xy) / crop.zw;
    if (any(lessThan(uv, vec2(0.))) || any(greaterThan(uv, vec2(1.)))) discard;
    gl_FragColor = texture2D(surface, vec2(uv.x, 1. - uv.y));
    if (cutout == 0.) {
      if (gl_FragColor.a < .32) discard;
      gl_FragColor.a = 1.;
    }
    vec3 lightShift = vec3(-.24 * motion.x, .16 * motion.y, .07 * motion.z);
    gl_FragColor.rgb *= 1. + skin * .22 * dot(normalize(surfaceNormal), lightShift);
    #include <colorspace_fragment>
  }`;

export async function mountDeskScene(canvas: HTMLCanvasElement, signal: AbortSignal): Promise<DeskRenderer> {
  const base = "/scene/first-person/";
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.outputColorSpace = SRGBColorSpace;
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const textures = new TextureLoader();
  const [geometry, image, keyboardImage] = await Promise.allSettled([
    loader.loadAsync(base + "mouse-rig.glb"),
    textures.loadAsync(base + "hand.webp"),
    textures.loadAsync(base + "keyboard-hand.webp"),
  ] as const);

  if (signal.aborted || geometry.status === "rejected" || image.status === "rejected" || keyboardImage.status === "rejected") {
    if (geometry.status === "fulfilled") {
      geometry.value.scene.traverse(obj => {
        if (!(obj instanceof Mesh)) return;
        obj.geometry.dispose();
        const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
        materials.forEach(material => material.dispose());
      });
    }
    if (image.status === "fulfilled") image.value.dispose();
    if (keyboardImage.status === "fulfilled") keyboardImage.value.dispose();
    renderer.dispose();
    throw new Error("Mouse rig unavailable");
  }

  const scene = new Scene();
  const camera = new Camera();
  const motion = new Vector3();
  const texture = image.value;
  const keyboardTexture = keyboardImage.value;
  for (const surface of [texture, keyboardTexture]) {
    surface.colorSpace = SRGBColorSpace;
    surface.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
  }
  function mouseMaterial(surface: Texture, skin: number) {
    return new ShaderMaterial({
      side: DoubleSide, vertexShader, fragmentShader,
      uniforms: {
        motion: { value: motion }, surface: { value: surface },
        crop: { value: new Vector4(1130, 655, 542, 286) },
        skin: { value: skin }, cutout: { value: 0 },
      },
    });
  }
  const material = mouseMaterial(texture, 0);
  const skin = mouseMaterial(texture, 1);
  // Front faces composite the keyboard patch once over the room plate.
  const keyboardMaterial = new ShaderMaterial({
    vertexShader, fragmentShader, transparent: true, depthWrite: false,
    uniforms: {
      motion: { value: new Vector3() }, surface: { value: keyboardTexture },
      crop: { value: new Vector4(...keyboardHandCrop) },
      skin: { value: 0 }, cutout: { value: 1 },
    },
  });
  const rig = geometry.value.scene;
  scene.add(rig);
  rig.updateMatrixWorld(true);
  let keyboardHand: Mesh | undefined;
  rig.traverse(obj => {
    if (!(obj instanceof Mesh)) return;
    const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
    materials.forEach(prior => prior.dispose());
    obj.material = material;
    obj.frustumCulled = false;
    if (obj.name.startsWith("Right_hand") && obj.geometry.index) {
      const hands = buildHands(obj);
      obj.geometry.dispose();
      obj.geometry = hands.mouse.applyMatrix4(obj.matrixWorld.clone().invert());
      obj.material = skin;
      keyboardHand = new Mesh(hands.keyboard, keyboardMaterial);
      keyboardHand.frustumCulled = false;
      keyboardHand.renderOrder = 1;
    }
  });
  if (keyboardHand) scene.add(keyboardHand);

  return {
    resize() {
      const width = canvas.clientWidth, height = canvas.clientHeight;
      const scale = Math.min(window.devicePixelRatio || 1, 2, 3840 / Math.max(1, width));
      renderer.setSize(Math.max(1, Math.round(width * scale)), Math.max(1, Math.round(height * scale)), false);
    },
    draw(x, y, press) {
      motion.set(x, y, press);
      renderer.render(scene, camera);
    },
    dispose() {
      rig.traverse(obj => { if (obj instanceof Mesh) obj.geometry.dispose(); });
      keyboardHand?.geometry.dispose();
      texture.dispose();
      keyboardTexture.dispose();
      material.dispose();
      skin.dispose();
      keyboardMaterial.dispose();
      renderer.dispose();
    },
  };
}
