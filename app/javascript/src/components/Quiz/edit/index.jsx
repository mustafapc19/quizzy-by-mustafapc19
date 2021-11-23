import React, { useEffect, useState } from "react";

import { Typography } from "neetoui";
import { useParams } from "react-router-dom";

import quizzesApi from "apis/quizzes";
import NotFound from "components/Common/NotFound";
import ShowLoading from "components/Common/ShowLoading";

import QuizForm from "../Form";

const EditQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState({});
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchQuiz = async () => {
    try {
      const response = await quizzesApi.show(quizId);
      setQuiz(response.data);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setIsError(true);
    }
  };

  useEffect(fetchQuiz, []);

  if (isError) {
    return <NotFound label={"Quiz not found"} />;
  }

  return loading ? (
    <ShowLoading />
  ) : (
    <div className="space-y-8 mx-8 pt-4">
      <div className="flex flex-row justify-start">
        <Typography style="h2">Edit quiz</Typography>
      </div>
      <QuizForm quiz={quiz} />
    </div>
  );
};

export default EditQuiz;
