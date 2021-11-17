import React, { useEffect, useState } from "react";

import { Typography } from "neetoui";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import NavBar from "components/NavBar";
import { AttemptProvider } from "contexts/attempt";
import { getFromLocalStorage } from "helpers/storage";

import { urlRoot } from "./constants";
import Registration from "./Registration";
import ShowAttempt from "./show";

const Attempt = ({ quiz, questions }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);

    logger.info(quiz, questions);
  }, []);

  return (
    <AttemptProvider
      quiz={quiz}
      questions={questions}
      attemptId={getFromLocalStorage("attemptId")}
    >
      <NavBar userData={{}}></NavBar>
      {quiz ? (
        !loading ? (
          <Router>
            <Switch>
              <Route
                path={`${urlRoot(quiz)}/register`}
                component={Registration}
              />
              <Route path={`${urlRoot(quiz)}/`} component={ShowAttempt} />
            </Switch>
          </Router>
        ) : (
          <></>
        )
      ) : (
        <div className="flex flex-row justify-center pt-64">
          <Typography className="flex" style="h2" weight="medium">
            This Quiz does not exist
          </Typography>
        </div>
      )}
    </AttemptProvider>
  );
};

Attempt.propTypes = {
  quiz: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
};

export default Attempt;
