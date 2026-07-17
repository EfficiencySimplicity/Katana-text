# Katana-text
Website scraping prevention system for text content

# How it works
Katana uses the Pretext library (ironic that it's used here to stop AI scraping while AI made part of it, plus the guy works at Midjourney now) to tell where each word of your element needs to be, then-

- Absolutely positions the words as spans which are shuffled in the DOM structure, and
- Some of them overlap
- A custom font is applied that maps each character to a different one, so the actual text content is Quasi-Caesar'd around a bit

# How to run

npm run start.

# The backstory

Katana-text is a subproject related to Katana, the system used to prevent AI from scraping the images at [ungenerated.io](https://ungenerated.io); Katana's code is private for security reasons, but Katana-text is planned to be a free React library