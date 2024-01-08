import React, { useEffect, useState } from "react";
import { getQuestionById, updateQuestion } from "../../../utils/QuizService";
import { useNavigate, useParams } from "react-router-dom";

const UpdateQuestion = () => {
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([""]);
  const [correctAnswers, setCorrectAnswers] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const fetchQuestion = async () => {
    try {
      const questionToUpdate = await getQuestionById(id);
      if (questionToUpdate) {
        setQuestion(questionToUpdate?.question);
        setChoices(questionToUpdate?.choices);
        setCorrectAnswers(questionToUpdate?.correctAnswers);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleChoiceChange = (index, e) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = e.target.value;
    setChoices(updatedChoices);
  };

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswers(e.target.value);
  };

  const handleQuestionUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedQuestion = {
        question,
        choices,
        correctAnswers: correctAnswers
          .toString()
          .split(",")
          .map((answer) => {
            return answer.trim();
          }),
      };
      await updateQuestion(id, updatedQuestion);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <p>LOading...</p>;
  }
  return (
    <section className="container">
      <h4 className="mt-5" style={{ color: "GrayText" }}>
        Update Question
      </h4>
      <div className="col-md-8">
        <form onSubmit={handleQuestionUpdate}>
          <div className="form-group">
            <label className="text-info">Question:</label>
            <textarea
              className="form-control"
              rows={5}
              value={question}
              onChange={handleQuestionChange}
            />
          </div>
          <div className="form-group">
            <label className="text-info">Choices:</label>
            {choices &&
              choices.length > 0 &&
              choices.map((choice, index) => (
                <input
                  key={index}
                  className="form-control mb-4"
                  type="text"
                  value={choice}
                  onChange={(e) => handleChoiceChange(index, e)}
                />
              ))}
          </div>
          <div className="form-group">
            <label className="text-info">Correct Answers:</label>
            <input
              className="form-control mb-4"
              type="text"
              value={correctAnswers}
              onChange={handleCorrectAnswerChange}
            />
          </div>
          <div className="btn-group">
            <button className="btn btn-sm btn-outline-warning" type="submit">
              Update Question
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateQuestion;
