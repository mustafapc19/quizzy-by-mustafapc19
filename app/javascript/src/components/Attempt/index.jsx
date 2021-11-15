import React, { useEffect, useState } from "react";

import { Typography } from "neetoui";
import PropTypes from "prop-types";
import { either, isEmpty, isNil } from "ramda";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import PrivateRoute from "components/Common/PrivateRoute";
import { AttemptProvider } from "contexts/attempt";
import { getFromLocalStorage } from "helpers/storage";

import { urlRoot } from "./constants";
import Registration from "./Registration";
import ShowAttempt from "./show";

import NavBar from "../NavBar";

const Attempt = ({ quiz, questions }) => {
  const [loading, setLoading] = useState(true);

  const isLoggedIn = () => {
    const authToken = getFromLocalStorage("authToken");
    return !either(isNil, isEmpty)(authToken) && authToken !== "null";
  };

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
              <PrivateRoute
                path={`${urlRoot(quiz)}/`}
                redirectRoute={`${urlRoot(quiz)}/register`}
                condition={!isLoggedIn()}
                component={ShowAttempt}
              />
            </Switch>
          </Router>
        ) : (
          <></>
        )
      ) : (
        <div className="flex flex-row justify-between">
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
