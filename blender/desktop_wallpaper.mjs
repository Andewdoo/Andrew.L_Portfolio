/* Rebuild the sunset wallpaper from the cloud shapes and
   mountain silhouettes of the camera-matched desk study. */
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const width = 960, height = 448;
const pixels = Buffer.alloc(width * height * 3);
const source = fileURLToPath(new URL("./textures/desk-study.png", import.meta.url));
const { data, info } = await sharp(source).removeAlpha().raw().toBuffer({ resolveWithObject: true });
let seed = 71523;
function random() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
}
function mix(a, b, t) { return a.map((v,i) => v + (b[i] - v) * t); }
function put(x, y, color) {
  if (x < 0 || x >= width || y < 0 || y >= height) return;
  const at = (y * width + x) * 3;
  for (let c = 0; c < 3; c++) pixels[at+c] = Math.min(255, Math.max(0, Math.round(color[c])));
}
function rect(x, y, w, h, color) {
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) put(x+i,y+j,color);
}
const sky = [[0,[39,51,67]], [.22,[56,66,77]], [.45,[82,77,79]],
  [.63,[126,91,79]], [.74,[171,105,86]], [.84,[218,129,97]],
  [.93,[244,157,113]], [1,[235,144,104]]];
const sun = { x: 711, y: 231, radius: 51 };
function skyAt(x,y) {
  const v = Math.max(0,Math.min(1,y/height));
  const k = sky.findIndex(([stop]) => stop >= v);
  const [end,b] = sky[k], [start,a] = sky[Math.max(0,k-1)];
  const base = mix(a,b,(v-start)/(end-start||1));
  const distance = Math.hypot(x - sun.x, y - sun.y);
  const halo = .49 * Math.exp(-distance * distance / 22000);
  const lit = mix(base, [255,146,101], halo);
  const disc = Math.max(0, Math.min(1, sun.radius + .6 - distance));
  const band = y < sun.y + 19 ? 0 : Math.max(0, Math.sin((y - sun.y) * .49)) * .49;
  const bloom = (Math.sin(x/105 + y/130)*.5 + Math.cos(x/52 - y/84)*.5 + .45) * 1.7;
  return mix(lit, mix([255,216,155], [249,132,109], band), disc)
    .map((c,i) => c + bloom * [.85,.60,1][i]);
}

for (let y=0; y<height; y++) for (let x=0; x<width; x++) {
  const dither = (random()-.5)*2;
  put(x,y,skyAt(x,y).map(v=>v+dither));
}
// Sample just the unobstructed cloud on the left of the reference screen.
// Isolating its twilight tones lets the same motif cross the whole display.
const cloud = { left: 558, top: 354, width: 152, height: 54 };
function sample(px,py) {
  const i = (py*info.width+px)*3;
  return [data[i],data[i+1],data[i+2]];
}
function clouds(x,y,w,h,flip,strength) {
  for (let j=0;j<h;j++) for (let i=0;i<w;i++) {
    const u = (flip ? w-i-1 : i)/w;
    const src = sample(cloud.left+Math.floor(u*cloud.width), cloud.top+Math.floor(j/h*cloud.height));
    const cloudBg = [41+j/h*6,44+j/h*5,83+j/h*8];
    const delta = src.map((v,k)=>v-cloudBg[k]);
    // The distant star field around the silhouette is independent of the clouds.
    if (delta[0]<9 || src[0]>145 || src[1]>100) continue;
    const bg=skyAt(x+i,y+j);
    const tint = mix([175,139,126], [255,189,140], (y + j) / height);
    put(x+i,y+j,mix(bg,tint,Math.min(.78,delta[0]/78)*strength));
  }
}
clouds(145,132,171,59,false,1.0);
clouds(673,196,135,43,false,.87);
clouds(-110,253,225,68,true,.72);
clouds(-24,286,233,51,true,.65);
clouds(803,233,198,57,false,.92);
clouds(738,283,246,36,true,.49);
clouds(32,317,210,43,false,.37);
clouds(-62,328,297,35,true,.48);
clouds(738,322,266,43,true,.45);
clouds(615,356,258,29,false,.25);
clouds(236,352,154,22,true,.18);

// Trace the lower-center mountain range and continue the peaks towards the towers.
const peaks=[[0,.92],[.11,.895],[.155,.899],[.213,.852],[.285,.909],[.365,.936],
  [.425,.908],[.462,.887],[.53,.933],[.565,.942],[.606,.918],[.645,.878],
  [.70,.913],[.739,.918],[.78,.937],[.841,.873],[.886,.925],[1,.89]];
