import {
  Camera, DoubleSide, Mesh, Scene, ShaderMaterial, SRGBColorSpace,
  TextureLoader, Vector3, WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

export type DeskRenderer = {
  resize: () => void;
  draw: (x: number, y: number, press: number) => void;
  dispose: () => void;
};

// Project the moving rig through the same fixed camera gate as room.webp.
const vertexShader = `
  uniform vec3 motion;
  varying vec3 rest;
  void main() {
    rest = (modelMatrix * vec4(position, 1.)).xyz;
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
  varying vec3 rest;
  void main() {
    vec2 pixel = vec2(836., 230.) + 1300. * vec2(rest.x, -rest.y) / -rest.z;
    vec2 uv = (pixel - vec2(1130., 655.)) / vec2(542., 286.);
    gl_FragColor = texture2D(surface, vec2(uv.x, 1. - uv.y));
    if (gl_FragColor.a < .32) discard;
    gl_FragColor.a = 1.;
    #include <colorspace_fragment>
  }`;

export async function mountDeskScene(canvas: HTMLCanvasElement, signal: AbortSignal): Promise<DeskRenderer> {
  const base = "/scene/first-person/";
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.outputColorSpace = SRGBColorSpace;
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const [geometry, image] = await Promise.allSettled([
    loader.loadAsync(base + "mouse-rig.glb"),
    new TextureLoader().loadAsync(base + "hand.webp"),
  ] as const);

  if (signal.aborted || geometry.status === "rejected" || image.status === "rejected") {
    if (geometry.status === "fulfilled") {
      geometry.value.scene.traverse(obj => {
        if (!(obj instanceof Mesh)) return;
        obj.geometry.dispose();
        const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
        materials.forEach(material => material.dispose());
      });
    }
    if (image.status === "fulfilled") image.value.dispose();
    renderer.dispose();
    throw new Error("Mouse rig unavailable");
  }

  const scene = new Scene();
  const camera = new Camera();
  const motion = new Vector3();
  const texture = image.value;
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
  const material = new ShaderMaterial({
    side: DoubleSide, vertexShader, fragmentShader,
    uniforms: { motion: { value: motion }, surface: { value: texture } },
  });
  const rig = geometry.value.scene;
  scene.add(rig);
  rig.traverse(obj => {
    if (!(obj instanceof Mesh)) return;
    const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
    materials.forEach(prior => prior.dispose());
    obj.material = material;
    obj.frustumCulled = false;
  });

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
      texture.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
