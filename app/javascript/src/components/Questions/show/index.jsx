import React, { useEffect, useState } from "react";

import { Button, Typography } from "neetoui";
import { Link, useLocation } from "react-router-dom";

import questionsApi from "apis/questions";
import quizzesApi from "apis/quizzes";

import ConfirmDelete from "./ConfirmDelete";

const ShowQuestions = () => {
  const [quiz, setQuiz] = useState(useLocation().state.quiz);
  const [questions, setQuestions] = useState([]);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [onFocusQuestion, setOnFocusQuestion] = useState({});

  useEffect(async () => {
    const response = await questionsApi.list({ quiz_id: quiz.id });
    logger.info(response);
    response.data.questions.forEach(item => {
      const date = new Date(item.question.created_at);
      const time = date.getTime();
      questions.push({
        id: item.question.id,
        options: item.options,
        time,
        ...item.question,
      });
    });

    questions.sort((a, b) => b.time - a.time);
    setQuestions([...questions]);
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
                  pathname: "/quiz/question/create",
                  state: { quiz: quiz },
                }}
              >
                Add questions
              </Link>
            }
          />
          {questions.length !== 0 && !(quiz.slug?.length > 0) ? (
            <Button
              className="flex"
              label="Publish"
              onClick={async () => {
                const response = await quizzesApi.update(quiz.id, {
                  quiz: {
                    publish: true,
                  },
                });
                logger.info(response.data);
                quiz.slug = response.data.slug;
                setQuiz({ ...quiz });
              }}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      {quiz.slug?.length > 0 ? (
        <div>
          Published your public link is{" "}
          <a
            className="text-blue-700"
            href={`${window.location.origin}/public/${quiz.slug}`}
          >
            {`${window.location.origin}/public/${quiz.slug}`}
          </a>
        </div>
      ) : (
        <></>
      )}
      {questions.length === 0 ? (
        <div className="flex flex-row justify-center">
          <Typography className="mt-20">
            There are no questions in this quiz.
          </Typography>
        </div>
      ) : (
        questions.map((question, index) => (
          <div key={index} className="pb-8 pt-2">
            <div className="flex flex-row space-x-16 pt-2">
              <Typography style="body2">{`Question ${index + 1}`}</Typography>
              <Typography style="h4">{question.name}</Typography>
              <Button
                className="flex"
                style="secondary"
                label={
                  <Link
                    to={{
                      pathname: "/quiz/question/edit",
                      state: { quiz: quiz, question: question },
                    }}
                  >
                    Edit
                  </Link>
                }
              />
              <Button
                style="danger"
                label="Delete"
                onClick={() => {
                  setOnFocusQuestion(question);
                  setShowConfirmDeleteModal(true);
                }}
              ></Button>
            </div>
            <div className="flex flex-col  pt-2">
              {question.options.map((option, index) => (
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
      <ConfirmDelete
        quiz={quiz}
        question={onFocusQuestion}
        showConfirmDeleteModal={showConfirmDeleteModal}
        setQuestions={setQuestions}
        setShowConfirmDeleteModal={setShowConfirmDeleteModal}
      />
    </>
  );
};

export default ShowQuestions;
