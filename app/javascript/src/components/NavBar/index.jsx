import React from "react";

import { Button, Typography } from "neetoui";
import { Header } from "neetoui/layouts";
import PropTypes from "prop-types";

const NavBar = ({ userData, isLoggedIn, handleLogout }) => {
  return (
    <div className="mx-2">
      <Header
        className="border-b-2"
        actionBlock={
          <>
            {"firstName" in userData && "lastName" in userData ? (
              <div> {`${userData.firstName} ${userData.lastName}`} </div>
            ) : (
              <></>
            )}
            {isLoggedIn ? (
              <Button style="text" label="Logout" onClick={handleLogout} />
            ) : (
              <></>
            )}
          </>
        }
        title={
          <Typography className="pl-8" style="h1">
            Quizzy
          </Typography>
        }
      ></Header>
    </div>
  );
};

NavBar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default NavBar;
