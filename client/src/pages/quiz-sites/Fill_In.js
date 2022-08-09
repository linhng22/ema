import React, { useEffect, useState } from "react"
import FillInQuestion from "../../components/FillInQuestion"
import Canvas from "../../components/Canvas"
import timeOutIcon from "../../images/time-out.png"
import guide from "../../images/info.png"
import happyFace from "../../images/happy.png"
import sadFace from "../../images/sad.png"
import normalFace from "../../images/normal.png"
import congrat from "../../images/congrat.png"
import "../../css/fill-in.css"

export default function FillIn() {
    const [speed, setSpeed] = useState(2);
    const [timeOutBox, setTimeOutBox] = useState(false);
    const [guideBox, setGuideBox] = useState(false);
    const [pauseTimer, setPauseTimer] = useState(false);
    const [finished, setFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [face, setFace] = useState(normalFace);

    // Update speed so that the character could change its move
    function updateSpeed(num) {
        const newSpeed = speed + num;
        if (newSpeed >= 0) setSpeed(newSpeed);
    }
    
    // Display the time-out pop-up
    function displayPopup() {
        setTimeOutBox(true);
    }   

    //Display the guide box, pause the countdown timer
    function displayGuide() {
        setGuideBox(true);
        setPauseTimer(true);
    }

    // Close the guide box, resume the countdown timer
    function closeGuide() {
        setGuideBox(false);
        setPauseTimer(false);
    }

    //Update character's face according to user's score
    useEffect(() => {
        if (score >= 70) setFace(happyFace);
        else if (score >= 50 && score < 70) setFace(normalFace);
        else setFace(sadFace);
    }, [score]);
    
    return (
        <div className="fill-in-container"
            style={{backgroundColor: (timeOutBox || finished) ? "#95e1d3" : "white"}}>
            <div 
                className="canvas-box" 
                style={{display: (timeOutBox || finished) ? "none" : ""}}>
                    <div className="guide-box">
                        <button className="backToQuiz fill-in" onClick={() => window.location.replace("/quiz")} >Về trang Quiz</button>
                        <button className="again fill-in" onClick={() => window.location.reload()}>Làm lại</button>
                        <img 
                            src={guide} 
                            className="icon guide"
                            onClick={() => displayGuide()}/>
                        <p>Hướng dẫn</p>
                        
                        <div className="fill-in-form">
                            <FillInQuestion 
                                changeSpeed={(num) => updateSpeed(num)}
                                displayPopup={() => displayPopup()}
                                finishQuiz={()=> setFinished(true)}
                                updateScore={(newScore) => setScore(newScore)}
                                pauseTimer={pauseTimer}/>
                        </div>

                    </div>

                <div 
                    className="canvas" 
                    style={{opacity: (guideBox || finished) ? "0.5" : "1"}}>
                        <Canvas 
                            speed = {speed}/>
                </div>
                
            </div>
            
            <div 
                className="out-of-time-box pop-up" 
                style={{display: (timeOutBox && score === 0) ? "" : "none"}}>
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
                    <p>Điền đáp án tiếng Anh vào ô "Đáp án" trong thời gian quy định. 
                        <br/>
                        Cố gắng trả lời đúng trước khi bấm vào dấu mũi tên hoặc ấn vào "Enter" vì bạn sẽ không thể quay lại câu hỏi trước.
                    </p>
                    <button onClick={() => closeGuide()} className="guide btn">Đóng</button>
            </div>

            <div
                className="finished pop-up"
                style={{display: (finished) ? "" : "none"}}
                >
                    <img src={congrat} alt="congratulation icon" className="big-icon"/>
                    <h2>Hoàn thành</h2>
                    <img 
                        src={face} 
                        alt="character face" 
                        className="happy face" />
                    <p>Yay! Chúc mừng bạn đã hoàn thành bài Quiz.
                        <br/>Bạn đạt được <span className="highlight">{score}</span> / 100 điểm.
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