import opentype from 'opentype.js'
import shuffle from 'shuffle-array';
import {decompress} from 'woff2-encoder'

/**
 * Gathers a WOFF font from the url,
 * shuffles the glyphs,
 * and loads it in the document
 * (meaning any text in the document can use this font)
 * 
 * Returns a function that takes a string and shuffles the characters
 * so that the font unshuffles it
 */
export default async function loadAndScrambleFont(url, name) {
    // https://github.com/fontello/wawoff2/issues/14
    // https://github.com/itskyedo/woff2-encoder
    let res = await fetch(url);
    let font = opentype.parse(await decompress(await res.arrayBuffer()));
    let [shuf_font, shuffler] = shuffleFont(font);

    // https://stackoverflow.com/questions/11355147/font-face-changing-via-javascript
    const fontFile = await new FontFace(
        name,
        shuf_font.toArrayBuffer(),
    ).load();
    document.fonts.add(fontFile);

    const ctx = document.createElement("canvas").getContext("2d");
    ctx.font = `16px ${name}`

    return {
        name: name,
        encode: shuffler,
        ctx: ctx,
    }
}

/**
 * The unicode start and end may not match the glyph indices
 * in the font, but instead the glyph's unicode value.
 * The unicode_end is inclusive; see
 * https://en.wikipedia.org/wiki/List_of_Unicode_characters#Table_Basic_Latin;
 * the default of 122 for the end is z, lowercase
 */
function shuffleFont(font, u_start = 65, u_end = 122) {

    let glyphs = Object.values(font.glyphs.glyphs).filter(x => x.unicode >= u_start && x.unicode <= u_end);

    // This already does images and unicode; why not just be a whole copy?
    // Or would that lead to reassignment; a = b, b = c, c = a sorta loop?...
    let glyph_images = glyphs.map(x => {return {unicode: x.unicode, advanceWidth: x.advanceWidth, path: x.path}});

    glyph_images = shuffle(glyph_images)

    let unicode_map = {};

    for (let i=0; i < glyphs.length; i++) {
        font.glyphs.glyphs[36 + i] = new opentype.Glyph({
            name: glyphs[i].name,
            unicode: glyphs[i].unicode,
            advanceWidth: glyph_images[i].advanceWidth,
            path: glyph_images[i].path
        })
        unicode_map[glyph_images[i].unicode] = String.fromCharCode(glyphs[i].unicode)
    }

    // TODO: get all other chars in here so we don't need to account for a possible
    // nonexistent char via map_unicode...
    console.log("mapped unicode", unicode_map)

    let map_unicode = (char_code) => {
        return char_code in unicode_map? unicode_map[char_code]: String.fromCharCode(char_code)
    }

    let shuffleText = (text) => {
        let ending_text = []
        for (let i = 0; i < text.length; i++) {
            // https://www.geeksforgeeks.org/javascript/get-unicode-character-value-in-javascript/
            let unicode = text.charCodeAt(i);
            ending_text.push(map_unicode(unicode))
        }
        return ending_text.join("");
    }

    return [font, shuffleText];
}

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