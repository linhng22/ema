import React, { useEffect, useState } from "react";
var questionList = []
export default function CreateTestFormContent(props) {
    const [array, setArray] = useState({
        id: 0,
        question: "",
        answer: ""
    })

    function handleChange(e) {
        const {id, name, value} = e.target
        setArray(prevArray => ({
            ...prevArray,
            id: id.substring(name.length),
            [name] : value
        }))
        
    }

    useEffect(() => {
        if (array.id > 0) {
            questionList[array.id - 1] = array;
        }
    }, [array])
    props.updateData(questionList)
    
    return (
        <div className="form-content">
            <input 
                type="text"
                minLength={4}
                className="question"
                autoComplete="off"
                onChange={handleChange}
                name="question"
                id={`question${props.id}`}
                required/>
            <input 
                type="text"
                minLength={4}
                className="answer"
                autoComplete="off"
                onChange={handleChange}
                name="answer"
                id={`answer${props.id}`}
                required/>
        </div>
    )
}