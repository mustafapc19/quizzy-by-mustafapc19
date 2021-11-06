import React from "react";

import { useLocation } from "react-router-dom";

import QuestionForm from "../Form/QuestionForm";

const CreateQuestion = () => {
  const { quiz } = useLocation().state;
  return <QuestionForm quiz={quiz}></QuestionForm>;
};

export default CreateQuestion;
