import opentype from 'opentype.js'

// could load a font from config
// const buffer = fetch('./').then(res => res.arrayBuffer());




let buffer = fetch("https://fonts.gstatic.com/s/bitter/v7/HEpP8tJXlWaYHimsnXgfCOvvDin1pK8aKteLpeZ5c0A.woff2").then(res => res.arrayBuffer());

// promise-based utility to load libraries using the good old <script> tag
const loadScript = (src) => new Promise((onload) => document.documentElement.append(
  Object.assign(document.createElement('script'), {src, onload})
));

// load wawoff2 if needed, and wait (!) for it to be ready
if (!window.Module) {
  const path = 'https://unpkg.com/wawoff2@2.0.1/build/decompress_binding.js'
  const init = new Promise((done) => window.Module = { onRuntimeInitialized: done});
  await loadScript(path).then(() => init);
}
// decompress before parsing
const openFont = opentype.parse(Module.decompress(await buffer));

console.log(openFont);

const aPath = new opentype.Path();
aPath.fill = "blue";
aPath.stroke = "blue"
aPath.moveTo(100, 0);
aPath.lineTo(100, 700);
aPath.lineTo(200, 700);
aPath.lineTo(700, 700);
aPath.lineTo(1000, 700);
// more drawing instructions...
const aGlyph = new opentype.Glyph({
    name: 'A',
    unicode: 65,
    advanceWidth: 650,
    path: aPath
});

let glyphs = openFont.glyphs.glyphs;

console.log(glyphs[36].path, glyphs[39].path)

let adv_wid_a = glyphs[36].advanceWidth;
let path_a = glyphs[36].path
glyphs[36] = new opentype.Glyph({
  name: 'A',
  unicode: 65,
  advanceWidth: glyphs[39].advanceWidth,
  path: glyphs[39].path
})
glyphs[39] = new opentype.Glyph({
  name: 'D',
  unicode: 68,
  advanceWidth: adv_wid_a,
  path: path_a
})

console.log(glyphs[36].name, glyphs[39].name)
console.log(glyphs[36].path, glyphs[39].path)
// But I prefer to grab one from the browser
// https://stackoverflow.com/questions/11355147/font-face-changing-via-javascript
const fontFile = await new FontFace(
  "FontFamily Style Bitter",
  openFont.toArrayBuffer(),
).load();
document.fonts.add(fontFile);

// await document.fonts.ready.then(async (fontFaceSet) => {
//   console.log(fontFaceSet)
//   console.log(document.fonts);
//   console.log(await fetch(URL.createObjectURL(fontFaceSet[0])).arrayBuffer())
// });