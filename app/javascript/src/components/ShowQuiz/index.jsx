import React from "react";

import { Button, Typography } from "neetoui";
import { useLocation } from "react-router-dom";

const ShowQuiz = () => {
  const { quiz } = useLocation().state;
  const questions = [];

  return (
    <>
      <div className="flex flex-row justify-between">
        <Typography
          className="flex"
          style="h2"
          weight="medium"
        >{`${quiz.name} quiz`}</Typography>
        <Button className="flex" label="Add questions" />
      </div>
      {questions.length === 0 ? (
        <div className="flex flex-row justify-center">
          <Typography className="mt-20">
            There are no questions in this quiz.
          </Typography>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ShowQuiz;
