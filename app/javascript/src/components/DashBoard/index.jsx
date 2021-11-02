import React from "react";

import { Button } from "neetoui";

const DashBoard = () => {
  const quizzes = [];
  return (
    <div className="space-y-2">
      <div className="flex flex-row justify-end">
        <Button className="flex" label="Add new quiz"></Button>
      </div>
      {quizzes.length === 0 ? (
        <div className="flex items-center justify-center pt-16">
          You have not created any quiz
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DashBoard;
