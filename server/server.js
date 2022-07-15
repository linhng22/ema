const express = require("express");
const app = express();
const fs = require("fs");

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
// app.post('/questions', (req, res) => {
//     // write to questions.json
// })

app.listen(8000, () => console.log("listening on port 8000"))