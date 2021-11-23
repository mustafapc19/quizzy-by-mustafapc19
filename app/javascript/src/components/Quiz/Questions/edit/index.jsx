import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import questionsApi from "apis/questions";
import quizzesApi from "apis/quizzes";
import NotFound from "components/Common/NotFound";
import ShowLoading from "components/Common/ShowLoading";

import QuestionForm from "../Form/QuestionForm";

const EditQuestion = () => {
  const { quizId, questionId } = useParams();

  const [quiz, setQuiz] = useState({});
  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchQuiz = async () => {
    const response = await quizzesApi.show(quizId);
    setQuiz(response.data);
  };

  const fetchQuestion = async () => {
    const response = await questionsApi.show({
      quiz_id: quizId,
      question_id: questionId,
    });
    setQuestion(response.data);
  };

  useEffect(async () => {
    try {
      await fetchQuiz();
      await fetchQuestion();

      setLoading(false);
    } catch (error) {
      logger.error(error.response);
      setIsError(true);
    }
  }, []);

  if (isError) {
    return <NotFound label="Question not found" />;
  }

  return loading ? (
    <ShowLoading />
  ) : (
    <QuestionForm quiz={quiz} question={question} />
  );
};

export default EditQuestion;
