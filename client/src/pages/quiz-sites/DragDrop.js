import React, {useState } from "react";
import axios from "axios"
import "../../css/drag-drop.css"
import Question from "../../components/DragDropQuestion"
import Answer from "../../components/DragDropAnswer"
import TimerAndResult from "../../components/DragDropTimerAndResult"
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
var loaded = false;

export default function DragDrop() {
    const [questionData, setQuestionData] = useState({
        maxTime: -1,
        questions: []
    });
    const [answerData, setAnswerData] = useState([]);

    // Get data from backend and shuffle the answer data once
    if (!loaded) {
        axios.get("/quiz/drag-drop").then(response => {
            const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
            setQuestionData(response.data.questionData);
            setAnswerData(shuffle(response.data.answerData));
            loaded = true
        });
    }
    
    //Map all the questions as cards
    const questionCards = questionData.questions.map(card => {
        return (
            <Question 
                key={card.id}
                question={card.question}
                id={card.id}
                onDrop = {id => updateData(id)}
                answerData={answerData}
            />
        )
    });
    
    //Map all the answers as cards in random order
    const answerCards = answerData.map(card => {
        return (
            <Answer 
                key={card.id}
                answer={card.answer}
                id={card.id}
                matched={card.matched}
                index={answerData.findIndex((answer) => answer.answer === card.answer)}
            />
        )
    });
    
    
    
    // Update the value of the "matched" key of a specific object in the answer array
    const updateData = (id) => {
        setAnswerData(prevData => (
            prevData.map(object => {
                if (object.id === id) {
                    return {
                        ...object,
                        matched: true
                    }
                } else return object;
            })
        ))
    };

    //Check if all questions have been answered
    let count = 0;
    let finished = false;
    answerData.filter((item) => {
        if (item.matched) {
            count++;
            
        };
        if (count === questionData.questions.length) {
            finished = true;
        } 
    })
    
    return (
        <div className="drag-drop">
            <DndProvider backend={HTML5Backend}>
                <div className="questions">
                    <h2>Questions</h2>
                    <div className="question-box">
                        {questionCards}
                    </div>
                </div>

                <div className="answers">
                    <h2>Answers</h2>
                    <div className="answer-box">
                        {answerCards}
                    </div>
                </div>

                <TimerAndResult maxTime={questionData.maxTime} finished={finished}/>
                
            </DndProvider>
        </div>
    )
}