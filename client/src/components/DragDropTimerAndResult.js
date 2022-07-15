import React, { useState, useEffect } from "react"

export default function Timer({maxTime, finished}) {
    const [time, setTime] = useState(maxTime);
    const [timerOn, setTimerOn] = useState(true);
    const [text, setText] = useState("");

    useEffect(() => {
        setTime(maxTime)
    }, [maxTime]);
    
    useEffect(() => {
        if (time > 0 && timerOn) {
            setTimeout(() => setTime(time - 1), 1000);
        } else if (time == 0){
            alert("Hết giờ!")
        }
    }, [time]);
        
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
                <span className="timer highlight"> {time}</span> giây
            </div>
            <div>
            <button className="again" onClick={() => window.location.reload()}>Làm lại</button>
            <button className="finish" onClick={handleFinish} style={{display: finished ? "" : "none"}}>Hoàn thành</button>
            </div>

            <div
                className="results"
                style={{display: timerOn ? "none" : ""}}>
                    <h3>Hoàn thành trong: <span className="highlight">{time}</span> giây</h3>
                    <h2>Số điểm đạt được: <span className="highlight">{(time/maxTime).toFixed(2) * 100}</span> / 100</h2>
                    <div>{text}</div>
            </div>

            <div className="alert"></div>
        </>
        
    )
}