import React from "react";

import { useLocation } from "react-router-dom";

import QuestionForm from "../Form/QuestionForm";

const EditQuestion = () => {
  const { quiz, question } = useLocation().state;
  return <QuestionForm quiz={quiz} question={question} />;
};

export default EditQuestion;
