import opentype from 'opentype.js'

// could load a font from config
// const buffer = fetch('./').then(res => res.arrayBuffer());

// But I prefer to grab one from the browser
// const fontFile = new FontFace(
//   "FontFamily Style Bitter",
//   'url("https://fonts.gstatic.com/s/bitter/v7/HEpP8tJXlWaYHimsnXgfCOvvDin1pK8aKteLpeZ5c0A.woff2")',
// );
// document.fonts.add(fontFile);

// document.fonts.ready.then((fontFaceSet) => {
  // Any operation that needs to be done only after all used fonts
  // have finished loading can go here.
//   const fontFaces = [...fontFaceSet];
//   console.log(fontFaces);
//   // some fonts may still be unloaded if they aren't used on the site
//   console.log(fontFaces.map((f) => f.status));
// });