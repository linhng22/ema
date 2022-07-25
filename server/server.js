const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors")

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("hello world")
    // read questions.json
    
})

app.get('/quiz/drag-drop', (req, res) => {
    let rawQuesData = fs.readFileSync('questions.json');
    let questions = JSON.parse(rawQuesData);
    let rawAnswerData = fs.readFileSync('answers.json');
    let answers = JSON.parse(rawAnswerData);
    res.send({
        questionData: questions, 
        answerData: answers});
})

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

app.listen(8000, () => console.log("listening on port 8000"))