import quizzesApi from "apis/quizzes";

const fetchQuizzesList = async (setQuizzes, setLoading = () => true) => {
  try {
    const response = await quizzesApi.list();

    let quizzes = {};
    response.data.quizzes.forEach(quiz => {
      const date = new Date(quiz.created_at);
      quiz.time = date.getTime();
      quizzes[quiz.id] = quiz;
    });
    setQuizzes(quizzes);
    setLoading(false);
  } catch (error) {
    logger.error(error);
  }
};

export { fetchQuizzesList };
