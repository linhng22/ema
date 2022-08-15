import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import Nav from '../components/Nav';
import Footer from "../components/Footer";
import "../css/news.css";
var loaded = false;

export default function News() {
    const [allNews, setAllNews] = useState([]);
    const [otherNews, setOtherNews] = useState([]);
    const [newsWithId, setNewsWithId] = useState({
        id: 0,
        time: "",
        title: "",
        content: ""
    });
    let params = useParams();
    const newsId = params.newsId; // get the news ID
    if (!loaded){
        // Get the news
        axios.get("http://localhost:8000/").then(response => {
            for (let i = 0; i < response.data.length; i++) {
                if ( response.data[i]){

                    if (i !== newsId - 1 ){
                        if (i < 11) {
                            setOtherNews(prevData => ([
                                ...prevData,
                                response.data[i]
                            ]));
                        }
                    } else setNewsWithId(response.data[i]);
                } 
            }
        }).then(()=>loaded = true);
    }
    const otherNewsCards = otherNews.map(news => {
        return (
            <div className="news-card other" key={news.id}>
                <div style={{textAlign: "left"}}>
                    <a 
                        href={`/news/${news.id}`} 
                        className="other-news link">
                        {news.title}</a>
                </div>
                <p className="other-news news-card-time">
                    <small>{news.time}</small></p>
                <hr/>
            </div>
        )
    })
    
    return (
        <>
            <Nav />
            
            <div style={{display: newsId ? "" : "none"}}>
                <div className="news-with-id-container">
                    <div className="other-news-container">
                        <h3 style={{textAlign: "left", fontSize:"23px"}}>Bài đăng tương tự</h3>
                        {otherNewsCards}
                    </div>
                    <div className="news-box">
                        <h2 className="news-box-title">{newsWithId.title}</h2>
                        <p className="news-box-time">Cập nhật: {newsWithId.time}</p>
                        <div 
                            className="news-box-content" 
                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(newsWithId.content)}}></div>
                    </div>
                    
                </div>
            </div>
            
            <div style={{display: !newsId ? "" : "none"}}>hello</div>

            <Footer />
        </>
        
    )
}