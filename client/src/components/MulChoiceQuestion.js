import React, {useState} from "react";
import axios from "axios"
var loaded = false;

export default function MultipleChoiceQuestion() {
    const [questionData, setQuestionData] = useState({
        maxTime: -1,
        questions: []
    });
    const [answerData, setAnswerData] = useState([]);
    const [x, setX] = useState(1);
    const [answersToDisplay, setAnswersToDisplay] = useState([])

    // Get data from backend and shuffle the answer data once
    if (!loaded) {
        axios.get("/quiz/drag-drop").then(response => {
            const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
            setQuestionData(response.data.questionData);
            setAnswerData(shuffle(response.data.answerData));
            loaded = true
        });
    }
    // console.log(questionData)
    // console.log(answerData)
    // const x = 1;
    const index = answerData.findIndex((answer) => answer.id === x);
    // console.log(index)

    // get a random answer from the answerData array. Source: https://www.programiz.com/javascript/examples/get-random-item
    function getRandomAnswer(arr) {
        // get random index value
        let randomIndex = Math.floor(Math.random() * arr.length);

        if (randomIndex !== x) {
            // get random item
            const item = arr[randomIndex];
            return item;
        } else {
            console.log("identical answers");
            // call the function again if the random answer is identical with the correct answer
            getRandomAnswer(arr);
        }
        
    }
    
    const randomAnswer = getRandomAnswer(answerData)
    console.log(randomAnswer)

    function checkAnswer(e) {
        let answerID = parseInt(e.target.id);
        if (answerID === x) {
            console.log("correct answer");
            if (x < questionData.questions.length) {
                const y = x + 1;
                setX(y);
            } else {
                console.log("out of question!");
            }
            
        } else {
            console.log("wrong answer");
        }
    }
    console.log(x)
    return (
        <>
            <div>Chọn từ hoặc câu bằng tiếng Anh sao cho đúng nghĩa với các từ sau</div>
            <div className="multichoice-question">
                {questionData.questions.length > 1 ? questionData.questions[x - 1].question : ""}
            </div>
            <div className="mulchoice-answers">
                <button 
                    className="mulchoice-answer"
                    onClick={checkAnswer}
                    id={(answerData.length > 1 && randomAnswer.id)? randomAnswer.id : null}>
                        {(answerData.length > 1 && randomAnswer.answer)? randomAnswer.answer : ""}</button>
                <button 
                    className="mulchoice-answer"
                    onClick={checkAnswer}
                    id={x}>
                        {index >= 0 ? answerData[index].answer : ""}</button>
            </div>
        </>
    )
}