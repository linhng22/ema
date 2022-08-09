import React, { useEffect, useState } from "react";
var questionList = []
var answerList = []
export default function CreateTestFormContent(props) {
    const [questionArray, setquestionArray] = useState({
        id: 0,
        question: ""
    });
    const [answerArray, setAnswerArray] = useState({
        id: 0,
        matched: false
    });

    function addQuestion(e) {
        const {id, name, value} = e.target;
        setquestionArray(prevArray => ({
            ...prevArray,
            id: parseInt(id.substring(name.length)),
            [name] : value
        }));
    }

    function addAnswer(e) {
        const {id, name, value} = e.target;
        setAnswerArray(prevArray => ({
            ...prevArray,
            id: parseInt(id.substring(name.length)),
            [name] : value
        }));
    }
    
    useEffect(() => {
        if (questionArray.id > 0) {
            questionList[questionArray.id - 1] = questionArray;
        }
    }, [questionArray])

    useEffect(() => {
        if (answerArray.id > 0) {
            answerList[answerArray.id - 1] = answerArray;
        }
    }, [answerArray])
    props.updateData({questionList, answerList})
    
    return (
        <div className="form-content-box">
            <div className="form-content">
                <p>{props.id}</p>
                <input 
                    type="text"
                    minLength={1}
                    className="question input"
                    autoComplete="off"
                    onChange={addQuestion}
                    name="question"
                    id={`question${props.id}`}
                    required/>
            
                <input 
                    type="text"
                    minLength={1}
                    className="answer input"
                    autoComplete="off"
                    onChange={addAnswer}
                    name="answer"
                    id={`answer${props.id}`}
                    required/>
            </div>
            
            
        </div>
    )
}