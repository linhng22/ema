import './App.css';
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Policy from "./pages/Policy";
import News from "./pages/News";
import Quiz from "./pages/Quiz";
import Schedule from "./pages/Schedule";
import SignIn from "./pages/SignIn";
import DragDrop from './pages/quiz-sites/DragDrop';
import FillIn from './pages/quiz-sites/Fill_In';
import CreateTest from "./pages/Create-Test"
import CreateNews from "./pages/Create-News"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />}/>
          <Route path="/gallery" exact element={<Gallery />}/>
          <Route path="/policy" exact element={<Policy />}/>
          <Route path="/news/:newsId" exact element={<News />}/>
          <Route path="/news" exact element={<News />}/>
          <Route path="/quiz" exact element={<Quiz />}/>
          <Route path="/schedule" exact element={<Schedule />}/>
          <Route path="/sign-in" exact element={<SignIn />}/>
          <Route path="/quiz/drag-drop" exact element={<DragDrop />}/>
          <Route path="/quiz/fill-in" exact element={<FillIn />}/>
          <Route path="/create-test" exact element={<CreateTest />}/>
          <Route path="/create-news" exact element={<CreateNews />}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
