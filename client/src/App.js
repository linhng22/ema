import './App.css';
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Quiz from "./pages/Quiz";
import Schedule from "./pages/Schedule";
import SignIn from "./pages/SignIn";
import DragDrop from './pages/quiz-sites/DragDrop';
import MultipleChoice from './pages/quiz-sites/MulChoice';
import CreateTest from "./pages/Create-Test"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />}/>
          <Route path="/gallery" exact element={<Gallery />}/>
          <Route path="/quiz" exact element={<Quiz />}/>
          <Route path="/schedule" exact element={<Schedule />}/>
          <Route path="/sign-in" exact element={<SignIn />}/>
          <Route path="/quiz/drag-drop" exact element={<DragDrop />}/>
          <Route path="/quiz/multiple-choice" exact element={<MultipleChoice />}/>
          <Route path="/create-test" exact element={<CreateTest />}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
