import opentype from 'opentype.js'
import {decompress} from 'woff2-encoder'

// https://github.com/fontello/wawoff2/issues/14
// https://github.com/itskyedo/woff2-encoder

let buffer = fetch("https://fonts.gstatic.com/s/bitter/v7/HEpP8tJXlWaYHimsnXgfCOvvDin1pK8aKteLpeZ5c0A.woff2").then(res => res.arrayBuffer());

// decompress before parsing
const openFont = opentype.parse(await decompress(await buffer));

// We swap the A and the D for now
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

// https://stackoverflow.com/questions/11355147/font-face-changing-via-javascript
const fontFile = await new FontFace(
  "FontFamily Style Bitter",
  openFont.toArrayBuffer(),
).load();
document.fonts.add(fontFile);


// REFERENCE OF THE FIELDS

// const aPath = new opentype.Path();
// aPath.moveTo(100, 0);
// aPath.lineTo(100, 700);

// new opentype.Glyph({
//     name: 'A',
//     unicode: 65, // not necessarily the glyph set index, though
//     advanceWidth: 650,// this and the path, I feel, should be paired together
//     path: aPath
// });