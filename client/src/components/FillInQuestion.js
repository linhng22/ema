import React, {useEffect, useState} from "react";
import axios from "axios"
var loaded = false;

export default function FillInQuestion(props) {
    const [questionData, setQuestionData] = useState({
        maxTime: -1,
        questions: []
    });
    const [answerData, setAnswerData] = useState([]);
    const [x, setX] = useState(1);

    // Get data from backend and shuffle the answer data once
    if (!loaded) {
        axios.get("/quiz/drag-drop").then(response => {
            const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
            setQuestionData(response.data.questionData);
            setAnswerData(shuffle(response.data.answerData));
            loaded = true
        });
    }
    
    // setTimeout(() => props.changeSpeed(-1), 5000);

    function checkAnswer(e) {
        // Find the index of the correct answer in the answerData
        const index = answerData.findIndex((answer) => answer.id === x);

        let userAnswer = e.target.value.trim().toLowerCase();
        if (userAnswer === answerData[index].answer.toLowerCase()) {
            props.changeSpeed(2);
            console.log("correct answer")
        } else {
            console.log("wrong answer")
        }
    }
    
    return (
        <>
            <div>Điền từ hoặc câu bằng tiếng Anh sao cho đúng nghĩa với từ/câu sau</div>
            <div className="fill-in-question">
                {questionData.questions.length > 1 ? questionData.questions[x - 1].question : ""}
            </div>
            <div>
                {/* <button 
                    className="mulchoice-answer"
                    onClick={checkAnswer}
                    id={(answerData.length > 1)? "alo" : null}>
                        {(answerData.length > 1)? "alo" : ""}
                </button>
                
                <button 
                    className="mulchoice-answer"
                    onClick={checkAnswer}
                    id={x}>
                        {index >= 0 ? answerData[index].answer : ""}</button> */}
                <input 
                    className="fill-in-answer"
                    type="text"
                    onChange={checkAnswer}
                    placeholder="Điền đáp án vào đây" />
            </div>
        </>
    )
}