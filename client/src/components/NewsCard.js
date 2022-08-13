import React from "react";
import DOMPurify from "dompurify"

export default function News(props){
    const content = props.content.split('\n');
    const firstSentence = content[0];

    return(
        <div className="news-card">
            <div><a href={`/news/${props.id}`} className="link">{props.title}</a></div>
            <p className="news-time">{props.time}</p>
            <div className="news-content" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(firstSentence)}}></div>
            <hr/>
        </div>
    )
}