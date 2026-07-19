// https://www.geeksforgeeks.org/reactjs/reactjs-babel-introduction/
import React, { Component, useCallback, useState, useEffect, useRef, useLayoutEffect} from 'react';

import {prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

import shuffle from "shuffle-array";

export default function createKatanaTextComponent(font, text, pix_height = 16, line_height = 20) {

    const PREPARED = prepareWithSegments(font.encode(text), `${pix_height}px ${font.name}`);

    return function KatanaTextComponent(props) {
        // https://stackoverflow.com/questions/69228336/how-to-call-useeffect-when-browser-is-resized
        const [width, setWidth] = useState()
        const myRef = useRef();

        // https://blog.logrocket.com/using-resizeobserver-react-responsive-designs/
        // https://trackjs.com/javascript-errors/resizeobserver-loop-completed-with-undelivered-notifications/
        useEffect(() => {
            if (myRef.current) {
                const observer = new ResizeObserver(() => {
                    if (myRef.current.offsetWidth != width) {
                        // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
                        requestAnimationFrame(() => {
                            setWidth(myRef.current.offsetWidth)
                            console.log("Width changed")
                        })
                    }
                });

                observer.observe(myRef.current);

                // Cleanup function
                return () => {
                    observer.disconnect();
                };
            }
        }, []);

        // https://stackoverflow.com/questions/49058890/how-to-get-a-react-components-size-height-width-before-render
        useLayoutEffect(() => {
            if (myRef.current) {
                setWidth(myRef.current.offsetWidth);
            }
        })

        const lineInfo = layoutWithLines(PREPARED, width, line_height);
        const lines = lineInfo.lines;

        let elements = [];

        // This will manage the measurement calculations
        font.setPixHeight(pix_height)

        for(let i=0; i < lines.length; i++) {

            let start = 0;
            let startIdx = 0;

            while (startIdx < lines[i].text.length) {
                let length = Math.min(Math.floor(Math.random() * 10 + 5), lines[i].text.length - startIdx);

                let word = lines[i].text.slice(startIdx, startIdx+length)
                elements.push(<span style = {{position: 'absolute', top: i * line_height, left: start, whiteSpace: "pre"}}>{word}</span>)

                let newStartIdx = startIdx + length - Math.floor(Math.random() * (length / 2))

                start += font.ctx.measureText(lines[i].text.slice(startIdx, newStartIdx)).width;

                startIdx = newStartIdx;
            }
        }

        return (
            <p ref = {myRef} style = {{position: "relative", width: props.width, height: lineInfo.height, fontFamily: `${font.name}`, fontSize: `${pix_height}px`}}>
                {shuffle(elements)}
            </p>
        );
    }
}