// Draw the desktop's small icons on integer pixel grids and export crisp retina PNGs.
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const output = name => fileURLToPath(new URL(`../public/scene/desktop/${name}.png`, import.meta.url));
const palette = {
  ink: "392e4b", deep: "594461", shadow: "825e7d", lilac: "b28eb9",
  light: "d7b4d5", pink: "e4a9be", cream: "fff1df", paper: "f4d7c6",
  warm: "f4bf95", amber: "cb936f", brown: "9e6c66", blue: "81799e",
  sky: "b7b3d9", white: "ffefed", rose: "c986a2", type: "f6cad9",
  typeLight: "ffe0eb", blush: "d4a0b7", plum: "a87998", petal: "deb6d0",
};
const colors = Object.fromEntries(Object.entries(palette).map(([name, value]) =>
  [name, [0,2,4].map(i => parseInt(value.slice(i, i + 2), 16))]));

class Sprite {
  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.buffer = Buffer.alloc(w * h * 4);
  }
  rect(x, y, w, h, color) {
    for (let j = Math.max(0,y); j < Math.min(this.height,y+h); j++) {
      for (let i = Math.max(0,x); i < Math.min(this.width,x+w); i++) {
        const at = (j * this.width + i) * 4;
        this.buffer.set(colors[color], at);
        this.buffer[at + 3] = 255;
      }
    }
  }
  // A stepped corner keeps the tiny silhouette legible at its 24–40 px display size.
  box(x, y, w, h, edge, fill) {
    this.rect(x+1,y,w-2,h,edge);
    this.rect(x,y+1,w,h-2,edge);
    this.rect(x+1,y+1,w-2,h-2,fill);
  }
  polygon(points, color) {
    for (let y = 0; y < this.height; y++) {
      const intersections = [];
      for (let i = 0; i < points.length; i++) {
        const [x0,y0] = points[i], [x1,y1] = points[(i+1) % points.length];
        if ((y0 <= y+.5 && y+.5 < y1) || (y1 <= y+.5 && y+.5 < y0)) {
          intersections.push(x0 + (y+.5-y0)*(x1-x0)/(y1-y0));
        }
      }
      intersections.sort((a,b)=>a-b);
      for (let i = 0; i+1 < intersections.length; i += 2) {
        const x = Math.ceil(intersections[i]-.5);
        this.rect(x,y,Math.ceil(intersections[i+1]-.5)-x,1,color);
      }
    }
  }
  save(name, scale=8) {
    return sharp(this.buffer, { raw: { width: this.width, height: this.height, channels: 4 } })
      .resize(this.width*scale, this.height*scale, {kernel:"nearest"}).png({palette:true}).toFile(output(name));
  }
}

function folder(project) {
  const s = new Sprite(30, 24);
  s.box(1,2,13,14,"deep","amber"); s.rect(3,3,8,1,"cream");
  s.box(1,5,27,17,"deep","amber"); s.rect(3,6,23,1,"warm");
  s.polygon([[4,10],[6,8],[29,8],[30,10],[27,21],[25,23],[3,23],[1,21]],"deep");
  s.polygon([[5,10],[7,9],[28,9],[28,11],[26,20],[24,21],[3,21]],project?"pink":"warm");
  s.rect(7,9,20,1,project?"petal":"cream"); s.rect(5,11,1,3,project?"petal":"cream");
  s.rect(4,20,22,1,project?"blush":"amber");
  return s;
}

function monitor() {
  const s = new Sprite(28,26);
  s.box(10,17,8,6,"deep","lilac"); s.box(5,22,18,3,"deep","light");
  s.box(1,1,26,20,"deep","lilac"); s.rect(3,2,22,1,"white"); s.rect(2,3,1,14,"light");
  s.box(3,3,22,15,"shadow","blue");
  s.rect(4,4,20,1,"lilac"); s.rect(4,5,1,11,"lilac");
  s.rect(4,18,13,1,"light"); s.rect(21,18,2,1,"cream");
  return s;
}

function camera() {
  const s = new Sprite(29,23);
  s.box(2,4,7,5,"deep","shadow"); s.box(10,1,11,8,"deep","light");
  s.rect(12,2,7,1,"cream"); s.box(0,6,29,16,"deep","lilac");
  s.rect(2,7,24,1,"white"); s.rect(2,11,25,8,"shadow");
  s.rect(2,19,24,1,"light"); s.box(3,9,5,4,"ink","paper");
  s.box(11,8,12,12,"deep","pink"); s.box(13,10,8,8,"shadow","blue");
  s.box(14,11,6,6,"deep","ink"); s.rect(15,11,2,2,"sky");
  s.rect(24,8,2,1,"paper");
  return s;
}

