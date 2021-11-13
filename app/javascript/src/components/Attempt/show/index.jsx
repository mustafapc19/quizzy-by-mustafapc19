import React, { useEffect, useState } from "react";

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
  const [attempts] = useAttempts();

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
    <div className="flex flex-col justify-between mx-8">
      <Typography
        className="flex py-4 text-gray-600"
        style="h2"
        weight="medium"
      >
        {attempts.quiz.name}
      </Typography>
      {!loading ? (
        <div className="flex flex-col">
          {submitted ? <Typography>{showResultText}</Typography> : <></>}
          <form onSubmit={handleAttempSubmit}>
            {attempts.questions.map((question, index) => (
              <div className="flex flex-row space-x-8 pt-4" key={index}>
                <Typography
                  className="flex text-gray-600"
                  style="body2"
                  weight="medium"
                >
                  {`Question ${index + 1}`}
                </Typography>
                <div className="flex flex-col">
                  <Typography className="flex pb-2" style="body2" weight="bold">
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

                    return (
                      <div className="flex flex-row space-x-2 pt-1" key={index}>
                        <input
                          type="radio"
                          className="flex"
                          checked={
                            answers[question.id].options[option.id].selected
                          }
                          onClick={optionOnClick}
                        />
                        <label>{option.name}</label>
                        {answers[question.id].options[option.id].correct ? (
                          <div className="flex text-green-500">Correct</div>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            {!submitted ? (
              <Button
                className="flex mt-8 ml-24"
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
