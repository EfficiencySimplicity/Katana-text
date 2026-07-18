import React from 'react';
import ReactDOM from 'react-dom';
import loadAndScrambleFont from './font';
import createKatanaTextComponent from './app';
import text from './sample-text'

const font = await loadAndScrambleFont("https://fonts.gstatic.com/s/bitter/v7/HEpP8tJXlWaYHimsnXgfCOvvDin1pK8aKteLpeZ5c0A.woff2", "Scrambled")


const TextElement = createKatanaTextComponent(font, text.slice(0, 2000), 16, 20);

ReactDOM.render(<TextElement/>, document.getElementById("normal"));


const BigTextElement = createKatanaTextComponent(font, text.slice(0, 500), 75, 80);

ReactDOM.render(<BigTextElement/>, document.getElementById("big"));


const TinyTextElement = createKatanaTextComponent(font, text, 9, 10);

ReactDOM.render(<TinyTextElement/>, document.getElementById("tiny"));