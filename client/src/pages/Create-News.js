import React, { useState, useRef } from "react";
import axios from "axios"
import { Editor } from '@tinymce/tinymce-react';
import Nav from '../components/Nav';
import "../css/create-news.css"
import confirmIcon from "../images/confirm.png"
var loaded = false;

export default function CreateTest() {
    const [newsData, setNewsData] = useState([]);
    const [news, setNews] = useState({
        id: 0,
        time: "",
        title: "",
        content: ""
    });
    const [title, setTitle] = useState("Bài đăng mới");
    const [warning, setWarning] = useState(null);
    const [confirmation, setConfirmation] = useState(false);
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            const time = new Date();
            setNews( 
                {
                    id : (newsData.length) ? newsData.length + 1 : 1,
                    time: "Ngày " + time.getDate() + " tháng " + (time.getMonth() + 1) + " năm " + time.getFullYear(),
                    title: title,
                    content: editorRef.current.getContent()
                }
            );
        }
    };
    console.log(news);
    // Get data from backend and shuffle the answer data once
    if (!loaded) {
        axios.get("/create-news").then(response => {
            setNewsData(response.data);
            loaded = true;
        });
    }


    function saveNews() {
        if (!document.getElementById("news-title").value || !editorRef.current.getContent()){
            alert("Vui lòng nhập đầy đủ Tiêu đề và Nội dung bài đăng");
        } else {
            setConfirmation(true);
            setNewsData(prevData => ([
                ...prevData,
                news
            ]));
        }
    }

    // Save new question data and answer data
    function handleSubmit(e) {
        e.preventDefault();

        axios.post("http://localhost:8000/create-news", newsData ).then((res) => {
            console.log(res);
            alert("Bài đăng đã được tạo thành công!");
            if (!alert("Bài đăng đã được tạo thành công!")){
                // window.location.replace("/");
            }
        })
        .catch(err => {
            console.log(err);
            alert("Có lỗi xảy ra trong quá trình tạo bài đăng. Vui lòng thực hiện lại sau.");
        })
    }

    return (
        <>
            <Nav />
            <div className="news-container" style={{opacity: confirmation ? "0.1" : "1"}}>
                <h2>Tạo bài đăng tin tức</h2>

                <div
                    className="news-form">
                        <label>Tiêu đề bài đăng </label>
                        <input 
                            type="text"
                            minLength={4}
                            className="news-title"
                            id="news-title"
                            placeholder="Điền tiêu đề"
                            required/>
                        <div className="editor-container">
                            <Editor
                                apiKey='wt17xioo934dxysnqq4zejgssvpa5gorse9t4ju3pgk5a1i3'
                                onInit={(evt, editor) => editorRef.current = editor}
                                onEditorChange={log}
                                init={{
                                    height: 500,
                                    toolbar_mode: 'wrap',   
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'editimage', 'charmap', 'preview',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                    ],
                                    toolbar: 'undo redo blocks | bold italic underline forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                        </div>
                        
                </div>
                
                <input 
                        type="button" 
                        value="Tạo bài đăng" 
                        className="submit btn"
                        onClick={saveNews}/>
            </div>

            <div 
                className="confirmation pop-up"
                id="confirmation"
                style={{display: confirmation ? "" : "none"}}>
                <img 
                    src={confirmIcon} 
                    alt="confirmation icon"
                    className="big-icon"/>
                <h3>Bạn chắc chắn muốn tạo bài đăng tin tức bây giờ?</h3>
                <button
                    className="cancel"
                    onClick={() => setConfirmation(false)}>
                        Kiểm tra lại
                </button>
                <button
                    className="create"
                    onClick={handleSubmit}>
                        Tạo ngay
                </button>
            </div>

        </>
        
    )
}