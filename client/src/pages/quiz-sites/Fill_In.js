import React, { useEffect, useState } from "react"
import FillInQuestion from "../../components/FillInQuestion"
import Canvas from "../../components/Canvas"
import timeOutIcon from "../../images/time-out.png"
import guide from "../../images/info.png"
import happyFace from "../../images/happy.png"
import sadFace from "../../images/sad.png"
import congrat from "../../images/congrat.png"
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
    const [finished, setFinished] = useState(false);
    useEffect(() => {
        setSpeed(0);
    }, [finished]);
    const [score, setScore] = useState(0);

    return (
        <div className="fill-in-container"
            style={{backgroundColor: (timeOutBox || score > 0) ? "#95e1d3" : "white"}}>
            <div 
                className="canvas-box" 
                style={{display: (timeOutBox || score > 0) ? "none" : ""}}>
                    <div className="guide-box">
                        <img 
                            src={guide} 
                            className="icon guide"
                            onClick={() => setGuideBox(true)}/>
                        <p>Hướng dẫn</p>
                        
                        <div className="fill-in-form">
                                <FillInQuestion 
                                    changeSpeed={(num) => updateSpeed(num)}
                                    displayPopup={() => displayPopup()}
                                    finishQuiz={()=> setFinished(true)}
                                    updateScore={(newScore) => setScore(newScore)}/>
                        </div>

                    </div>

                <div 
                    className="canvas" 
                    style={{opacity: (guideBox || finished || score > 0) ? "0.5" : "1"}}>
                        <Canvas 
                            speed = {speed}/>
                </div>
                
            </div>
            
            <div 
                className="out-of-time-box pop-up" 
                style={{display: (timeOutBox) ? "" : "none"}}>
                    <img className="big-icon" src={timeOutIcon} alt="out of time"/>
                    <h2>Hết giờ!</h2>
                    <img src={sadFace} alt="sad face" className="sad face" />
                    <button
                        className="backToQuiz"
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
                    <button onClick={() => setGuideBox(false)} className="guide btn">Đóng</button>
            </div>

            <div
                className="finished pop-up"
                style={{display: (score > 0) ? "" : "none"}}
                >
                    <img src={congrat} alt="congratulation icon" className="big-icon"/>
                    <h2>Hoàn thành</h2>
                    <img src={happyFace} alt="happy face" className="happy face" />
                    <p>Yay! Chúc mừng bạn đã hoàn thành bài Quiz.
                        <br/>Điểm số của bạn là <span>{score}</span>.
                    </p>
                    <button
                        className="backToQuiz"
                        onClick={() => window.location.replace("/quiz")}>
                            Về trang Quiz
                    </button>
                    <button
                        className="again"
                        onClick={() => window.location.reload()}>
                            Làm lại
                    </button>
            </div>
        </div>
    )
}