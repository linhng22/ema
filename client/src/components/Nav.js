import React from "react";
import "../css/Nav.css"
import {Link} from "react-router-dom"
import Logo from "../images/logo.png"

export default function Nav() {
    return (
        <nav className="nav">
            <img src={Logo} className="nav--logo" alt="logo"/>
            <div className="nav--links">
                <Link to="/">Trang chủ</Link>
                <Link to="/schedule">Lịch học</Link>
                <Link to="/gallery">Thư viện ảnh</Link>
                <Link to="/quiz">Quiz</Link>
                <Link to="/sign-in">Đăng nhập</Link>
            </div>
        </nav>
    )
}