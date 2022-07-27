import React, { useState } from "react"
import MulChoiceQuestion from "../../components/MulChoiceQuestion"
import Canvas from "../../components/Canvas"
import "../../css/mul-choice.css"

export default function MultipleChoice() {
    const [speed, setSpeed] = useState(1);
    function updateSpeed(num) {
        const newSpeed = speed + num;
        setSpeed(newSpeed);
        console.log("new speed has been updated!")
    }
    
    return (
        <div className="mulchoice">
            <Canvas 
                speed = {speed}/>

            <div className="form">
                <MulChoiceQuestion 
                    changeSpeed={(num) => updateSpeed(num)}/>
            </div>
        </div>
    )
}