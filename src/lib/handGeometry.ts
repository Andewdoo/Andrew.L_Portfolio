import { BufferGeometry, Float32BufferAttribute, Vector3, type Mesh } from "three";

// The keyboard pose mirrors the mouse grip, with a different wrist pitch.
export const keyboardHandCrop = [455, 690, 240, 190] as const;

// Subdivide the skin shell once, sharing edge vertices so it bends without seams.
export function buildHands(source: Mesh) {
  const geometry = source.geometry;
  const position = geometry.getAttribute("position");
  const indices = geometry.getIndex()!;
  const points: Vector3[] = [];
  const right: number[] = [];
  const left: number[] = [];
  const triangles: number[] = [];
  const edges = new Map<number, number>();

  for (let i = 0; i < position.count; i++) {
    points.push(new Vector3().fromBufferAttribute(position, i).applyMatrix4(source.matrixWorld));
  }

  function midpoint(a: number, b: number) {
    const edge = Math.min(a, b) * position.count + Math.max(a, b);
    const existing = edges.get(edge);
    if (existing !== undefined) return existing;
    const index = points.length;
    points.push(points[a].clone().lerp(points[b], 0.5));
    edges.set(edge, index);
    return index;
  }

  for (let i = 0; i < indices.count; i += 3) {
    const a = indices.getX(i), b = indices.getX(i + 1), c = indices.getX(i + 2);
    const ab = midpoint(a, b), bc = midpoint(b, c), ca = midpoint(c, a);
    triangles.push(a, ab, ca, ab, b, bc, ca, bc, c, ab, bc, ca);
  }

  for (const point of points) {
    const depth = -point.z;
    const u = 836 + 1300 * point.x / depth;
    const v = 230 - 1300 * point.y / depth;
    const x = 2 * (u - 1180), y = 2 * (v - 655);
    const relief = skinRelief(x, y);
    right.push(...point.clone().multiplyScalar(1 - relief / depth).toArray());

    const keyU = 537 - .484 * (x - 435) - .019 * (y - 336);
    const keyV = 839 + .090 * (x - 435) + .486 * (y - 336);
    const lift = 1.681 - .00155 * (v - 734) - depth + relief;
    const keyDepth = (.677 - .00031 * (840 - keyV) - .36 * (.049 + lift)) * 1300 / (keyV - 230);
    left.push((keyU - 836) * keyDepth / 1300, (230 - keyV) * keyDepth / 1300, -keyDepth);
  }

  const mouse = new BufferGeometry().setAttribute("position", new Float32BufferAttribute(right, 3));
  mouse.setIndex(triangles);
  mouse.computeVertexNormals();

  const keyboard = new BufferGeometry().setAttribute("position", new Float32BufferAttribute(left, 3));
  const reflected = [];
  for (let i = 0; i < triangles.length; i += 3) {
    reflected.push(triangles[i], triangles[i + 2], triangles[i + 1]);
  }
  keyboard.setIndex(reflected);
  keyboard.computeVertexNormals();
  return { mouse, keyboard };
}

// Depth in camera space. Broad tendon ridges sit below the smaller joint folds.
function skinRelief(x: number, y: number) {
  const tendon = Math.exp(-Math.pow((y - 244) / 79, 2));
  const spacing = x - 316 - .52 * (y - 244);
  const ridges = .0026 * Math.exp(-Math.pow(spacing / 8, 2))
    + .0019 * Math.exp(-Math.pow((spacing - 34) / 8, 2));
  const indexFold = Math.exp(-Math.pow((x - 208) / 15, 2) - Math.pow((y - 117 + 1.1 * (x - 208)) / 3, 2));
  const middleFold = Math.exp(-Math.pow((x - 307) / 13, 2) - Math.pow((y - 105 + 1.22 * (x - 307)) / 3, 2));
  const thumbPad = Math.exp(-Math.pow((x - 160) / 15, 2) - Math.pow((y - 273) / 18, 2));
  return tendon * ridges + .0027 * thumbPad - .0015 * (indexFold + middleFold);
}
