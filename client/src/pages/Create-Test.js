import React, { useState } from "react";
import axios from "axios"
import "../css/create-test.css"
import FormContent from "../components/CreateTestFormContent"

export default function CreateTest() {
    const [num, setNum] = useState(2);
    const [questionData, setQuestionData] = useState({
        maxTime : 5,
        questions: []
    });
    const [answerData, setAnswerData] = useState([]);
    const [hasWrongAnswer, setHasWrongAnswer] = useState(false);
    const [wrongAnswerList, setWrongAnswersList] = useState(["|"]);

    // Display a certain number of question and answer rows
    let rowArray = []
    for (let i = 0; i < num; i++) {
        rowArray.push(
        <FormContent 
            key={`questionSet${i}`} 
            onChange={handleChange} 
            id={i+1} 
            updateData = {newData => updateData(newData) }/>);
    }
    const rowElements = rowArray.map(row => row)
    
    //Update questionData and answerData
    function updateData(newData) {
        // setTimeout function is used to fix this bug "Cannot update a component from inside the function body of a different component"
        setTimeout(() => {
            setQuestionData(prevData => ({
                ...prevData,
                questions: newData.questionList
            }));
            setAnswerData(newData.answerList)
        }, 0)
    }

    function handleChange(e) {
        // Set the number of questions according to the user's input
        if(e.target.id === "question-number") {
            setNum(e.target.value);
        }

        //Set the maximum amount of quiz time
        if(e.target.id === "maxTime") {
            setQuestionData(prevData => ({
                ...prevData,
                maxTime: e.target.value
            }));
        }

        // Set the list of wrong answers
        if (e.target.id === "wrongAnswers") {
            const str = e.target.value;
            const list = str.split('&');
            setWrongAnswersList(list);
        }
    }

    // Handle the radio button
    function handleRadioBtn(e) {
        if (e.target.value === "yes") {
            setHasWrongAnswer(true)
        } else {
            setHasWrongAnswer(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        if (wrongAnswerList[0] !== "|") {
            for (let i = 0; i < wrongAnswerList.length; i++) {
                answerData[parseInt(num) + i] = {
                    id: parseInt(num) + i + 1,
                    matched: false,
                    answer: wrongAnswerList[i]
                };
            };
            
        }
        
        const dataToSend = [
            {
                maxTime: questionData.maxTime * 60,
                questions: questionData.questions
            },
            answerData];
        axios.post("http://localhost:8000/create-test", dataToSend ).then(res => console.log(res))
        .catch(err => console.log(err))
    }

    // console.log(num);

    return (
        <div className="test">
            <h2>Tạo đề kiểm tra (Quiz)</h2>
            <div className="form-container">
                <form className="test-form" >
                    <div className="question-number-container">
                        <label>Số câu hỏi: </label>
                        <input 
                            type="text"
                            className="number"
                            autoComplete="off"
                            id="question-number"
                            name="question-number"
                            onChange={handleChange}
                            placeholder={num}
                            required/>
                    </div>
                    
                    <div className="quiz-time">
                        <label>Thời gian làm bài: </label>
                        <input 
                            type="text"
                            className="number"
                            autoComplete="off"
                            id="maxTime"
                            name="maxTime"
                            onChange={handleChange}
                            placeholder={ (questionData.maxTime / 60 >=1)
                                ? (questionData.maxTime / 60) 
                                : (questionData.maxTime)}
                            required/>
                        <span> phút</span>
                    </div>
                    <div className="form-heading">
                        <h3>Câu hỏi</h3>
                        <h3>Đáp án</h3>
                    </div>

                    {rowElements}
                    
                    
                    
                </form>

                <div className="wrong-answers-container">
                    <span>Bạn có muốn thêm các đáp án sai để tạo phương án nhiễu? </span>
                    <div className="radio-btn-box">
                        <input 
                            type="radio"
                            className="radio-btn" 
                            value="yes"
                            checked={hasWrongAnswer}
                            onChange={handleRadioBtn}/> Có
                        <input 
                            type="radio"
                            className="radio-btn" 
                            value="no"
                            checked={!hasWrongAnswer}
                            onChange={handleRadioBtn}/> Không
                    </div>
                    <div 
                        className="wrong-answers-box"
                        style={{display: hasWrongAnswer ? "" : "none"}}>
                            <span>Lưu ý: </span>Ngăn cách các đáp án sai bằng dấu &. VD: time&get&mine. 
                        <br/>
                        <input 
                            className="wrong-answers"
                            id="wrongAnswers"
                            placeholder="time&get&mine"
                            onChange={handleChange}/>
                    </div>
                    
                </div>

                <input 
                    type="button" 
                    value="Tạo đề thi" 
                    onClick={handleSubmit}/>
            </div>
        </div>
    )
}