import React, {useEffect, useState} from "react";
import FillInProgressBar from "./FillInProgressBar"
import axios from "axios";
import nextIcon from "../images/next.png"
var loaded = false;
var hint1 = 'Nếu chưa chắc chắn về câu trả lời, đừng nhấn "Enter" hay dấu mũi tên nhé!';
var hint2 = 'Chính xác! Nhấn "Enter" hoặc dấu mũi tên nhé!';
var hint3 = 'Chưa đúng rồi! Cố lên!';
export default function FillInQuestion(props) {
    const [questionData, setQuestionData] = useState({
        maxTime: -1,
        questions: []
    });
    const [answerData, setAnswerData] = useState([]);
    const [questionNum, setQuestionNum] = useState(1);
    const [time, setTime] = useState(questionData.maxTime);
    const [timerOn, setTimerOn] = useState(!props.pauseTimer);
    const [correct, setCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [hint, setHint] = useState(hint1);

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
        if (time === 0 ) {
            setTimerOn(false);
            props.displayPopup(true);
        }
    }, [time]);

    // Pause the countdown timer if the user clicks on the "guide" button, resume it if the user clicks on "Close" button
    useEffect(() =>{
        if (props.pauseTimer){
            setTimerOn(false);
        } else {
            setTimerOn(true);
        }
    }, [props.pauseTimer]);

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
        if (e.which !== 13) {
            setHint(hint3);
            if (userAnswer === answerData[index].answer.toLowerCase()) {
                // Increase speed by 2
                props.changeSpeed(2);
                // Update hint
                setHint(hint2);
                //Increase the score by 1 only once
                if (!correct){
                    const newScore = score + 1;
                    setScore(newScore);
                    setCorrect(true);
                }
            }
        } else {
            if (questionNum < questionData.questions.length) {
                goToNextQuestion();
                props.updateScore(Math.floor(score / questionData.questions.length * 100));
            }
            else {
                props.finishQuiz(true);
                props.updateScore(Math.floor(score / questionData.questions.length * 100));
            };
        }
    }

    
    // Go to the next question
    function goToNextQuestion() {
        setHint(hint1);
        if (questionNum < questionData.questions.length){
            setCorrect(false);
            const nextQuestionNum = questionNum + 1;
            setQuestionNum(nextQuestionNum);
            // Set value in input as none
            document.querySelector(".fill-in-answer").value = "";
        } else {
            props.finishQuiz(true);
            props.updateScore(score);
        }
    }
    
    return (
        <>          
            <div className="progress-bar-container">
                <FillInProgressBar 
                    time={time}
                    maxTime={questionData.maxTime}/>
            </div>
  
            <div className="fill-in-question">
                Question {questionNum} : "
                <span>{questionData.questions.length > 1 ? questionData.questions[questionNum - 1].question : ""}</span>"
            </div>

            <div className="fill-in-answer-box">
                <input 
                    className="fill-in-answer"
                    type="text"
                    onKeyUp={checkAnswer}
                    autoComplete="off"
                    minLength={1}
                    placeholder="Đáp án" />
                <br/>
                <img 
                    className="icon next" 
                    src={nextIcon} 
                    alt="next question"
                    onClick={goToNextQuestion}
                    style={{display: (questionNum > questionData.questions.length) ? "none" : ""}}/>
                <p className="hint"><b>Chú ý: </b>{hint}</p>
            </div>
            
        </>
    )
}