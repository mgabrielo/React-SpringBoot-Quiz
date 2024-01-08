import React, { useEffect, useState } from "react";
import { createQuestion, getSubjects } from "../../../utils/QuizService";
import { useNavigate } from "react-router-dom";

const AddQuestion = () => {
  const [questionData, setQuestionData] = useState({
    question: "",
    questionType: "single",
    choices: [""],
    correctAnswers: [""],
    subject: "",
  });
  const [newSubject, setNewSubject] = useState("");
  const [subjectOptions, setSubjectOptions] = useState([""]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const subjectData = await getSubjects();
      console.log(subjectData);
      setSubjectOptions(subjectData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddChoice = async (e) => {
    e.preventDefault();
    const lastChoice = questionData.choices[questionData.choices.length - 1];
    const lastChoiceLetter = lastChoice ? lastChoice.charAt(0) : "A";
    const newChoiceLetter = String.fromCharCode(lastChoiceLetter.charCodeAt(0));
    setQuestionData({ ...questionData, choices: `${newChoiceLetter}. ` });
  };

  const handleRemoveChoice = (e, index) => {
    e.preventDefault();
    setQuestionData({
      ...questionData,
      choices: questionData.choices.filter((_, idx) => idx != index),
    });
  };

  const handleChoiceChange = (index, value) => {
    setQuestionData({
      ...questionData,
      choices: questionData.choices.map((choice, idx) => {
        return idx === index ? value : choice;
      }),
    });
  };

  const handleCorrectAnswerChange = (index, value) => {
    setQuestionData({
      ...questionData,
      correctAnswers: questionData.correctAnswers.map((answer, idx) => {
        return idx === index ? value : answer;
      }),
    });
  };

  const handleAddCorrectAnswers = () => {
    setQuestionData({
      ...questionData,
      correctAnswers: questionData.correctAnswers,
    });
  };

  const removeCorrectAnswer = (index) => {
    setQuestionData({
      ...questionData,
      correctAnswers: questionData.correctAnswers.filter(
        (_, idx) => idx == index
      ),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setQuestionData({
        ...questionData,
        correctAnswers:
          questionData.correctAnswers.length > 0 &&
          questionData.correctAnswers.map((answer) => {
            const choiceLetter = answer.charAt(0).toUpperCase();
            const choiceIndex = choiceLetter.charCodeAt(0) - 65;
            return choiceIndex >= 0 && choiceIndex < questionData.choices.length
              ? choiceLetter
              : null;
          }),
      });
      await createQuestion(questionData);
      setQuestionData({});
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (newSubject.trim() !== "") {
      setQuestionData({
        ...questionData,
        subject: newSubject.trim(),
      });
      setSubjectOptions([...subjectOptions, newSubject.trim()]);
      //   setNewSubject("");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12 mt-5">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Add New Question</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="p-2">
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label-text-info">
                    Select A Subject
                  </label>
                  <select
                    id="subject"
                    value={questionData.subject}
                    onChange={(e) =>
                      setQuestionData({
                        ...questionData,
                        subject: e.target.value,
                      })
                    }
                    className="form-control"
                  >
                    <option value={""}>select a subject</option>
                    <option value={"New"}>Add New Subject</option>
                    {subjectOptions.length > 0 &&
                      subjectOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                  </select>
                </div>
                {questionData.subject === "New" && (
                  <div className="mb-3">
                    <label
                      htmlFor="new-subject"
                      className="form-label text-info"
                    >
                      Add A New Subject
                    </label>
                    <input
                      type="text"
                      id="new-subject"
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="form-control"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm mt-2"
                      onClick={handleAddSubject}
                    >
                      Add Subject
                    </button>
                  </div>
                )}
                <div className="mb-2">
                  <label className="form-label text-info" htmlFor="question">
                    Question
                  </label>
                  <textarea
                    className="form-control"
                    rows={5}
                    value={questionData.question}
                    onChange={(e) =>
                      setQuestionData({
                        ...questionData,
                        question: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label
                    className="form-label text-info"
                    htmlFor="question-type"
                  >
                    Question Type
                  </label>
                  <select
                    className="form-control"
                    id="question-type"
                    value={questionData.questionType}
                    onChange={(e) =>
                      setQuestionData({
                        ...questionData,
                        questionType: e.target.value,
                      })
                    }
                  >
                    <option value="single">Single Answer</option>
                    <option value="multiple">Multiple Answers</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label text-info" htmlFor="choices">
                    Choices
                  </label>
                  {questionData.choices &&
                    questionData.choices.length > 0 &&
                    questionData.choices.map((choice, index) => (
                      <div key={index} className="input-group mb-3">
                        <input
                          type="text"
                          value={choice}
                          onChange={(e) =>
                            handleChoiceChange(index, e.target.value)
                          }
                          className="form-control"
                        />
                        <button
                          type="button"
                          onClick={(e) => handleRemoveChoice(e, index)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    onClick={handleAddChoice}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Add Choice
                  </button>
                </div>
                {questionData.questionType === "single" ? (
                  <div>
                    <label
                      htmlFor="correct-answer"
                      className="form-label text-info"
                    >
                      Correct Answer
                    </label>
                    <input
                      type="text"
                      value={questionData.correctAnswers[0]}
                      onChange={(e) =>
                        handleCorrectAnswerChange(0, e.target.value)
                      }
                      className="form-control"
                    />
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="correct-answers"
                      className="form-label text-info"
                    >
                      Correct Answers
                    </label>
                    {questionData.correctAnswers.length > 1 &&
                      questionData.correctAnswers.map((answer, index) => (
                        <div key={index}>
                          <input
                            type="text"
                            value={answer}
                            onChange={(e) =>
                              handleCorrectAnswerChange(index, e.target.value)
                            }
                            className="form-control"
                          />
                          {index > 0 && (
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => removeCorrectAnswer(i)}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    <button
                      type="button"
                      className="btn btn-outline-info"
                      onClick={handleAddCorrectAnswers}
                    >
                      Add Correct Answer
                    </button>
                  </div>
                )}
                {!questionData.correctAnswers.length && (
                  <p>Please Choose At least 1 Correct Answer</p>
                )}
                <div className="btn-group">
                  <button
                    type="submit"
                    className="btn btn-outline-success mr-2"
                  >
                    Save Question
                  </button>
                  {/* <Link
                    type="submit"
                    className="btn btn-outline-success mr-2"
                    >
                       Cancel
                    </Link> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
