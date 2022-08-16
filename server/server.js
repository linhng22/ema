const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");

app.use(session({
    name: "ema",
    secret: "ema-English Ms An",
    resave: false,
    saveUninitialized: true
}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());

app.get("/starting", (req, res) => {
    if (req.session.isAdmin){
        res.send({isAdmin: true});
    } else {
        res.send({isAdmin: false});
    }
})

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
    if (req.session.isAdmin){
        let rawNewsData = fs.readFileSync('news.json');
        let news = JSON.parse(rawNewsData);
        res.send(news);
    } else{
        res.redirect("/sign-in");
    }
})

app.get('/sign-out', (req, res) => {
    if (req.session.isAdmin) {
        req.session.destroy(function (error) {
            if (error) {
                res.status(400).send("Unable to log out");
            } else {
                res.send({
                    signOut: true
                });
            }
        });
    }
})

// Receive new question data and answer data from the create-test page
app.post('/create-test', (req, res) => {
    if (req.session.isAdmin){
        // write to questions.json
        let questionData = JSON.stringify(req.body[0], null, 2);
        fs.writeFileSync('questions.json', questionData,
            (err) => {console.log(err)});

        //write to answers.json
        let answerData = JSON.stringify(req.body[1], null, 2);
        fs.writeFileSync('answers.json', answerData,
            (err) => {console.log(err)});

        res.send("data is sent successfully");
    } else {
        res.redirect("/sign-in")
    }
    
})

app.post('/create-news', (req, res) => {
    let newsData = JSON.stringify(req.body, null, 2);
    fs.writeFileSync('news.json', newsData, 
        (err) => {console.log(err)});
    res.send("data is sent successfully");
})

app.post('/sign-in', (req, res) => {
    let userName = req.body[0];
    let password = req.body[1];
    if (userName.toLowerCase() === process.env.EMA_USER_NAME.toLowerCase() 
        && password.toLowerCase() === process.env.EMA_PASSWORD.toLowerCase()) {
            console.log("user name and password are matched");
            req.session.isAdmin = true;
            req.session.save(function (err) {
                //session saved
            });
            
            res.send({
                success: true,
                isAdmin: true
            });
    } else {
        console.log("wrong user name and password");
        res.send({
            success: false,
            isAdmin: false
        });
    }
})


app.listen(8000, () => console.log("listening on port 8000"))