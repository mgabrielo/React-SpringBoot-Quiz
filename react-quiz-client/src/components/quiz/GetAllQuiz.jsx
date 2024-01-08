import React, { useEffect, useState } from "react";
import { deleteQuestion, getAllQuestions } from "../../../utils/QuizService";
import { Link } from "react-router-dom";

const GetAllQuiz = () => {
  const [question, setQuestion] = useState([
    { id: "", question: "", correctAnswers: "", choices: "" },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [isQuestionDeleted, setIsQuestionDeleted] = useState(false);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteQuestion(id);
      setQuestion(
        question.filter((quest) => {
          return quest?.id !== id;
        })
      );
      setIsQuestionDeleted(true);
      setDeleteSuccessMessage("Question Deleted Succesfully");
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setDeleteSuccessMessage("");
    }, 3800);
  };

  const fetchAllQuestions = async () => {
    try {
      const data = await getAllQuestions();
      setQuestion(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <p>Loading....</p>;
  }
  return (
    <div className="container " style={{ width: "100%" }}>
      <div className="col-12 mt-5">
        <div style={{ color: "gray" }}>
          <h4>All Quiz Questions</h4>
        </div>
        <div className="col-md-4 d-flex justify-content-end">
          <div className="btn-group">
            <Link to={"/create-quiz"} className="btn btn-success">
              Add Quiz
            </Link>
          </div>
        </div>
        <hr />
        {isQuestionDeleted && deleteSuccessMessage !== "" && (
          <div className="alert alert-danger">{deleteSuccessMessage}</div>
        )}
        {question &&
          question.length > 0 &&
          question.map((quest, idx) => (
            <div key={idx}>
              <h4 style={{ color: "teal", fontWeight: "bold" }}>{`${idx + 1}. ${
                quest.question
              }`}</h4>
              <ul>
                {quest?.choices.length > 0 &&
                  quest?.choices.map((choice, index) => (
                    <li key={index}>{choice}</li>
                  ))}
              </ul>
              <p className="text-success">{quest.correctAnswers}</p>
              <div className="btn-group mb-4">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(quest.id)}
                >
                  Delete Question
                </button>
                <Link
                  to={`/update-quiz/${quest?.id}`}
                  className="btn btn-success"
                >
                  Update
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GetAllQuiz;
