import React from "react"
import {useDrag} from "react-dnd"
import {ItemTypes} from "./DragDropConstants"

export default function DragDropAnswer(props) {
    const [{isDragging}, drag] = useDrag({
        type: ItemTypes.ANSWER,
        item: {input: props.answer},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    
    return (
        <div className="card answer" id={props.id}>
            <div
                ref={drag}
                className="card-answer"
                style={{ opacity : isDragging ? "0.5" : "1",
                         display: props.matched ? "none" : ""}}>{props.answer}   
            </div>
        </div>
    )
}