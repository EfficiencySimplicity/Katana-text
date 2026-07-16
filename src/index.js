import React from 'react';
import ReactDOM from 'react-dom';
import font from './font'
import App from './app';

const container = document.getElementById("root");
ReactDOM.render(<App/>, container);

// while (true) {
//     setWidth(document.body.getBoundingClientRect().width)
// }

// const text_div = document.getElementById("text");

// let doc_box = document.body.getBoundingClientRect();

// text_div.style.color = "red";

// for (let span of text_div.childNodes) {
//     span.style.left = `${Math.floor(Math.random() * 1000)}px`;
// }

// text_div.style.color = "blue";

// // const prepared = prepare('This is some neat text', '16px Inter')
// // const { height, lineCount } = layout(prepared, doc_box.width, 40);

// const prepared = prepareWithSegments(text_div.textContent, "16px Inter");
// const { lines } = layoutWithLines(prepared, doc_box.width, 20);

// text_div.replaceChildren();

// text_div.style.color = "green";

// try {
//     for(let i=0; i < lines.length; i++) {
//         let start = 0;
//         for (let word of lines[i].text.split(' ')) {
//             let span = document.createElement("span")
//             span.textContent = word
//             span.style.position = 'absolute';
//             span.style.top = i*20;
//             span.style.left = start;
//             text_div.appendChild(span);

//             start += ctx.measureText(word + " ").width;
//         }
//     }
// }
// catch (e) {
//     text_div.textContent = e
// }


// text_div.style.color = "orange";