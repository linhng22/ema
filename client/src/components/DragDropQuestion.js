import React, {useState} from "react"
import { useDrop } from "react-dnd"
import { ItemTypes } from "./DragDropConstants";

export default function DragDropQuestion(props) {
    const [box, setBox] = useState({
        answer: "",
        matched : false
    });

    const [newAnswerData, setNewAnswerData] = useState(props.answerData);

    const [{isOver}, drop] = useDrop({
        accept: ItemTypes.ANSWER,
        drop: (item) => check(item),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        })
    })
    
    function check(input){
        if (input.id === props.id) {
            setBox({answer: input.value, matched: true});
            const answerList = newAnswerData.filter((item) => input.id === parseInt(item.id));
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
                style={{opacity: isOver ? "0.5" : "1",
                        background: box.matched ? "#95e1d3" : "",
                        fontSize: box.matched ? "16px" : "13px"}}>
                    {box.answer ? box.answer : "Kéo đáp án vào đây"}
            </div>
        </div>
    )
}