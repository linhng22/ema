import React, {useState} from "react"
import { useDrop } from "react-dnd"
import { ItemTypes } from "./DragDropConstants";
import answerData from "../data/drag-drop-answers"

export default function DragDropQuestion(props) {
    const [box, setBox] = useState({
        answer: "",
        matched : false
    });

    const [newAnswerData, setNewAnswerData] = useState(answerData);

    const [{isOver}, drop] = useDrop({
        accept: ItemTypes.ANSWER,
        drop: (item) => check(item.input),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        })
    })
    
    function check(input){
        if (input.toLowerCase() === props.answer.toLowerCase()) {
            setBox({answer: input, matched: true});
            const answerList = newAnswerData.filter((item) => input.toLowerCase() === item.answer.toLowerCase());
            //Pass the id of the first object to the function
            //We need to pass 1 ID because each question has only one correct answer
            props.onDrop(answerList[0].id)
        } else {
            
        }
    }

    return (
        <div id={props.id}
            className="card question">
            <div className="card-question">{props.question}</div>

            <div 
                className="card-droppable" 
                ref={drop}
                style={{border: isOver ? "solid 2px #000" : "solid 1px #808080",
                        background: box.matched ? "green" : ""}}>
                    {box.answer ? box.answer : "Kéo đáp án vào đây"}
            </div>
        </div>
    )
}