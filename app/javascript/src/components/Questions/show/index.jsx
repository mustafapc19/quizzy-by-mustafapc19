import React, { useEffect, useState } from "react";

import { Check } from "neetoicons";
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

  const handlePublish = async () => {
    const response = await quizzesApi.update(quiz.id, {
      quiz: {
        publish: true,
      },
    });
    logger.info(response.data);
    quiz.slug = response.data.slug;
    setQuiz({ ...quiz });
  };

  return (
    <div className="px-8">
      <div className="flex flex-row justify-between">
        <Typography
          className="flex pb-2 py-2 px-2"
          style="h2"
          weight="medium"
        >{`${quiz.name} quiz`}</Typography>
        <div className="space-x-2">
          <Button
            className="flex"
            size="large"
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
              size="large"
              label="Publish"
              onClick={handlePublish}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      {quiz.slug?.length > 0 ? (
        <div className="py-2 px-2">
          Published link:
          <a
            className="text-blue-700 pl-1"
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
        questions.map((question, index) => {
          const onDelete = () => {
            setOnFocusQuestion(question);
            setShowConfirmDeleteModal(true);
          };

          const questionLabel = `Question ${index + 1}`;
          return (
            <div key={index} className="pb-8 pt-2">
              <div className="flex flex-row space-x-16 pt-2 bg-gray-100 w-2/3 px-2 rounded-t-lg">
                <Typography className="flex" style="body2">
                  {questionLabel}
                </Typography>
                <Typography className="flex-grow" style="h4">
                  {question.name}
                </Typography>
                <div className="flex space-x-4">
                  <Button
                    className="mb-2"
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
                    className="flex mb-2"
                    label="Delete"
                    onClick={onDelete}
                  ></Button>
                </div>
              </div>
              <div className="flex flex-col w-2/3">
                {question.options.map((option, index) => {
                  const optionLabel = `Option ${index + 1}`;
                  const correctOptionColor = option.correct
                    ? "bg-green-100"
                    : "";
                  return (
                    <div
                      key={index}
                      className={`flex flex-row space-x-20 py-1 border-gray-100  border-b-2 ${correctOptionColor}`}
                    >
                      <Typography className="flex pl-2" style="body2">
                        {optionLabel}
                      </Typography>
                      <Typography className="flex flex-grow" style="h5">
                        <div className="flex flex-row">
                          <div className="flex flex-grow">{option.name}</div>
                          {option.correct ? (
                            <div className="flex pl-2">
                              <Check size={16} />
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Typography>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
      <ConfirmDelete
        quiz={quiz}
        question={onFocusQuestion}
        showConfirmDeleteModal={showConfirmDeleteModal}
        setQuestions={setQuestions}
        setShowConfirmDeleteModal={setShowConfirmDeleteModal}
      />
    </div>
  );
};

export default ShowQuestions;
