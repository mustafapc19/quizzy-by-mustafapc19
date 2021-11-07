import React, { useEffect } from "react";

import Logger from "js-logger";
import { Typography } from "neetoui";
import PropTypes from "prop-types";

import { initializeLogger } from "common/logger";

import NavBar from "../NavBar";

const Attempt = ({ quiz, questions }) => {
  useEffect(() => {
    initializeLogger();
    Logger.info(quiz, questions);
  }, []);

  return (
    <div>
      <NavBar userData={{}}></NavBar>
      {quiz ? (
        <div className="flex flex-row justify-between">
          <Typography
            className="flex"
            style="h2"
            weight="medium"
          >{`Welcome to ${quiz.name} quiz`}</Typography>
        </div>
      ) : (
        <div className="flex flex-row justify-between">
          <Typography className="flex" style="h2" weight="medium">
            This Quiz does not exist
          </Typography>
        </div>
      )}
    </div>
  );
};

Attempt.propTypes = {
  quiz: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
};

export default Attempt;
