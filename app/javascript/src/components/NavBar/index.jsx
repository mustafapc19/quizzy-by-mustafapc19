import React from "react";

import { Button } from "neetoui";
import { Header } from "neetoui/layouts";
import PropTypes from "prop-types";

const NavBar = ({ userData, isLoggedIn, handleLogout }) => {
  return (
    <Header
      actionBlock={
        <>
          {"firstName" in userData && "lastName" in userData ? (
            <div> {`${userData.firstName} ${userData.lastName}`} </div>
          ) : (
            <></>
          )}
          {isLoggedIn ? (
            <Button
              style="text"
              label="Logout"
              onClick={() => handleLogout()}
            />
          ) : (
            <></>
          )}
        </>
      }
      title="Quizzy"
    ></Header>
  );
};

NavBar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default NavBar;
