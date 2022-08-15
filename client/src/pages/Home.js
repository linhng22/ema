import React, {useEffect, useState} from "react";
import axios from "axios"
import Nav from '../components/Nav';
import Footer from "../components/Footer";
import NewsCard from "../components/NewsCard";
import "../css/home.css";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
var text1 = "Các lớp học dành cho mọi độ tuổi";
var text2 = "Nội dung bám sát chương trình phổ thông, nhu cầu người học";
var text3 = "Trang bị toàn bộ 4 kỹ năng Nghe - Nói - Đọc - Viết";
var loaded = false;

export default function Home() {
    const [newsData, setNewsData] = useState([]);
    const [image, setImage] = useState(image1);
    const [text, setText] = useState(text1);
    const [num, setNum] = useState(1);

    // Get data from backend and shuffle the answer data once
    if (!loaded) {
        axios.get("http://localhost:8000/").then(response => {
            // Save 5 most recent news to the newsData
            for (let i = response.data.length; i > response.data.length - 3; i--) {
                if (response.data[i - 1]){
                    setNewsData(prevData => ([
                        ...prevData,
                        response.data[i - 1]
                    ]));
                }
            }
        }).then(() => {
            loaded = true;
        });    
    }
       
    // Map all the news as cards
    const newsCards = newsData.map(card => {
        return (
            <NewsCard 
                key={card.id}
                id={card.id}
                time={card.time}
                title={card.title}
                content={card.content}
            />
        )
    });

    // Update the image and text when the set number changes
    useEffect(() => {
        // Change bullets
        const bullets = document.querySelectorAll(".bullets span");
        bullets.forEach(bull => bull.classList.remove("active"));
        document.getElementById(`bullet-${num}`).classList.add("active");
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
    
    setTimeout(() => {
        if (num < 3) {
            const newNum = num + 1;
            setNum(newNum);
        } else setNum(1);
    }, 5000);

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
                            <span id="bullet-1" className="active"></span>
                            <span id="bullet-2"></span>
                            <span id="bullet-3"></span>
                        </div>
                    </div>
                </div>

                <div className="news">
                    <div className="news-heading">
                        <h2 >Bảng tin</h2>
                        <div className="big-line"></div>
                    </div>
                    
                    <div className="news-container">{newsData.length > 0 ? newsCards : ""}</div>
                </div>
                
                <div className="contact">alo</div>
                
            </div>

            <Footer />
        </>
        
    )
}