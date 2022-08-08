import React, { useState } from "react"
import FillInQuestion from "../../components/FillInQuestion"
import Canvas from "../../components/Canvas"
import timeOutIcon from "../../images/time-out.png"
import guide from "../../images/info.png"
import "../../css/fill-in.css"

export default function FillIn() {
    const [speed, setSpeed] = useState(2);
    function updateSpeed(num) {
        const newSpeed = speed + num;
        if (newSpeed >= 0) setSpeed(newSpeed);
    }

    const [timeOutBox, setTimeOutBox] = useState(false);
    function displayPopup() {
        setTimeOutBox(true);
    }

    const [guideBox, setGuideBox] = useState(false);
    
    return (
        <div className="fill-in-container"
            style={{backgroundColor: (timeOutBox) ? "#95e1d3" : "white"}}>
            <div className="canvas-box" style={{display: (timeOutBox) ? "none" : ""}}>
                <div className="guide-box">
                    <img 
                        src={guide} 
                        className="icon guide"
                        onClick={() => setGuideBox(true)}/>
                    <p>Hướng dẫn</p>
                    
                    <div className="fill-in-form">
                        <FillInQuestion 
                            changeSpeed={(num) => updateSpeed(num)}
                            displayPopup={() => displayPopup()}/>
                    </div>

                </div>

                <div className="canvas">
                    <Canvas 
                        speed = {speed}/>
                </div>
                
            </div>
            
            <div 
                className="out-of-time-box pop-up" 
                style={{display: (timeOutBox) ? "" : "none"}}>
                    <img className="big-icon" src={timeOutIcon} alt="out of time"/>
                    <h2>Hết giờ!</h2>
                    <button
                        className="backToHome"
                        onClick={() => window.location.replace("/quiz")}>
                            Về trang Quiz
                    </button>
                    <button
                        className="again"
                        onClick={() => window.location.reload()}>
                            Làm lại
                    </button>
            </div>

            <div
                className="guide pop-up"
                style={{display: guideBox ? "" : "none"}}>
                    <img src={guide} alt="guide icon" className="big-icon"/>
                    <h2>Hướng dẫn</h2>
                    <p>Điền đáp án vào ô "Đáp án" trong thời gian quy định. 
                        <br/>
                        Cố gắng trả lời đúng trước khi bấm vào dấu mũi tên phía dưới hoặc ấn vào "Enter" vì bạn sẽ không thể quay lại câu hỏi trước.
                    </p>
                    <button onClick={() => setGuideBox(false)}>Đóng</button>
                </div>
        </div>
    )
}