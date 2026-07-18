// https://www.geeksforgeeks.org/reactjs/reactjs-babel-introduction/
import React, { Component, useState, useEffect} from 'react';

import {prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

import shuffle from "shuffle-array";

export default function createKatanaTextComponent(font, text) {

    const PREPARED = prepareWithSegments(font.encode(text), `16px ${font.name}`);

    return function KatanaTextComponent() {
        // https://stackoverflow.com/questions/69228336/how-to-call-useeffect-when-browser-is-resized
        const [docWidth, setDocWidth] = useState(window.innerWidth)
        
        // https://www.w3schools.com/react/react_useeffect.asp
        const handleWindowSizeChange = () => {
            setDocWidth(window.innerWidth);
        };

        useEffect(() => {
            window.addEventListener('resize', handleWindowSizeChange);
            return () => {
                window.removeEventListener('resize', handleWindowSizeChange);
            };
        }, []);

        const lineInfo = layoutWithLines(PREPARED, docWidth, 20);
        const lines = lineInfo.lines;

        let elements = [];

        for(let i=0; i < lines.length; i++) {

            let start = 0;
            let startIdx = 0;

            while (startIdx < lines[i].text.length) {
                let length = Math.min(Math.floor(Math.random() * 10 + 5), lines[i].text.length - startIdx);

                let word = lines[i].text.slice(startIdx, startIdx+length)
                elements.push(<span style = {{position: 'absolute', top: i*20, left: start, whiteSpace: "pre"}}>{word}</span>)

                let newStartIdx = startIdx + length - Math.floor(Math.random() * (length / 2))

                start += font.ctx.measureText(lines[i].text.slice(startIdx, newStartIdx)).width;

                startIdx = newStartIdx;
            }
        }

        return (
            <p id="text" style = {{height: lineInfo.height, fontFamily: font.name}}>
                {shuffle(elements)}
            </p>
        );
    }
}