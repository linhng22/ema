import React, {useEffect, useState} from "react";
import Nav from '../components/Nav';
import "../css/home.css";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
var text1 = "Các lớp học dành cho mọi độ tuổi";
var text2 = "Nội dung bám sát chương trình phổ thông, nhu cầu người học";
var text3 = "Trang bị toàn bộ 4 kỹ năng Nghe - Nói - Đọc - Viết";

export default function Home() {
    const [image, setImage] = useState(image1);
    const [text, setText] = useState(text1);
    const [num, setNum] = useState(1);

    // Update the image and text when the set number changes
    useEffect(() => {
        if (num === 1){
            setImage(image1);
            setText(text1)
        } else if (num === 2) {
            setImage(image2);
            setText(text2);
        } else {
            setImage(image3);
            setText(text3);
        }
    }, [num]);
        
    // Move slider when user clicks on a bullet
    function moveSlider(e) {
        // Change bullets
        const bullets = document.querySelectorAll(".bullets span");
        bullets.forEach(bull => bull.classList.remove("active"));
        e.target.classList.add("active");
        // Update the set number
        setNum(parseInt(e.target.id.slice(7)));
    }

    return (
        <>
            <Nav />
            <div className="home">
                <div className="slides">
                    <div className="images-wrapper">
                        <img src={image} className="home-image" alt="slider"/>
                    </div>

                    <div className="text-slider">
                        <div className="text-wrap">
                            <h3>{text}</h3>
                        </div>

                        <div className="bullets">
                            <span id="bullet-1" className="active" onClick={moveSlider}></span>
                            <span onClick={moveSlider} id="bullet-2"></span>
                            <span onClick={moveSlider} id="bullet-3"></span>
                        </div>
                    </div>
                </div>

                <div className="news">
                    
                </div>
                
                <div className="footer">
                    <p>&copy; {new Date().getFullYear()} EMA - English Ms An</p>
                    <a href="/policy" className="policy-link">Chính sách và điều khoản</a>
                </div>
            </div>
        </>
        
    )
}