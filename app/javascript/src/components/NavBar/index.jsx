import React from "react";

import { Button, Typography } from "neetoui";
import { Header } from "neetoui/layouts";
import PropTypes from "prop-types";

import { urlRoot } from "components/Attempt/constants";

const NavBar = ({ userData, isLoggedIn, handleLogout }) => {
  const handleReports = () => {
    window.location.href = "/report";
  };

  const adminMode = userData.role === "administrator";

  const navigateHome = () => {
    if (adminMode) {
      window.location.href = "/";
    } else {
      window.location.href = `${urlRoot(userData.quiz)}/register`;
    }
  };

  return (
    <div className="mx-2">
      <Header
        className="border-b-2"
        actionBlock={
          adminMode ? (
            <div className="flex flex-row pr-8">
              <Button
                className="flex mr-2"
                style="text"
                label="Reports"
                size="large"
                onClick={handleReports}
              />
              {"firstName" in userData && "lastName" in userData ? (
                <Typography className="flex py-1 pr-2">
                  {`${userData.firstName} ${userData.lastName}`}
                </Typography>
              ) : (
                <></>
              )}
              {isLoggedIn ? (
                <Button
                  className="flex"
                  style="text"
                  label="Logout"
                  onClick={handleLogout}
                />
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )
        }
        title={
          <Typography
            className="ml-8 cursor-pointer"
            style="h1"
            onClick={navigateHome}
          >
            Quizzy
          </Typography>
        }
      />
    </div>
  );
};

NavBar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default NavBar;
