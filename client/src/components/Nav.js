import React from "react";
import "../css/Nav.css"
import {Link} from "react-router-dom"
import Logo from "../images/logo.png"

export default function Nav() {
    return (
        <nav className="nav">
            <img 
                src={Logo} 
                className="nav--logo" 
                alt="logo"
                onClick={() => window.location.replace("/")}/>
            <div className="nav--links">
                <Link to="/" onClick={() => window.location.replace("/")}>Trang chủ</Link>
                <Link to="/news" onClick={() => window.location.replace("/news")}>Bảng tin</Link>
                <Link to="/quiz" onClick={() => window.location.replace("/quiz")}>Quiz</Link>
                <Link to="/sign-in" onClick={() => window.location.replace("/sign-in")}>Đăng nhập</Link>
            </div>
        </nav>
    )
}