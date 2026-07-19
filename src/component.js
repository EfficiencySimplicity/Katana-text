// https://www.geeksforgeeks.org/reactjs/reactjs-babel-introduction/
import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';

import {prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

import shuffle from "shuffle-array";

/**
 * Call this function when you want to create a Katana-text component;
 * Keep in mind that this is not a component itself, it returns a function that is.
 * 
 * Pass in:
 * 
 * - A font object (returned from loadAndShuffleFont)
 * - The text you want it to contain
 * - The letterheight in pixels; i.e. 16 for 16px tall letters, 75, 9, etc an  [n]-point font;
 *   Basically it lets you simulate h1s, ps, subs, etc.
 * - The line height (should be a bit more than the letterheight)
 * - The span range, a list of the form [min, max]; the size of the spans the text will be broken into;
 *   Shorter lengths = more spans = worse performance (but the performance is really good in any case).
 *   Do note that if a span would extend past the end of a line, it will be shortened
 *   to fit
 * - The max backtrack distance; what percentage of the length of the last span to backtrack before making a new one;
 *   (0-1), 1 meaning you could get a span repeated indefinitely, and 0 meaning there's no overlap between any spans
 */
export default function createKatanaTextComponent(font, text, pix_height = 16, line_height = 20, span_range = [5,10], max_backtrack = .4) {
    
    if (span_range.length != 2) {
        throw new Error("Span length range must be an array of 2 numbers; got", span_range);
    } else if (span_range[1] < span_range[0]) {
        throw new Error("Span range max must be at least equal to span range min, got", span_range);
    } else if (span_range.some(x => x < 0)) {
        // https://stackoverflow.com/questions/28350292/what-is-the-equivalent-of-array-any-in-javascript
        throw new Error("All items in span range must be positive; got", span_range);
    }

    if (max_backtrack < 0 || max_backtrack > 1) {
        throw new Error("Max backtrack must be between 0 and 1; got", max_backtrack);
    }

    const span_width = (span_range[1] - span_range[0])
    const span_min = span_range[0]

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
                let length = Math.min(Math.floor(Math.random() * span_width + span_min), lines[i].text.length - startIdx);

                let word = lines[i].text.slice(startIdx, startIdx+length)
                elements.push(<span style = {{position: 'absolute', top: i * line_height, left: start, whiteSpace: "pre"}}>{word}</span>)

                let newStartIdx = startIdx + length - Math.floor(Math.random() * (length * max_backtrack))

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