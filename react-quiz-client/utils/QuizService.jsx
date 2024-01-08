import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api/quizzes",
});

export const createQuestion = async (quizQuestion) => {
  try {
    return await api
      .post("/create-new-question", quizQuestion)
      .then((res) => {
        if (res.data !== null && res.data !== undefined) return res.data;
      })
      .catch((err) => {
        if (err) return err?.message;
      });
  } catch (error) {
    console.log(error);
  }
};

export const getAllQuestions = async () => {
  try {
    return await api
      .get("/all-questions")
      .then((res) => {
        if (res.data !== null && res.data !== undefined) return res.data;
      })
      .catch((err) => {
        if (err) return err?.message;
      });
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchQuizforUser = async (number, subject) => {
  try {
    return await api
      .get(`/questions-for-user?numOfQuestions=${number}&subject=${subject}`)
      .then((res) => {
        if (res.data !== null && res.data !== undefined) return res.data;
      })
      .catch((err) => {
        if (err) return err?.message;
      });
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getSubjects = async () => {
  try {
    return await api
      .get("/all-subjects")
      .then((res) => {
        if (res.data !== null && res.data !== undefined) return res.data;
      })
      .catch((err) => {
        if (err) return err?.message;
      });
  } catch (error) {
    console.log(error);
  }
};

export const updateQuestion = async (id, question) => {
  try {
    return await api
      .put(`/update-question/${id}`, question)
      .then((res) => {
        if (res.data !== null && res.data !== undefined) return res.data;
      })
      .catch((err) => {
        if (err) return err?.message;
      });
  } catch (error) {
    console.log(error);
  }
};

export const getQuestionById = async (id) => {
  try {
    return await api
      .get(`/question/${id}`)
      .then((res) => {
        if (res.data !== null && res.data !== undefined) return res.data;
      })
      .catch((err) => {
        if (err) return err?.message;
      });
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = async (id) => {
  try {
    return await api.delete(`/delete-question/${id}`);
  } catch (error) {
    console.log(error);
  }
};
