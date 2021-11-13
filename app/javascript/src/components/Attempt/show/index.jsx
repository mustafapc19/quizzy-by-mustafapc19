import React, { useEffect, useState } from "react";

import { Check, Close } from "neetoicons";
import { Button, Typography } from "neetoui";

import attemptsApi from "apis/attempts";
import handleError from "common/error";
import { useAttempts } from "contexts/attempts";

const createInitialAnswers = questions => {
  const answers = {};
  questions.forEach(question => {
    const options = {};

    question.options.forEach(option => {
      options[option.id] = { selected: false };
    });
    answers[question.id] = { options };
  });
  return answers;
};

const ShowAttempt = () => {
  const [attempts, setAttempts] = useAttempts();

  const [answers, setAnswers] = useState(
    createInitialAnswers(attempts.questions)
  );
  const [correctCount, setCorrectCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  const setSubmittedOptions = result => {
    let correctCount = 0;
    result.forEach(question => {
      answers[question.id].correct = question.correct;
      if (question.correct) {
        correctCount++;
      }

      question.options.forEach(option => {
        answers[question.id].options[option.id].correct = option.correct;
      });
    });

    setCorrectCount(correctCount);
    setAnswers(answers);
    setSubmitted(true);
  };

  const fetchAttempt = async () => {
    try {
      const response = await attemptsApi.show(attempts.id);
      if (response.data.attempt.submitted) {
        setSubmittedOptions(response.data.results);
      }

      response.data.attempt_answers.forEach(attempt_answer => {
        if (attempt_answer.option_id) {
          answers[attempt_answer.question_id].options[
            attempt_answer.option_id
          ].selected = true;
        }
      });

      if (submitted) {
        attempts.questions = attempts.questions.filter(
          question =>
            response.data.attempt_answers.findIndex(
              attempt_answer => attempt_answer.question_id === question.id
            ) !== -1
        );
        setAttempts({ ...attempts });
      }

      setAnswers({ ...answers });
      logger.info(response);
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  useEffect(fetchAttempt, []);

  const showResultText = `Thank you for taking the quiz, here are your results. You
          have submitted ${correctCount} correct and
          ${Object.keys(answers).length - correctCount} incorrect answers.`;

  const handleAttempSubmit = async e => {
    e.preventDefault();

    try {
      const response = await attemptsApi.update({
        id: 0,
        payload: {
          attempt_attributes: {
            quiz_id: attempts.quiz.id,
            attempt_answers_attributes: attempts.questions.map(question => {
              let selected_option;

              Object.keys(answers[question.id].options).forEach(optionKey => {
                if (answers[question.id].options[optionKey].selected) {
                  selected_option = optionKey;
                }
              });

              return {
                question_id: question.id,
                option_id: selected_option,
              };
            }),
          },
        },
      });

      setSubmittedOptions(response.data.results);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="flex flex-col justify-between mx-20 mt-4">
      <Typography
        className="flex py-4 text-gray-600"
        style="h2"
        weight="medium"
      >
        {attempts.quiz.name}
      </Typography>
      {!loading ? (
        <div className="flex flex-col">
          {submitted ? (
            <div className="flex flex-row">
              <Typography className="bg-gray-100 p-2 rounded-md">
                {showResultText}
              </Typography>
            </div>
          ) : (
            <></>
          )}
          <form onSubmit={handleAttempSubmit}>
            {attempts.questions.map((question, index) => (
              <div
                className="flex flex-row space-x-8 pt-8 pl-2 pb-4"
                key={index}
              >
                <Typography
                  className="flex text-gray-600"
                  style="body2"
                  weight="medium"
                >
                  {`Question ${index + 1}`}
                </Typography>
                <div className="flex flex-col w-2/3">
                  <Typography
                    className="flex p-2 bg-gray-100 rounded-t-lg"
                    style="body2"
                    weight="bold"
                  >
                    {question.name}
                  </Typography>
                  {question.options.map((option, index) => {
                    const optionOnClick = () => {
                      if (!submitted) {
                        Object.keys(answers[question.id].options).forEach(
                          key =>
                            (answers[question.id].options[key].selected = false)
                        );
                        answers[question.id].options[option.id].selected =
                          !answers[question.id].options[option.id].selected;
                        setAnswers({ ...answers });
                      }
                    };

                    const correctAnswerColor = answers[question.id].options[
                      option.id
                    ].correct
                      ? "bg-green-100"
                      : "";

                    const wrongAnswerCondtion =
                      submitted &&
                      answers[question.id].options[option.id].selected &&
                      !answers[question.id].options[option.id].correct;

                    const wrongAnswerColor = wrongAnswerCondtion
                      ? "bg-red-100"
                      : "";

                    return (
                      <div
                        className={`flex flex-row space-x-2 p-2 border-gray-100 border-l-2 border-r-2 border-b-2 ${correctAnswerColor} ${wrongAnswerColor}`}
                        key={index}
                      >
                        <input
                          type="radio"
                          className="flex"
                          checked={
                            answers[question.id].options[option.id].selected
                          }
                          onClick={optionOnClick}
                        />
                        <label className="flex flex-grow">{option.name}</label>
                        {answers[question.id].options[option.id].correct ? (
                          <Check size={16} />
                        ) : (
                          <></>
                        )}
                        {wrongAnswerCondtion ? <Close size={16} /> : <></>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            {!submitted ? (
              <Button
                className="flex mt-8 ml-32"
                size="large"
                type="submit"
                label="Submit"
              />
            ) : (
              <></>
            )}
          </form>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ShowAttempt;
