import React, { useEffect, useState } from "react";

import { Check } from "neetoicons";
import { Button, Toastr, Typography } from "neetoui";
import { Link, useParams } from "react-router-dom";

import questionsApi from "apis/questions";
import quizzesApi from "apis/quizzes";
import handleError from "common/error";
import NotFound from "components/Common/NotFound";
import ShowLoading from "components/Common/ShowLoading";

import ConfirmDelete from "../ConfirmDelete";

const ShowQuiz = () => {
  const { quizId } = useParams();

  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [onDeleteQuestion, setOnDeleteQuestion] = useState({});
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchQuiz = async () => {
    const response = await quizzesApi.show(quizId);
    setQuiz(response.data);
  };

  const fetchQuestions = async () => {
    const response = await questionsApi.list({ quiz_id: quizId });
    logger.info(response);

    setQuestions(response.data.questions);
  };

  const handleDelete = async () => {
    try {
      await questionsApi.destroy({
        question_id: onDeleteQuestion.id,
        quiz_id: quiz.id,
      });

      await fetchQuestions();
      setShowConfirmDeleteModal(false);
      Toastr.success("Question deleted successfuly");
    } catch (error) {
      handleError(error);
    }
  };

  const onDelete = question => {
    setOnDeleteQuestion(question);
    setShowConfirmDeleteModal(true);
  };

  const questionLabel = index => `Question ${index + 1}`;
  const optionLabel = index => `Option ${index + 1}`;
  const correctOptionColor = option => (option.correct ? "bg-green-100" : "");
  const slugToUrl = `${window.location.origin}/public/${quiz.slug}`;

  useEffect(async () => {
    try {
      await fetchQuiz();
      await fetchQuestions();

      setLoading(false);
    } catch (error) {
      logger.error(error);
      setIsError(true);
    }
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

  if (isError) {
    return <NotFound label="Question not found" />;
  }

  return loading ? (
    <ShowLoading />
  ) : (
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
                  pathname: `/quiz/${quiz.id}/question/create`,
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
          <a className="text-blue-700 pl-1" href={slugToUrl}>
            {slugToUrl}
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
          return (
            <div key={index} className="pb-8 pt-2">
              <div className="flex flex-row space-x-16 pt-2 bg-gray-100 w-2/3 px-2 rounded-t-lg">
                <Typography className="flex" style="body2">
                  {questionLabel(index)}
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
                          pathname: `/quiz/${quiz.id}/question/${question.id}/edit`,
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
                    onClick={() => onDelete(question)}
                  />
                </div>
              </div>
              <div className="flex flex-col w-2/3">
                {question.options.map((option, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex flex-row space-x-20 py-1 border-gray-100  border-b-2 ${correctOptionColor(
                        option
                      )}`}
                    >
                      <Typography className="flex pl-2" style="body2">
                        {optionLabel(index)}
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
        handleDelete={handleDelete}
        showConfirmDeleteModal={showConfirmDeleteModal}
        setShowConfirmDeleteModal={setShowConfirmDeleteModal}
      />
    </div>
  );
};

export default ShowQuiz;
