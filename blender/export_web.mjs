import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const path = relative => fileURLToPath(new URL(relative, root));
const render = name => sharp(path("tmp/blender-desk/" + name + ".png"));
const asset = name => path("public/scene/first-person/" + name);
const { width } = await render("room").metadata();
const scale = width / 1672;
const crop = (left, top, width, height) => ({
  left: left * scale, top: top * scale, width: width * scale, height: height * scale,
});

await Promise.all([
  render("room").removeAlpha().webp({ quality: 94, smartSubsample: true, effort: 6 }).toFile(asset("room.webp")),
  render("mouse").extract(crop(1130, 655, 542, 286))
    .webp({ quality: 95, alphaQuality: 100 }).toFile(asset("hand.webp")),
  render("note").extract(crop(1038, 280, 189, 152))
    .webp({ lossless: true }).toFile(asset("skills-note.webp")),
]);
