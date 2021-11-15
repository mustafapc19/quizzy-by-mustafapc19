import React from "react";

import PropTypes from "prop-types";

const AttemptStateContext = React.createContext();
const AttemptSetStateContext = React.createContext();

const AttemptProvider = ({ children, quiz, questions, attemptId }) => {
  const [state, setState] = React.useState({
    quiz: quiz,
    questions: questions,
    id: attemptId,
  });
  return (
    <AttemptStateContext.Provider value={state}>
      <AttemptSetStateContext.Provider value={setState}>
        {children}
      </AttemptSetStateContext.Provider>
    </AttemptStateContext.Provider>
  );
};

const useAttempt = () => {
  return [
    React.useContext(AttemptStateContext),
    React.useContext(AttemptSetStateContext),
  ];
};

AttemptProvider.propTypes = {
  children: PropTypes.node,
};

export { AttemptProvider, useAttempt };
