import React from "react";
import Nav from '../components/Nav';

export default function Quiz() {
    return (
        <>
            <Nav />
            <div className="home">
                <a href="/quiz/drag-drop">Drag and Drop</a>
                <a href="/quiz/fill-in">Fill in Blank</a>
            </div>
        </>
    )
}