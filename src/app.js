// https://www.geeksforgeeks.org/reactjs/reactjs-babel-introduction/
import React, { Component, useState} from 'react';

import {prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

import shuffle from "shuffle-array";
import text from './sample-text'
// This is so that all the font stuff is loaded beforehand
// Is this important?
// I do not know at all
import shuffleText from './font';
// let text = "Once Upon A Time In The Old Days ".repeat(100)
//.split(" ")
const PREPARED = prepareWithSegments(shuffleText(text), "16px FontFamily Style Bitter");

const ctx = document.getElementById("measurer").getContext("2d");
ctx.font = "16px FontFamily Style Bitter"

// https://18.react.dev/reference/react/useState

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0
        };
    }

    render() {
        //debugger;
        let width = this.state.width;

        const { lines } = layoutWithLines(PREPARED, width, 20);

        let elements = [];

        for(let i=0; i < lines.length; i++) {

            let start = 0;
            let startIdx = 0;

            // say startIdx = 0; line length is 7;
            while (startIdx < lines[i].text.length) {
                // we pick 8 as a length; and it gets shrunk to 7;
                let length = Math.min(Math.floor(Math.random() * 5 + 5), lines[i].text.length - startIdx);
                // 0-7 is the whole thing
                let word = lines[i].text.slice(startIdx, startIdx+length)
                elements.push(<span style = {{position: 'absolute', top: i*20, left: start, whiteSpace: "pre"}}>{word}</span>)
                // span.textContent = word
                // span.style.position = 'absolute';
                // span.style.top = i*20;
                // span.style.left = start;
                // text_div.appendChild(span);
                // 0 + 7 - 2 = 5
                let newStartIdx = startIdx + length - Math.floor(Math.random() * (length / 2))
                // 0..5 here
                start += ctx.measureText(lines[i].text.slice(startIdx, newStartIdx)).width;
                // and now we're at 5.
                startIdx = newStartIdx;
            }
        }

        // // https://www.w3schools.com/JS/js_random.asp
        // let num = Math.random();
        // // https://react.dev/learn/rendering-lists
        // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
        // let text = "Once Upon A Time In The Old Days ".repeat(100).split(" ")
        // let elements = text.map(x => <span style={{position: "absolute"}}>{x+" "}</span>);

        return (
            <p id="text" style = {{fontFamily: "FontFamily Style Bitter"}}>
                {shuffle(elements)}
            </p>
        );
    }

    // https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
    updateDimensions = () => {
        this.setState({ width: window.innerWidth });
    };
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }
}
export default App;