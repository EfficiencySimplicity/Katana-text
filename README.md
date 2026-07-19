# Katana-text
Website scraping prevention system for text content

# How it works
Katana uses the Pretext library (ironic that it's used here to stop AI scraping while AI made part of it, plus the guy works at Midjourney now) to tell where each word of your element needs to be, then-

- Absolutely positions the words as spans which are shuffled in the DOM structure, and
- Some of them overlap
- A custom font is applied that maps each character to a different one, so the actual text content is Quasi-Caesar'd around a bit

# Why use Katana?

If you want to protect against your run-of-the-mill scraper from taking the text on your site, while not requiring a performance-heavy solution like Anubis or setting up and managing a tar pit, Katana-text is a good choice

(ya can still do those things though!)

# How to use it

- Run loadAndShuffleFont(), passing in the url to a .woff file and the name you want to call the resulting font; this returns a Font management object

- For every text block you want to render, call createKatanaTextComponent(), passing in:
    - The font object you got earlier
    - The text it should contain
    - The height in pixels of the text
    - The line height (should be more than the height in pixels)

This returns a React function component you can use wherever you want;

It will automatically update its height based on the text inside it, but it is recommended that you set the width explicitly, though it seems to have no issues with it.

```js
    <createdComponentFunction width="75%"/>
```

See the demos folder on Github for a good idea of how it should be used.

### Note:

createKatanaTextComponent() is not a React component,
it returns a *function* that is.

# The backstory

Katana-text is a subproject related to Katana, the system used to prevent AI from scraping the images at [ungenerated.io](https://ungenerated.io); Katana's code is private for security reasons, but Katana-text is planned to be a free React library