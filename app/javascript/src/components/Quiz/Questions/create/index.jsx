import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import quizzesApi from "apis/quizzes";
import NotFound from "components/Common/NotFound";
import ShowLoading from "components/Common/ShowLoading";

import QuestionForm from "../Form/QuestionForm";

const CreateQuestion = () => {
  const { quizId } = useParams();
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [quiz, setQuiz] = useState({});

  const fetchQuiz = async () => {
    const response = await quizzesApi.show(quizId);
    setQuiz(response.data);
  };

  useEffect(async () => {
    try {
      await fetchQuiz();
      setLoading(false);
    } catch (error) {
      logger.error(error.response);
      setIsError(true);
    }
  }, []);

  if (isError) {
    return <NotFound label="Question not found" />;
  }

  return loading ? <ShowLoading /> : <QuestionForm quiz={quiz} />;
};

export default CreateQuestion;
