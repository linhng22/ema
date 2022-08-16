import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from '../components/Nav';
import Footer from "../components/Footer";
import "../css/sign-in.css";
import congrat from "../images/congrat.png";
import sad from "../images/sad.png"

axios.defaults.withCredentials = true;

export default function SignIn(props) {
    const[signedIn, setSignedIn] = useState(props.admin);
    const[text, setText] = useState("Bạn đã đăng nhập thành công!");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setSignedIn(props.admin);
    },[props.admin]);
    console.log(signedIn);

    function moveLabelUp(event) {
        event.target.classList.add("active")
    }

    function moveLabelDown(event) {
        if (event.target.value !== "") return;
        event.target.classList.remove("active")
    }

    function handleChange(e){
        if (e.target.id === "userName"){
            setUserName(e.target.value);
        }
        if (e.target.id === "password"){
            setPassword(e.target.value);
        }
    }
    
    function handleSubmit(e){
        e.preventDefault();
        
        const dataToSend = [userName, password];
        axios.post("http://localhost:8000/sign-in", dataToSend).then((res) => {
            console.log(res);
            if (res.data.success){
                setText("Bạn đã đăng nhập thành công!");
                setSignedIn(true);
                props.isAdmin(true);
                
            } else {
                setText("Đăng nhập không thành công!");
            }
            // setPopup(true);
        })
        .catch(err => {
            console.log(err);
            alert("Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại.");
        })
    }
    
    function signOut(){
        axios.get("http://localhost:8000/sign-out").then(response => {
            console.log(response);
            setSignedIn(false);
            setText(null);
            props.isAdmin(false);
        })
    }

    return (
        <>
            <Nav admin={props.admin} />
            <div className="sign-in">
                <div className="sign-in--box" style={{display: signedIn ? "none" : ""}}>
                    <div className="forms-wrap">
                        <form autoComplete="off" className="sign-in--form">
                            <div className="heading">
                                <h2>Đăng nhập</h2>
                                <h6>Chỉ dành cho Admin</h6>
                            </div>
                            <div className="form">
                                <div className="input-wrap">
                                    <input 
                                    type="text"
                                    minLength={4}
                                    className="input-field"
                                    autoComplete="off"
                                    id="userName"
                                    name="userName"
                                    onFocus={moveLabelUp}
                                    onBlur={moveLabelDown}
                                    onChange={handleChange}
                                    required/>
                                    <label>Tên đăng nhập</label>
                                </div>

                                <div className="input-wrap">
                                    <input 
                                    type="password"
                                    minLength={6}
                                    className="input-field"
                                    autoComplete="off"
                                    id="password"
                                    name="password"
                                    onFocus={moveLabelUp}
                                    onBlur={moveLabelDown}
                                    onChange={handleChange}
                                    required/>
                                    <label >Mật khẩu</label>
                                </div>

                                <input 
                                    type="submit" 
                                    value="Đăng nhập" 
                                    className="sign-btn"
                                    onClick={handleSubmit}/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="pop-up message" style={{display: signedIn ? "" : "none"}}>
                    <img src={signedIn ? congrat : sad} alt="congratulation icon" className="big-icon"/>
                    <h2>{text}</h2>
                    <button
                        className="backToQuiz"
                        onClick={() => window.location.replace("/")}>
                            Về trang chủ
                    </button>
                    <button
                        className="again"
                        style={{display: signedIn ? "none" : ""}}
                        onClick={() => setSignedIn(false)}>
                            Thử lại
                    </button>
                    <button
                        className="again"
                        style={{display: signedIn ? "" : "none"}}
                        onClick={signOut}>
                            Đăng xuất
                    </button>
                </div>
            </div>
            <Footer/>
        </>
        
    )
}