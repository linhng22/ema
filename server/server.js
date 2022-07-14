const express = require("express");
const app = express();
const fs = require("fs");

app.get('/', (req, res) => {
    res.send("hello world")
    // read questions.json
    
})

app.get('/quiz/drag-drop', (req, res) => {
    let rawData = fs.readFileSync('questions.json');
    let questions = JSON.parse(rawData)
    console.log(questions)
    res.send(questions)
})
// app.post('/questions', (req, res) => {
//     // write to questions.json
// })

app.listen(8000, () => console.log("listening on port 8000"))