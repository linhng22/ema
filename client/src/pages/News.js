import React, { useState } from "react";
import axios from "axios"
import { useParams } from "react-router-dom"
import DOMPurify from "dompurify"
import Nav from '../components/Nav';
var loaded = false;

export default function News() {
    const [news, setNews] = useState({
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
            setNews(response.data[newsId - 1]);
        });
    }
    
    return (
        <>
            <Nav />
            <div >
               <h2>{news.title}</h2>
               <p>{news.time}</p>
               <div className="news-content" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(news.content)}}></div>
            </div>
        </>
        
    )
}