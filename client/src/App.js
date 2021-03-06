import './App.css';
import Nav from './components/Nav';
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Quiz from "./pages/Quiz";
import Schedule from "./pages/Schedule";
import SignIn from "./pages/SignIn";
import DragDrop from './pages/quiz-sites/DragDrop';
import CreateTest from "./pages/Create-Test"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home />}/>
          <Route path="/gallery" exact element={<Gallery />}/>
          <Route path="/quiz" exact element={<Quiz />}/>
          <Route path="/schedule" exact element={<Schedule />}/>
          <Route path="/sign-in" exact element={<SignIn />}/>
          <Route path="/quiz/drag-drop" exact element={<DragDrop />}/>
          <Route path="/create-test" exact element={<CreateTest />}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
