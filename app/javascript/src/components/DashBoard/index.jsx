import React, { useEffect } from "react";

import { Button } from "neetoui";

import quizzesApi from "apis/quizzes";
import { useQuizzes } from "contexts/quizzes";

import ShowQuizzes from "./ShowQuizzes";

const DashBoard = () => {
  const [quizzes, setQuizzes] = useQuizzes();

  useEffect(async () => {
    try {
      const res = await quizzesApi.list();
      setQuizzes(res.data.quizzes);
    } catch (error) {
      logger.error(error);
    }
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex flex-row justify-end">
        <Button
          className="flex"
          label="Add new quiz"
          onClick={() => (window.location.href = "/create_quiz")}
        ></Button>
      </div>
      {quizzes.length === 0 ? (
        <div className="flex items-center justify-center pt-16">
          You have not created any quiz
        </div>
      ) : (
        <ShowQuizzes quizzes={quizzes}></ShowQuizzes>
      )}
    </div>
  );
};

export default DashBoard;
