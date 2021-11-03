import React from "react";

import PropTypes from "prop-types";

const QuizzesStateContext = React.createContext();
const QuizzesSetStateContext = React.createContext();

const QuizzesProvider = ({ children }) => {
  const [state, setState] = React.useState([]);
  return (
    <QuizzesStateContext.Provider value={state}>
      <QuizzesSetStateContext.Provider value={setState}>
        {children}
      </QuizzesSetStateContext.Provider>
    </QuizzesStateContext.Provider>
  );
};

const useQuizzes = () => {
  return [
    React.useContext(QuizzesStateContext),
    React.useContext(QuizzesSetStateContext),
  ];
};

QuizzesProvider.propTypes = {
  children: PropTypes.node,
};

export { QuizzesProvider, useQuizzes };
