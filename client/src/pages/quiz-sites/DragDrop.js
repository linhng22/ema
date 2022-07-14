import React, { useEffect, useState } from "react";
import axios from "axios"
import "../../css/drag-drop.css"
import questionData from "../../data/drag-drop-questions"
import answerData from "../../data/drag-drop-answers"
import Question from "../../components/DragDropQuestion"
import Answer from "../../components/DragDropAnswer"
import TimerAndResult from "../../components/DragDropTimerAndResult"
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"

export default function DragDrop() {
    const [questions, setQuestions] = useState({})
    
        axios.get("/quiz/drag-drop").then(response => {
            
                setQuestions(response.data)
        })
    
    
    console.log(questions.questions)
    // const [currentAnswerData, setCurrentAnswerData] = useState(answerData);
    
    // // Update the value of the "matched" key of a specific object in the answer array
    // const updateData = (id) => {
    //     setCurrentAnswerData(prevData => (
    //         prevData.map(object => {
    //             if (object.id === id) {
    //                 return {
    //                     ...object,
    //                     matched: true
    //                 }
    //             } else return object;
    //         })
    //     ))
    // }
   
    // //Map all the questions as cards
    // const questionCards = questionData.questions.map(card => {
    //     return (
    //         <Question 
    //             key={card.id}
    //             question={card.question}
    //             answer={card.answer}
    //             id={card.id}
    //             onDrop = {id => updateData(id)}
    //         />
    //     )
    // })

    // //Map all the answers as cards
    // const answerCards = currentAnswerData.map(card => {
    //     return (
    //         <Answer 
    //             key={card.id}
    //             answer={card.answer}
    //             id={card.id}
    //             matched={card.matched}
    //         />
    //     )
    // })

    // //Check if all questions have been answered
    // let count = 0;
    // let finished = false;
    // currentAnswerData.filter((item) => {
    //     if (item.matched) {count++};
    //     if (count === currentAnswerData.length) {
    //         finished = true;
    //     }  
    // })
    
    return (
        <div className="drag-drop">
            <DndProvider backend={HTML5Backend}>
                <div className="questions">
                    <h2>Questions</h2>
                    <br/>
                    {/* {questionCards} */}
                </div>

                <div className="answers">
                    <h2>Answers</h2>
                    <br/>
                    {/* {answerCards} */}
                </div>

                {/* <TimerAndResult maxTime={questionData.maxTime} finished={finished}/> */}
                
            </DndProvider>
        </div>
    )
}