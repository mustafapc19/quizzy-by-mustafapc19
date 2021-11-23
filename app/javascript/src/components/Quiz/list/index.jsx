import React, { useEffect } from "react";

import { Button } from "neetoui";

import ShowLoading from "components/Common/ShowLoading";
import { useQuizzes } from "contexts/quizzes";

import Table from "./Table";

import { fetchQuizzesList } from "../common";

const ListQuiz = () => {
  const [quizzes, setQuizzes] = useQuizzes();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => fetchQuizzesList(setQuizzes, setLoading), []);

  return loading ? (
    <ShowLoading />
  ) : (
    <div className="mx-10 space-y-2">
      <div className="flex flex-row justify-end">
        <Button
          className="flex"
          size="large"
          label="Add new quiz"
          to="/quiz/create"
        />
      </div>
      {Object.keys(quizzes).length === 0 ? (
        <div className="flex items-center justify-center pt-16">
          You have not created any quiz
        </div>
      ) : (
        <Table quizzes={quizzes} />
      )}
    </div>
  );
};

export default ListQuiz;
