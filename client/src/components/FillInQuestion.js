import React, {useEffect, useState} from "react";
import axios from "axios";
import nextIcon from "../images/next.png"
var loaded = false;

export default function FillInQuestion(props) {
    const [questionData, setQuestionData] = useState({
        maxTime: -1,
        questions: []
    });
    const [answerData, setAnswerData] = useState([]);
    const [questionNum, setQuestionNum] = useState(1);
    const [time, setTime] = useState(0);
    const [timerOn, setTimerOn] = useState(true);
    const [finished, setFinished] = useState(false);

    // Update the max time after getting data from backend
    useEffect(() => {
        if (questionData.maxTime > 0) {
            setTime(questionData.maxTime);
        }
    }, [questionData]);

    // Count down time
    if (time > 0 && timerOn) {
        setTimeout(() => setTime(time - 1), 1000);
    }

    // Decrease the speed every 3s
    useEffect(() => {
        if (time % 4 === 3) {
            props.changeSpeed(-1);
        }
    }, [time]);

    // Get data from backend and shuffle the answer data once
    if (!loaded) {
        axios.get("/quiz/drag-drop").then(response => {
            const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
            setQuestionData(response.data.questionData);
            setAnswerData(shuffle(response.data.answerData));
            loaded = true
        });
    }
    
    function checkAnswer(e) {
        // Find the index of the correct answer in the answerData
        const index = answerData.findIndex((answer) => answer.id === questionNum);

        let userAnswer = e.target.value.trim().toLowerCase();
        if (userAnswer === answerData[index].answer.toLowerCase()) {
            props.changeSpeed(1);
        }
        if (e.which === 13) {
            if (questionNum < questionData.questions.length) goToNextQuestion();
            else setFinished(true);
        }
    }

    // Go to the next question
    function goToNextQuestion() {
        const nextQuestionNum = questionNum + 1;
        setQuestionNum(nextQuestionNum);
        // Set value in input as none
        document.querySelector(".fill-in-answer").value = "";
    }

    
    return (
        <div className="fill-in-form">
            <div>Điền từ hoặc câu bằng tiếng Anh sao cho đúng nghĩa với từ/câu sau</div>
            <div className="fill-in-question">
                {questionData.questions.length > 1 ? questionData.questions[questionNum - 1].question : ""}
            </div>
            <div className="fill-in-answer-box">
                <input 
                    className="fill-in-answer"
                    type="text"
                    onKeyUp={checkAnswer}
                    autoComplete="off"
                    minLength={1}
                    placeholder="Điền đáp án vào đây" />
                <img 
                    className="icon next" 
                    src={nextIcon} 
                    alt="next question"
                    onClick={goToNextQuestion}
                    style={{display: (questionNum > questionData.questions.length - 1) ? "none" : ""}}/>
            </div>
        </div>
    )
}