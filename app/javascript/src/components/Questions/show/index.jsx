import React, { useEffect, useState } from "react";

import { Button, Typography } from "neetoui";
import { Link, useLocation } from "react-router-dom";

import questionsApi from "apis/questions";

const ShowQuestions = () => {
  const { quiz } = useLocation().state;
  const [questions, setQuestions] = useState({});

  useEffect(async () => {
    const response = await questionsApi.list({ quiz_id: quiz.id });
    logger.info(response);
    response.data.forEach(item => {
      questions[item.question.id] = { options: item.options, ...item.question };
    });

    setQuestions({ ...questions });
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between">
        <Typography
          className="flex"
          style="h2"
          weight="medium"
        >{`${quiz.name} quiz`}</Typography>
        <div className="space-x-2">
          <Button
            className="flex"
            label={
              <Link
                to={{
                  pathname: "create_question",
                  state: { quiz: quiz },
                }}
              >
                Add questions
              </Link>
            }
          />
          {Object.keys(questions).length !== 0 ? (
            <Button className="flex" label="Publish" />
          ) : (
            <></>
          )}
        </div>
      </div>
      {Object.keys(questions).length === 0 ? (
        <div className="flex flex-row justify-center">
          <Typography className="mt-20">
            There are no questions in this quiz.
          </Typography>
        </div>
      ) : (
        Object.keys(questions).map((key, index) => (
          <div key={index} className="pb-8 pt-2">
            <div className="flex flex-row space-x-16 pt-2">
              <Typography style="body2">{`Question ${index + 1}`}</Typography>
              <Typography style="h4">{questions[key].name}</Typography>
              <Button
                className="flex"
                style="secondary"
                label={
                  <Link
                    to={{
                      pathname: "edit_question",
                      state: { quiz: quiz, question: questions[key] },
                    }}
                  >
                    Edit
                  </Link>
                }
              />
              <Button style="danger" label="Delete"></Button>
            </div>
            <div className="flex flex-col  pt-2">
              {questions[key].options.map((option, index) => (
                <div key={index} className="flex flex-row space-x-20">
                  <Typography style="body2">{`Option ${index + 1}`}</Typography>
                  <Typography style="h5">{option.name}</Typography>
                  {option.correct ? (
                    <div className="text-green-400">Correct</div>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ShowQuestions;
