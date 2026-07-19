import createKatanaTextComponent from "../src/component.js";

const font = {encode: (text) => {
    console.log("Font asked to encode text:\n", text);
    return text;
}}

const text = "Lorem ipsum dolor sit amet"

test("rejects bad-sized span range", () => {
    expect(() => createKatanaTextComponent(font, text, 16, 20, [1,2,3]))
    .toThrow();
})

test("rejects bad-ordered span range", () => {
    expect(() => createKatanaTextComponent(font, text, 16, 20, [10, 5]))
    .toThrow();
})

test("rejects negative span range", () => {
    expect(() => createKatanaTextComponent(font, text, 16, 20, [-1, 4]))
    .toThrow();
})

test("rejects out-of-range backtrack lengths", () => {
    expect(() => createKatanaTextComponent(font, text, 16, 20, [1, 2], -.01))
    .toThrow();

    expect(() => createKatanaTextComponent(font, text, 16, 20, [1, 2], 1.01))
    .toThrow();
})