function mountain(x) {
  const t=x/width;
  const i=Math.max(1,peaks.findIndex(([p])=>p>=t));
  const [a,y0]=peaks[i-1], [b,y1]=peaks[i];
  return Math.round(height*(y0+(y1-y0)*(t-a)/(b-a)) + 1.1*Math.sin(x/8) + .8*Math.sin(x/3.1));
}
for(let x=0;x<width;x++) {
  const ridge=mountain(x);
  for(let y=ridge;y<height;y++) {
    const stripe = Math.max(0,Math.sin(x*.045+y*.07))*.27;
    put(x,y,mix([54,63,76],[70,72,77],stripe+(y-ridge)/height*.65));
  }
}

// An apartment district anchors each edge, with boxy rooftops, lighted
// windows and the original's low corridor of hills across the middle.
function building(x,top,w,bottom,front,near) {
  const shade = mix(front,[34,35,61],.37), rim=mix(front,[142,92,129],.18);
  rect(x,top,w,bottom-top,front);
  rect(x,top,Math.max(2,Math.floor(w*.21)),bottom-top,shade);
  if (w>8 && random()>.24) {
    rect(x+2,top-2,w-5,2,front);
    if (w>17 && random()>.52) rect(x+Math.floor(w*.63),top-10,2,8,shade);
  }
  for(let y=top+5;y<bottom-2;y+=near?8:5) for(let col=x+3;col<x+w-2;col+=near?6:4) {
    const light=random();
    if(light<.27) {
      const tint=mix([190,115,115],[255,199,133],random()**.61);
      if (near && light<.10) rect(col-1,y-1,4,5,mix(front,tint,.15));
      rect(col,y,near?2:1,near?3:2,tint);
    } else if(light<.55) rect(col,y,near?2:1,near?3:2,rim);
  }
}
for(let layer=0;layer<2;layer++) {
  for(let x=-5;x<width;) {
    const w=Math.floor(5+random()*(layer?11:12));
    const edge=Math.exp(-((Math.min(x,width-x)/128)**2));
    const top=Math.floor(height-9-random()*8-(1-layer)*6-edge*(7+random()*25));
    if (edge>.46 || random()>.38) building(x,top,w,height,mix([53,51,82],[74,61,91],random()),false);
    x+=w+Math.floor(random()*14)-1;
  }
}
for (const [x,y,w] of [
  [-7,337,29],[17,346,23],[34,368,17],[49,350,21],[68,344,20],[84,365,21],[105,374,19],[126,391,15],
  [815,391,16],[834,354,25],[855,370,18],[874,362,14],[891,345,24],[913,366,17],[932,344,24],[950,330,22],
]) building(x,y,w,height,mix([47,46,74],[60,53,84],random()),true);
for(const [x,y,w] of [[-5,412,51],[54,420,43],[145,418,29],[186,425,30],[247,433,15],[341,412,16],
  [681,431,21],[765,419,43],[813,432,17],[892,418,48]]) {
  building(x,y,w,height,[51,45,69],true);
}
for (const [x,y] of [[80,425],[86,425],[191,430],[198,430],[772,424],[779,424],[784,424],[920,428]]) {
  rect(x-1,y-1,6,8,[98,68,80]); rect(x,y,4,6,[248,181,129]); rect(x+1,y+1,2,4,[255,204,143]);
}
// Foreground crowns break up the straight rooflines between the apartment blocks.
for (const [cx,cy,r] of [[33,423,11],[43,425,8],[150,441,8],[215,442,6],[287,423,6],
  [299,432,7],[676,436,6],[723,422,11],[737,425,9],[810,437,9],[905,442,7]]) {
  rect(cx-2,cy,3,height-cy,[45,42,66]);
  for(let i=0;i<15;i++){
    const x=Math.floor(cx+(random()-.5)*r*1.65),y=Math.floor(cy+(random()-.5)*r);
    const n=Math.floor(3+random()*r*.55);
    rect(x,y+1,n,n-2,[48,46,72]); rect(x+1,y,n-2,n,[48,46,72]);
  }
}
const output=fileURLToPath(new URL("../public/scene/desktop/dusk.webp", import.meta.url));
await sharp(pixels,{ raw:{ width,height,channels:3 } }).resize(width*2,height*2,{kernel:"nearest"})
  .webp({lossless:true,effort:6}).toFile(output);

