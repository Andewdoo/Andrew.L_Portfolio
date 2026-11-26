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

// Warm the scene through the glass, keeping the branches, distant lit windows
// and raindrops from the study. Use the original blue cast to isolate the view.
for (let y = 0; y < 588; y++) {
  for (let x = 0; x < 160; x++) {
    const out = index(x, y);
    const [r, g, b] = original.subarray(out, out + 3);
    const pane = soft((151 - .041 * y - x) / 7) * soft((588 - y) / 18);
    const blue = soft((b - r - 7) / 18) * soft((b - g - 11) / 21);
    const glass = pane * blue;
    const sky = soft((.25 * r + .43 * g + .32 * b - 23) / 104);
    const horizon = Math.exp(-(((y - 299) / 168) ** 2));
    const distance = Math.hypot(x - 50, y - 294);
    const haze = Math.exp(-((distance / 58) ** 2));
    const sun = soft((24 - distance) / 3) * soft((sky - .22) / .29);
    const cloudY = y - .14 * x - 7 * Math.sin(x / 28);
    const clouds = Math.exp(-(((cloudY - 92) / 7) ** 2))
      + .63 * Math.exp(-(((cloudY - 119) / 5) ** 2));
    const glow = glass * sky;
    clean[out] = Math.min(255, r + glass * 12 + glow * (106 + 70 * horizon + 80 * haze + 28 * clouds) + glass * 108 * sun);
    clean[out + 1] = Math.min(255, g + glow * (16 + 37 * horizon + 74 * haze + 25 * clouds) + glass * 122 * sun);
    clean[out + 2] = Math.min(255, b * (1 - glass * (.35 + .24 * horizon)) + glow * 19 * clouds + glass * 65 * sun);
  }
}
// Restore the wall exposed by the narrower monitor. Extend the adjacent
// plaster across the old bezel, with the rest covered by the new display.
for (let y = 220; y < 656; y++) {
  const t = (y - 220) / 435;
  const left = Math.max(401, Math.floor(408 - 11 * t));
  const right = Math.ceil(1280 + 12 * t);
  for (let x = left; x < 480; x++) {
    const sampleX = left - 3 - Math.min(14, Math.round((x - left) * .35));
    // Below the steam, sample above the cup so its rim doesn't repeat.
    const wall = index(sampleX, Math.min(y, 570));
    clean.set(original.subarray(wall, wall + 3), index(x, y));
  }
  const plaster = [0, 0, 0];
  let samples = 0;
  for (let x = right + 4; x < right + 65; x += 4) {
    const [r, g, b] = original.subarray(index(x, y), index(x, y) + 3);
    if (b < g + 4) continue;
    plaster[0] += r;
    plaster[1] += g;
    plaster[2] += b;
    samples++;
  }
  for (let x = 1210; x <= right; x++) {
    const wall = index(Math.max(right + 4, 1294), Math.min(y, 496));
    for (let ch = 0; ch < 3; ch++) {
      const blend = y < 488 ? soft((right - x) / 16) : 0;
      const local = samples ? plaster[ch] / samples : original[wall + ch];
      clean[index(x, y) + ch] = original[wall + ch] * (1 - blend) + local * blend;
    }
  }
}

// Paint out the reference planter and its shadow before the modeled plant is
// rendered. The contour follows the astronaut and the backs of the hardbacks.
const planterMask = await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg"
  width="230" height="226" viewBox="1200 485 230 226">
  <path fill="white" d="M1202 491 L1310 491 Q1350 492 1372 515
    Q1395 513 1417 541 L1416 544 Q1390 542 1374 563
    L1368 584 L1373 599 L1385 605 Q1377 618 1384 636
    L1341 637 Q1336 643 1337 661 L1322 663 L1319 691
    Q1260 703 1202 692 Z"/>
</svg>`)).removeAlpha().greyscale().blur(3).raw().toBuffer();
for (let y = 485; y < 711; y++) {
  for (let x = 1200; x < 1430; x++) {
    const alpha = planterMask[(y - 485) * 230 + x - 1200] / 255;
    const out = index(x, y);
    const onDesk = soft((y - 665) / 13);
    const contact = Math.exp(-(((x - 1312) / 49) ** 2 + ((y - 682) / 7) ** 2));
    const onMat = soft((y - 692) / 16);
    for (let ch = 0; ch < 3; ch++) {
      const plaster = [97, 66, 89][ch] + [26, 14, 3][ch] * soft((x - 1290) / 97)
        - (y - 485) * .055;
      const wood = original[index(1240, y) + ch] - [.23, .13, .10][ch] * (x - 1240);
      const timber = (wood * (1 - onMat) + [80, 73, 76][ch] * onMat) * (1 - .37 * contact);
      const fill = plaster * (1 - onDesk) + timber * onDesk;
      clean[out + ch] += Math.round(alpha * (fill - clean[out + ch]));
    }
  }
}

// Remove the gold ornament from the reference spine as well as replacing its
// visible face in Blender. Sample clean cloth along the spine's diagonal.
for (let y = 650; y < 697; y++) {
  for (let x = 1347; x < 1401; x++) {
    const spineY = y - .36 * (x - 1347);
    const alpha = soft((x - 1347) / 4) * soft((1401 - x) / 4)
      * soft((spineY - 649) / 3) * soft((680 - spineY) / 3);
    const cloth = index(1345, Math.round(spineY));
    const out = index(x, y);
    for (let ch = 0; ch < 3; ch++) {
      clean[out + ch] += Math.round(alpha * (original[cloth + ch] - clean[out + ch]));
    }
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

// Restore the tabletop behind the three accents now rendered with the mouse.
for (let y = 689; y < 735; y++) {
  const left = index(1175, y), right = index(1226, y);
  for (let x = 1176; x < 1226; x++) {
    const across = (x - 1175) / 51;
    const alpha = soft((x - 1176) / 5) * soft((1226 - x) / 4)
      * soft((y - 689) / 3) * soft((735 - y) / 3);
    const out = index(x, y);
    for (let ch = 0; ch < 3; ch++) {
      const tabletop = original[left + ch] * (1 - across) + original[right + ch] * across;
      clean[out + ch] += (tabletop - clean[out + ch]) * alpha;
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

