import React, { useState, useEffect } from "react"

export default function Timer({maxTime, finished}) {
    const [time, setTime] = useState(maxTime);
    const [timerOn, setTimerOn] = useState(true);
    const [text, setText] = useState("");

    // Update the max time after getting data from backend
    useEffect(() => {
        setTime(maxTime)
    }, [maxTime]);

    // Count down time
    if (time > 0 && timerOn) {
        setTimeout(() => setTime(time - 1), 1000);
    }

    useEffect(() => {
        if (time === 0) {
            setText("Hết giờ!");
            setTimerOn(false);
        }
    }, [time]);
    
        
    // Evaluate grade based on the actual time doing quiz and the total given time
    const handleFinish = () => {
        setTimerOn(false);
        if (time/maxTime > 0.89) {
            setText("Tuyệt vời!");
        } else if (time/maxTime > 0.69 && time/maxTime < 0.9) {
            setText("Cố gắng thêm một chút nữa nào!");
        } else if (time/maxTime > 0.49 && time/maxTime < 0.7) {
            setText("Cố gắng hơn nữa nhé!");
        } else {
            setText("Chú ý ôn tập và làm lại nào!");
        }
    }

    return (
        <>
            <div className="timer">Thời gian: 
                <span className="highlight"> {time >= 0 ? time : "..."}</span> giây
                <div 
                    className="progress-bar" 
                    style={{width: `${(time / maxTime) * 98}%`}}>
                </div>
                <br/>
                <button className="backToQuiz" onClick={() => window.location.replace("/quiz")} >Về trang Quiz</button>
                <button className="again" onClick={() => window.location.reload()}>Làm lại</button>
                <button className="finish" onClick={handleFinish} style={{display: finished ? "" : "none"}}>Hoàn thành</button>
            </div>

            <div
                className="results"
                style={{display: timerOn ? "none" : ""}}>
                    <h4>Hoàn thành trong: <span className="highlight">{time}</span> giây</h4>
                    <h3>Số điểm đạt được: <span className="highlight">{(time/maxTime).toFixed(2) * 100}</span> / 100</h3>
                    <div>{text}</div>
            </div>
        </>
        
    )
}