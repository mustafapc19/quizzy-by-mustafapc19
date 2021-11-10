import React from "react";

import PropTypes from "prop-types";

const AttemptsStateContext = React.createContext();
const AttemptsSetStateContext = React.createContext();

const AttemptsProvider = ({ children, quiz, questions, attemptId }) => {
  const [state, setState] = React.useState({
    quiz: quiz,
    questions: questions,
    id: attemptId,
  });
  return (
    <AttemptsStateContext.Provider value={state}>
      <AttemptsSetStateContext.Provider value={setState}>
        {children}
      </AttemptsSetStateContext.Provider>
    </AttemptsStateContext.Provider>
  );
};

const useAttempts = () => {
  return [
    React.useContext(AttemptsStateContext),
    React.useContext(AttemptsSetStateContext),
  ];
};

AttemptsProvider.propTypes = {
  children: PropTypes.node,
};

export { AttemptsProvider, useAttempts };
