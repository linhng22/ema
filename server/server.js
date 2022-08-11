const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors")

app.use(cors());
app.use(express.json());

// Send news data to the home page
app.get('/', (req, res) => {
    // send the news data to the client side
    let rawNewsData = fs.readFileSync('news.json');
    let news = JSON.parse(rawNewsData);
    res.send(news);
})

// Send question data and answer data to the drag-drop page
app.get('/quiz/drag-drop', (req, res) => {
    let rawQuesData = fs.readFileSync('questions.json');
    let questions = JSON.parse(rawQuesData);
    let rawAnswerData = fs.readFileSync('answers.json');
    let answers = JSON.parse(rawAnswerData);
    res.send({
        questionData: questions, 
        answerData: answers});
});

// Send news data to the create-news page
app.get('/create-news', (req, res) => {
    let rawNewsData = fs.readFileSync('news.json');
    let news = JSON.parse(rawNewsData);
    res.send(news);
})

// Receive new question data and answer data from the create-test page
app.post('/create-test', (req, res) => {
    // write to questions.json
    let questionData = JSON.stringify(req.body[0], null, 2);
    fs.writeFileSync('questions.json', questionData,
        (err) => {console.log(err)});

    //write to answers.json
    let answerData = JSON.stringify(req.body[1], null, 2);
    fs.writeFileSync('answers.json', answerData,
        (err) => {console.log(err)});

    res.send("data is sent successfully")
})

app.post('/create-news', (req, res) => {
    console.log(req.body);
    let newsData = JSON.stringify(req.body, null, 2);
    fs.writeFileSync('news.json', newsData, 
        (err) => {console.log(err)});
    res.send("data is sent successfully");
})

app.listen(8000, () => console.log("listening on port 8000"))