function about() {
  const s = new Sprite(25,24);
  s.polygon([[8,13],[17,13],[21,15],[23,18],[24,21],[24,23],[0,23],[0,21],[2,17],[5,15]],"plum");
  s.polygon([[8,13],[16,13],[20,15],[22,18],[23,21],[1,21],[3,17],[6,15]],"blush");
  s.rect(8,13,8,1,"petal");
  s.polygon([[10,0],[15,0],[18,3],[18,7],[16,10],[14,11],[10,11],[7,8],[7,3]],"plum");
  s.polygon([[10,0],[14,0],[17,3],[17,7],[15,9],[10,9],[8,7],[8,3]],"blush");
  s.rect(10,0,4,1,"petal");
  return s;
}

function skills() {
  const s = new Sprite(30,22);
  for (const [x,y] of [[1,16],[8,12],[15,7],[22,1]]) {
    s.rect(x,y,5,21-y,"plum"); s.rect(x,y,4,20-y,"blush");
    s.rect(x,y,4,1,"petal");
  }
  return s;
}

function contact() {
  const s = new Sprite(29,21);
  s.box(0,1,29,19,"deep","pink"); s.rect(2,2,24,1,"white");
  s.polygon([[2,17],[10,9],[13,11],[5,18],[2,18]],"rose");
  s.polygon([[18,9],[27,16],[27,18],[24,18],[16,11]],"rose");
  s.polygon([[1,3],[27,3],[26,6],[15,14],[12,14],[1,6]],"shadow");
  s.polygon([[2,3],[26,3],[15,11],[12,11]],"blush");
  s.rect(2,18,24,1,"rose");
  return s;
}

function resume() {
  const s = new Sprite(20,24);
  s.polygon([[2,1],[13,1],[19,7],[19,22],[17,24],[2,24],[0,22],[0,3]],"deep");
  s.polygon([[2,2],[12,2],[17,7],[17,21],[16,22],[2,22]],"paper");
  s.rect(2,2,9,1,"white"); s.rect(2,3,1,16,"white");
  s.polygon([[12,2],[18,8],[12,8]],"amber");
  s.rect(5,7,4,3,"rose"); s.rect(5,12,9,1,"shadow"); s.rect(5,15,9,1,"lilac"); s.rect(5,18,6,1,"lilac");
  return s;
}

function gamepad() {
  const s = new Sprite(36,24);
  s.box(6,1,8,5,"deep","lilac"); s.box(23,1,8,5,"deep","lilac");
  s.polygon([[7,3],[29,3],[32,6],[34,12],[36,19],[34,23],[30,23],[24,17],[12,17],[6,23],[2,23],[0,20],[2,11],[4,6]],"deep");
  s.polygon([[8,4],[28,4],[31,7],[33,13],[34,19],[33,21],[30,21],[24,15],[11,15],[5,21],[2,20],[3,14],[5,7]],"pink");
  s.rect(8,4,20,1,"petal"); s.rect(5,8,1,4,"petal");
  s.rect(10,15,15,1,"rose"); s.rect(6,9,7,3,"ink"); s.rect(8,7,3,7,"ink");
  s.rect(27,7,2,2,"ink"); s.rect(29,9,2,2,"ink");
  s.rect(25,9,2,2,"ink"); s.rect(27,11,2,2,"ink");
  s.rect(16,5,7,1,"deep"); s.box(16,10,5,4,"deep","blue");
  return s;
}

// The block display lettering is hand drawn so it has no font dependency or blur.
const letters = {
  W:["110000011","110000011","110000011","110000011","110010011","110111011","111111111","011101110","001000100"],
  E:["1111111","1111111","1100000","1100000","1111110","1100000","1100000","1111111","1111111"],
  L:["1100000","1100000","1100000","1100000","1100000","1100000","1100000","1111111","1111111"],
  C:["0011110","0111111","1100011","1100000","1100000","1100000","1100011","0111111","0011110"],
  O:["0011100","0111110","1100011","1100011","1100011","1100011","1100011","0111110","0011100"],
  M:["110000011","111000111","111101111","110111011","110010011","110000011","110000011","110000011","110000011"],
  "!":["11","11","11","11","11","11","00","11","11"],
};
function welcome() {
  const s = new Sprite(212,29);
  let left = 1;
  for (const letter of "WELCOME!") {
    const glyph = letters[letter];
    for (const [dx,dy,color] of [[1,2,"deep"],[0,1,"plum"],[0,0,"type"]]) {
      glyph.forEach((row,y) => [...row].forEach((bit,x) => {
        if (bit !== "1") return;
        s.rect(left+x*3+dx,y*3+dy,3,3,color);
        if (dy === 0 && glyph[y-1]?.[x] !== "1") s.rect(left+x*3,y*3,3,1,"typeLight");
      }));
    }
    left += 3 * (glyph[0].length + 2);
  }
  return s;
}

await Promise.all([
  ["folder",folder(false)], ["projects",folder(true)], ["monitor",monitor()], ["photos",camera()],
  ["about",about()], ["skills",skills()], ["contact",contact()], ["resume",resume()], ["controller",gamepad()],
].map(([name,sprite]) => sprite.save(name)));
await welcome().save("welcome", 6);
