import React from "react";
import "../css/sign-in.css"

export default function SignIn() {
    function moveLabelUp(event) {
        event.target.classList.add("active")
    }

    function moveLabelDown(event) {
        if (event.target.value !="") return;
        event.target.classList.remove("active")
    }

    return (
        <div className="sign-in">
            <div className="sign-in--box">
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
                                required/>
                                <label >Mật khẩu</label>
                            </div>

                            <input type="submit" value="Đăng nhập" className="sign-btn"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}