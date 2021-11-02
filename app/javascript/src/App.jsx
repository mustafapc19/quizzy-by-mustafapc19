import React, { useEffect, useState } from "react";

import { Toastr } from "neetoui";
import { either, isEmpty, isNil } from "ramda";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import Login from "components/Authentication/Login";
import PrivateRoute from "components/Common/PrivateRoute";
import Dashboard from "components/DashBoard";
import NavBar from "components/NavBar";
import {
  clearAuthFromLocalStorage,
  getFromLocalStorage,
  getUserDataFromLocalStorage,
} from "helpers/storage";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const initialIsLoggedIn =
    !either(isNil, isEmpty)(authToken) && authToken !== "null";

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading, setUserData);
    if (isLoggedIn) {
      setUserData(getUserDataFromLocalStorage());
    }
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const handleLogout = async () => {
    try {
      await authApi.logout();
      clearAuthFromLocalStorage();
      window.location.href = "/";
      setIsLoggedIn(false);
    } catch (error) {
      Toastr.error(Error("Some error occured!"));
      logger.error(error);
    }
  };

  return (
    <div className="mx-4">
      <NavBar
        userData={userData}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      ></NavBar>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute
            path="/"
            redirectRoute="/login"
            condition={isLoggedIn}
            component={Dashboard}
          />
        </Switch>
        <ToastContainer />
      </Router>
    </div>
  );
};

export default App;
