import React from 'react';
import ReactDOM from 'react-dom';
import loadAndScrambleFont from './font';
import createKatanaTextComponent from './app';
import text from './sample-text'

const font = await loadAndScrambleFont("https://fonts.gstatic.com/s/bitter/v7/HEpP8tJXlWaYHimsnXgfCOvvDin1pK8aKteLpeZ5c0A.woff2", "Scrambled")

const TextElement = createKatanaTextComponent(font, text);

const container = document.getElementById("root");
ReactDOM.render(<TextElement/>, container);