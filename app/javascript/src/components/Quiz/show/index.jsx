import React, { useEffect } from "react";

import { Button } from "neetoui";

import quizzesApi from "apis/quizzes";
import ShowLoading from "components/Common/ShowLoading";
import { useQuizzes } from "contexts/quizzes";

import ListQuizzes from "./ListQuizzes";

const ShowQuiz = () => {
  const [quizzes, setQuizzes] = useQuizzes();
  const [loading, setLoading] = React.useState(true);

  useEffect(async () => {
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
  }, []);

  const handleNewQuiz = () => {
    window.location.href = "/quiz/create";
  };

  return loading ? (
    <ShowLoading />
  ) : (
    <div className="mx-10 space-y-2">
      <div className="flex flex-row justify-end">
        <Button
          className="flex"
          size="large"
          label="Add new quiz"
          onClick={handleNewQuiz}
        ></Button>
      </div>
      {Object.keys(quizzes).length === 0 ? (
        <div className="flex items-center justify-center pt-16">
          You have not created any quiz
        </div>
      ) : (
        <ListQuizzes quizzes={quizzes}></ListQuizzes>
      )}
    </div>
  );
};

export default ShowQuiz;
