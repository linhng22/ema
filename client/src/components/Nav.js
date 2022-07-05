import React from "react";
import "../css/Nav.css"

export default function Nav() {
    return (
        <nav className="nav">
            <img src="./images/logo.png" className="nav--logo"/>
            <ul className="nav--links">
                <li><a href="#">Trang chủ</a></li>
                <li><a href="#">Lịch khai giảng</a></li>
                <li><a href="#">Ảnh</a></li>
                <li><a href="#">Quiz</a></li>
                <li><a href="#">Đăng nhập</a></li>
            </ul>
        </nav>
    )
}