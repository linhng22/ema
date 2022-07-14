import React, { useState } from "react";
import "../css/create-test.css"
import FormContent from "../components/CreateTestFormContent"

export default function CreateTest() {
    const [num, setNum] = useState(2);
    const [data, setData] = useState({
        maxTime : 5,
        questions: []
    });

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
    
    //Update "questions" list in the data
    function updateData(newData) {
        // setTimeout function is used to fix this bug "Cannot update a component from inside the function body of a different component"
        setTimeout(() => setData(prevData => ({
            ...prevData,
            questions: newData
        })), 1000)
    }
    
    function handleChange(e) {
        // Set the number of questions according to the user's input
        if(e.target.id === "question-number") {
            setNum(e.target.value);
        }
        if(e.target.id === "maxTime") {
            setData(prevData => ({
                ...prevData,
                maxTime: e.target.value
            }));
        }
        
    }

    function handleSubmit() {

    }

    

    return (
        <div className="test">
            <h2>Tạo đề kiểm tra (Quiz)</h2>
            <div className="form-container">
                <form className="test-form" onSubmit={handleSubmit}>
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
                            placeholder={ (data.maxTime / 60 >=1) ? (data.maxTime / 60) : (data.maxTime)}
                            required/>
                        <span> phút</span>
                    </div>
                    <div className="form-heading">
                        <h3>Câu hỏi</h3>
                        <h3>Đáp án</h3>
                    </div>

                    {rowElements}
                    
                    <input type="submit" value="Tạo đề thi" />
                    
                </form>
            </div>
        </div>
    )
}