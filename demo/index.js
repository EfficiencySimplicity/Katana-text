import React from 'react';
import ReactDOM from 'react-dom';
import {loadAndShuffleFont, createKatanaTextComponent} from '../src/index';
import text from './sample-text'

const font = await loadAndShuffleFont("https://fonts.gstatic.com/s/bitter/v7/HEpP8tJXlWaYHimsnXgfCOvvDin1pK8aKteLpeZ5c0A.woff2", "Scrambled")


const TextElement = createKatanaTextComponent(font, text.slice(0, 2000), 16, 20);

ReactDOM.render(<TextElement width="50%"/>, document.getElementById("normal"));


const BigTextElement = createKatanaTextComponent(font, text.slice(0, 500), 75, 80);

ReactDOM.render(<BigTextElement width = "min(80%, 800px)"/>, document.getElementById("big"));


const TinyTextElement = createKatanaTextComponent(font, text, 9, 10, [10, 20]);

ReactDOM.render(<TinyTextElement width = "90%"/>, document.getElementById("tiny"));