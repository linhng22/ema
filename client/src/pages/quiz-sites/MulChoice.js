import React from "react"
import MulChoiceQuestion from "../../components/MulChoiceQuestion"
import Canvas from "../../components/Canvas"
import "../../css/mul-choice.css"

export default function MultipleChoice() {
    return (
        <div className="mulchoice">
            <Canvas />
            <div className="form">
                <MulChoiceQuestion />
            </div>
        </div>
    )
}