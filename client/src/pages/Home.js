import React from "react";
import "../css/home.css";
import image1 from "../images/image1.jpg"
import image2 from "../images/image2.jpg"
import image3 from "../images/image3.jpg"

export default function Home() {
        
    function moveSlider(event) {
        // Change bullets
        const bullets = document.querySelectorAll(".bullets span");
        bullets.forEach(bull => bull.classList.remove("active"));
        event.target.classList.add("active");

        // Change images
        let index = event.target.attributes[0].value;
        const images = document.querySelectorAll(".image");
        images.forEach(img => img.classList.remove("show"));
        document.querySelector(`.img-${index}`).classList.add("show");

        // Change texts
        const textSlider = document.querySelector(".text-group");
        textSlider.style.transform = `translateY(${(index-1) * (-2.2)}rem)`;
    }

    return (
        <div className="home">
            <div className="slides">
                <div className="images-wrapper">
                    <img src={image1} className="image img-1 show" alt=""/>
                    <img src={image2} className="image img-2" alt=""/>
                    <img src={image3} className="image img-3" alt=""/>
                </div>

                <div className="text-slider">
                    <div className="text-wrap">
                        <div className="text-group">
                            <h2>Các lớp học từ mầm non tới THPT</h2>
                            <h2>Nội dung bám sát chương trình phổ thông</h2>
                            <h2>Trang bị toàn bộ 4 kỹ năng Nghe - Nói - Đọc - Viết</h2>
                        </div>
                    </div>

                    <div className="bullets">
                        <span data-value="1" className="active" onClick={moveSlider}></span>
                        <span onClick={moveSlider} data-value="2"></span>
                        <span onClick={moveSlider} data-value="3"></span>
                    </div>
                </div>
            </div>

            <div className="announcement">Thông báo</div>
            <div className="news">Tin tức</div>
        </div>
    )
}