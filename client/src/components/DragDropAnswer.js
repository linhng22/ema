import React from "react"
import {useDrag} from "react-dnd"
import {ItemTypes} from "./DragDropConstants"

export default function DragDropAnswer(props) {
    const [{isDragging}, drag] = useDrag({
        type: ItemTypes.ANSWER,
        item: {id: props.id, value: props.answer},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    
    return (
        <div 
            ref={drag}
            className="card answer" 
            id={props.id}
            style={{display: props.matched ? "none" : "",
                    backgroundColor: isDragging ? "#95e1d3" : "#fbcc89"}}>
            <div
                className="card-answer"
                style={{opacity : isDragging ? "0.5" : "1"}}>
                    {props.answer}   
            </div>
        </div>
    )
}