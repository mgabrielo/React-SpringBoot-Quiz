import "bootstrap/dist/css/bootstrap.min.css";
import AddQuestion from "./components/question/AddQuestion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetAllQuiz from "./components/quiz/GetAllQuiz";
import UpdateQuestion from "./components/question/UpdateQuestion";
import "./App.css";

function App() {
  return (
    <main className="container">
      <Router>
        <Routes>
          <Route path="/" element={<GetAllQuiz />} />
          <Route path="/create-quiz" element={<AddQuestion />} />
          <Route path="/update-quiz/:id" element={<UpdateQuestion />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
