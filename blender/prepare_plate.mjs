// Clear the live LCD and restore the desk behind the foreground props.
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const texture = (name) => fileURLToPath(new URL("./textures/" + name, import.meta.url));
const { data: original, info } = await sharp(texture("desk-study.png"))
  .removeAlpha().raw().toBuffer({ resolveWithObject: true });
const mask = sharp(texture("mouse-mask.png")).greyscale();
const coverage = await mask.clone().erode(3).blur(.8).raw().toBuffer();
const shadow = await mask.clone().erode(15).blur(6).raw().toBuffer();
const clean = Buffer.from(original);
const index = (x, y) => (y * info.width + x) * 3;
const soft = (n) => Math.max(0, Math.min(1, n));

// Regrade the exterior through the original drops and silhouetted trees.
// The pane edge and blue-channel mask protect the frame, lamp and desk props.
for (let y = 0; y < 588; y++) {
  for (let x = 0; x < 156; x++) {
    const out = index(x, y);
    const [r, g, b] = original.subarray(out, out + 3);
    const pane = soft((151 - .042 * y - x) / 10) * soft((588 - y) / 24);
    const blue = soft((b - r - 3) / 24) * soft((b - g - 3) / 19);
    const glass = pane * blue;
    const horizon = Math.exp(-(((y - 357) / 128) ** 2) - (((x - 43) / 132) ** 2));
    const halo = Math.exp(-(((x - 48) / 49) ** 2) - (((y - 350) / 45) ** 2));
    const sun = soft((23 - Math.hypot(x - 48, y - 350)) / 8) * soft((b - 46) / 50);
    const brightness = .28 + .72 * soft((b - 23) / 95);
    clean[out] = Math.min(255, r + glass * (15 + brightness * (98 * horizon + 126 * halo + 62 * sun)));
    clean[out + 1] = Math.min(255, g + glass * brightness * (24 * horizon + 59 * halo + 48 * sun));
    clean[out + 2] = b * (1 - .3 * glass * horizon) + 19 * glass * sun;
  }
}
// This is the same trapezoidal aperture as the modeled glass. Clearing it in
// the projection also prevents old desktop pixels appearing behind its rim.
for (let y = 237; y < 632; y++) {
  const t = (y + .5 - 237) / 395;
  const left = 431.5 + (422 - 431.5) * t;
  const right = 1257.4 + (1268 - 1257.4) * t;
  for (let x = Math.ceil(left - .5); x < right - .5; x++) {
    clean.set([30, 27, 43], index(x, y));
  }
}

// Replace the painted keyboard with the bare desk and mat for the modeled caps
// and their contact shadows. Sample the empty cloth below the original board
// to retain the left-to-right lighting and the weave.
for (let y = 713; y < 855; y++) {
  const left = Math.max(439, 503 - (y - 716) * .66);
  const right = Math.min(1145, 1089 + (y - 716) * .66);
  for (let x = Math.floor(left - 6); x < right + 6; x++) {
    const alpha = soft((y - 713) / 4) * soft((855 - y) / 9)
      * soft((x - left + 6) / 6) * soft((right + 6 - x) / 6);
    if (!alpha) continue;
    const sampleX = Math.max(447, Math.min(1137, x));
    const mat = index(sampleX, 847 + Math.abs((y - 734) % 62 - 31));
    const woodLeft = index(460, y), woodRight = index(1146, y);
    const across = soft((x - 460) / (1146 - 460));
    const onMat = soft((y - 733) / 3);
    const out = index(x, y);
    for (let ch = 0; ch < 3; ch++) {
      const timber = original[woodLeft + ch] * (1 - across) + original[woodRight + ch] * across;
      const value = timber * (1 - onMat) + original[mat + ch] * onMat;
      clean[out + ch] = Math.round(original[out + ch] * (1 - alpha) + value * alpha);
    }
  }
}

