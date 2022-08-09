import React, { useState } from "react";
import axios from "axios"
import Nav from '../components/Nav';
import "../css/create-test.css"
import FormContent from "../components/CreateTestFormContent"
var notice1="Chỉ nhập chữ số!";
var notice2="Chỉ cung cấp 1 đáp án duy nhất!"

export default function CreateTest() {
    const [num, setNum] = useState(2);
    const [questionData, setQuestionData] = useState({
        maxTime : 5,
        questions: []
    });
    const [answerData, setAnswerData] = useState([]);
    const [hasWrongAnswer, setHasWrongAnswer] = useState(false);
    const [wrongAnswerList, setWrongAnswersList] = useState(["|"]);
    const [notice, setNotice] = useState(null);

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
        setNotice(null);
        // Set the number of questions according to the user's input if it contains only numbers
        if(e.target.id === "question-number" && e.target.value) {
            if (onlyNumbers(e.target.value.trim())){
                setNum(e.target.value.trim());
            } else{
                setNotice(notice1);
            }
            
        }

        //Set the maximum amount of quiz time if it contains only numbers
        if(e.target.id === "maxTime") {
            if (onlyNumbers(e.target.value.trim())){
                setQuestionData(prevData => ({
                    ...prevData,
                    maxTime: e.target.value.trim()
                }));
            } else{
                setNotice(notice1);
            }
        }

        // Set the list of wrong answers
        if (e.target.id === "wrongAnswers") {
            const str = e.target.value.trim();
            const list = str.split('&').trim();
            setWrongAnswersList(list);
        }
    }

    // Check if user's inputs for question number and time contain only digits. Source: https://bobbyhadz.com/blog/javascript-check-if-string-contains-only-digits
    function onlyNumbers(str){
        return /^[0-9.,]+$/.test(str);
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

    return (
        <>
            <Nav />
            <div className="test">
                <h2>Tạo đề kiểm tra ngắn (Quiz)</h2>
                <div className="form-container">
                    <form className="test-form" >
                        <div className="question-number-container">
                            <label>Số câu hỏi: </label>
                            <input 
                                type="text"
                                className="small input"
                                autoComplete="off"
                                id="question-number"
                                name="question-number"
                                onChange={handleChange}
                                placeholder="Điền chữ số. VD: 2"
                                required/>
                        </div>
                        
                        <div className="quiz-time">
                            <label>Thời gian làm bài (<b>phút</b>): </label>
                            <input 
                                type="text"
                                className="small input"
                                autoComplete="off"
                                id="maxTime"
                                name="maxTime"
                                onChange={handleChange}
                                placeholder="Điền chữ số. VD: 2"
                                required/>
                        </div>

                        <div className="form-heading">
                            <h3>Câu hỏi</h3>
                            <h3>Đáp án</h3>
                        </div>

                        {rowElements}
                        
                        
                        
                    </form>

                    <div className="wrong-answers-container">
                        <span><b>Thêm các đáp án sai để tạo phương án nhiễu?</b></span>
                        <div className="radio-btn-box">
                            <div>
                                <input 
                                    type="radio"
                                    className="radio-btn" 
                                    value="yes"
                                    checked={hasWrongAnswer}
                                    onChange={handleRadioBtn}/> Có
                            </div>
                            
                            <div>
                                <input 
                                    type="radio"
                                    className="radio-btn" 
                                    value="no"
                                    checked={!hasWrongAnswer}
                                    onChange={handleRadioBtn}/> Không
                            </div>
                        </div>

                        <div 
                            className="wrong-answers-box"
                            style={{display: hasWrongAnswer ? "" : "none"}}>
                                <b>Lưu ý: </b>Ngăn cách các đáp án sai bằng dấu "<b>&</b>". VD: time&get&mine. 
                            <br/>
                            <input 
                                className="wrong-answers input"
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

                
                <div 
                    style={{display: notice ? "" : "none"}}
                    className="notice cloud">
                </div>
            </div>
        </>
        
    )
}