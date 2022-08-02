import React, { useState } from "react"
import FillInQuestion from "../../components/FillInQuestion"
import Canvas from "../../components/Canvas"
import "../../css/fill-in.css"

export default function FillIn() {
    const [speed, setSpeed] = useState(2);
    function updateSpeed(num) {
        const newSpeed = speed + num;
        if (newSpeed >= 0) setSpeed(newSpeed);
    }
    
    return (
        <div className="fill-in-container">
            <Canvas 
                speed = {speed}/>

            <FillInQuestion 
                changeSpeed={(num) => updateSpeed(num)}/>
        </div>
    )
}