// Reconstruct the mat binding and walnut apron at the same scanline on each
// side of the old cushion so the desk edge continues through the center.
for (let y = 886; y < info.height; y++) {
  const halfWidth = 50 + 45 * Math.sqrt(y - 886);
  for (let x = 413; x < 1203; x++) {
    const alpha = soft((halfWidth + 27 - Math.abs(x - 803)) / 27) * soft((y - 886) / 5);
    if (!alpha) continue;
    const left = index(427 + Math.abs(x % 24 - 12), y);
    const right = index(1164 - Math.abs(x % 24 - 12), y);
    const across = soft((x - 435) / (1156 - 435));
    const out = index(x, y);
    for (let ch = 0; ch < 3; ch++) {
      const value = original[left + ch] * (1 - across) + original[right + ch] * across;
      clean[out + ch] = Math.round(original[out + ch] * (1 - alpha) + value * alpha);
    }
  }
}

for (let y = 677; y < info.height; y++) {
  for (let x = 1170; x < info.width; x++) {
    const shade = y > 744 ? shadow[(y-14)*info.width + Math.min(info.width-1,x+5)] : 0;
    const alpha = Math.max(coverage[y * info.width + x], shade) / 255;
    if (!alpha) continue;
    // Sample the unobstructed fabric and timber at the same distance from the lens.
    const weaveX = 1143 + Math.abs((x % 78) - 39);
    const timberX = y > 897 ? 1140 + (x % 35) : 1668 - (x % 12);
    const padEdge = 1457 + 1.25 * (y - 737);
    const onPad = soft(y - 735) * soft(padEdge - x) * soft(901 - y);
    const wood = index(y < 735 ? 1141 + x % 24 : timberX, y);
    const cloth = index(weaveX, y);
    const out = index(x, y);
    for (let ch = 0; ch < 3; ch++) {
      const sample = original[cloth + ch] * onPad + original[wood + ch] * (1 - onPad);
      clean[out + ch] = Math.round(original[out + ch] * (1 - alpha) + sample * alpha);
    }
  }
}

// Anchor the case against the woven mat with a narrow contact shadow. Measure
// distance from the rounded footprint on the same plane as the beveled case.
for (let y = 738; y < 864; y++) {
  const depth = .695 * 1300 / (y + .5 - 230);
  for (let x = 423; x < 1170; x++) {
    const lateral = (x + .5 - 836) * depth / 1300;
    const dx = Math.abs(lateral + .05) - .386;
    const dy = Math.abs(depth - 1.618) - .118;
    const distance = Math.hypot(Math.max(0, dx), Math.max(0, dy)) + Math.min(0, Math.max(dx, dy)) - .010;
    const outside = Math.max(0, distance);
    const shade = .38 * Math.exp(-outside / .005) + .12 * Math.exp(-outside / .015);
    const out = index(x, y);
    for (let ch = 0; ch < 3; ch++) clean[out + ch] *= 1 - shade;
  }
}
// Pull the purple cast out of the wall, desk mat and tower LEDs. Add soft
// neutral fill to midtones, preserving the window, lamps and deep shadows.
for (let y = 0; y < info.height; y++) {
  for (let x = 145; x < info.width; x++) {
    const out = index(x, y);
    const [r, g, b] = clean.subarray(out, out + 3);
    const light = .2126 * r + .7152 * g + .0722 * b;
    const edge = soft((x - 145) / 22);
    const violet = soft((b - g - 4) / 20) * soft((r + 39 - b) / 34);
    const tower = soft((x - 1468) / 32) * soft((y - 305) / 75) * soft((737 - y) / 30)
      * soft((b - g - 4) / 23);
    const strength = edge * (.17 + .78 * Math.max(violet, tower));
    const fill = edge * (7 + 7 * violet) * soft(light / 43) * (1 - light / 255);
    clean[out] = Math.min(255, r + (light + 3 - r) * strength + fill);
    clean[out + 1] = Math.min(255, g + (light + 2 - g) * strength + fill);
    clean[out + 2] = Math.min(255, b + (light + 1 - b) * strength + fill);
  }
}
await sharp(clean, { raw: info }).png().toFile(texture("room-projection.png"));

