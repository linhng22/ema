import React, { useState } from "react";
import Nav from '../components/Nav';
import Footer from "../components/Footer";
import "../css/quiz.css";
import character1 from "../images/happy2.png"
import character2 from "../images/happy.png"


export default function Quiz(props) {
    const [leftInstruction, setLeftInstruction] = useState(false);
    const [rightInstruction, setRightInstruction] = useState(false);

    return (
        <>
            <Nav admin={props.admin}/>

            <div className="quiz">
                <div className="quiz-header">
                    <h2>Cùng làm quiz thôi!</h2>
                </div>

                <div className="link quiz-links">
                    <div className="link-instruction-character">
                        <div
                            className="instruction left"
                            style={{opacity: leftInstruction ? "1" : "0", transition: "opacity 0.3s"}}>
                                Kéo và thả đáp án sao cho đúng nghĩa với từ được cho câu hỏi.</div>
                        <div>
                            <div className="link-box" onClick={() => window.location.replace("/quiz/drag-drop")}>
                                Drag and Drop
                            </div>
                            <div className="game-character">
                                <img 
                                    src={character1} 
                                    alt="drag-drop game character"
                                    id="character1"
                                    onMouseOver={() => setLeftInstruction(true)}
                                    onMouseOut={() => setLeftInstruction(false)}/>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div className="link-instruction-character">
                        <div>
                            <div className="link-box" onClick={() => window.location.replace("/quiz/fill-in")}>
                                    Fill in Blank
                            </div>
                            <div className="game-character">
                                <img 
                                    src={character2} 
                                    alt="fill-in game character"
                                    id="character2"
                                    onMouseOver={() => setRightInstruction(true)}
                                    onMouseOut={() => setRightInstruction(false)}/>
                            </div>
                        </div>
                        <div 
                        className="instruction right"
                        style={{opacity: rightInstruction ? "1" : "0", transition: "opacity 0.3s"}}>
                            Điền đáp án vào ô trống sao cho đúng nghĩa với từ được cho trong câu hỏi.
                        </div>
                    </div>
                </div>

            </div>

            <Footer/>
        </>
    )
}