import React from "react";

import { Typography } from "neetoui";

import CreateQuizForm from "./CreateQuizForm";

const CreateQuiz = () => {
  return (
    <div className="space-y-8 mx-8 pt-4">
      <div className="flex flex-row justify-start">
        <Typography style="h2">Add new quiz</Typography>
      </div>
      <CreateQuizForm />
    </div>
  );
};

export default CreateQuiz;
