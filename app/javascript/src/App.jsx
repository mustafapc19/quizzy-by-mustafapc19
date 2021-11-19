import React, { useEffect, useState } from "react";

import { either, isEmpty, isNil } from "ramda";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import authApi from "apis/auth";
import { resetAuthTokens, setAuthHeaders } from "apis/axios";
import handleError from "common/error";
import { initializeLogger } from "common/logger";
import Login from "components/Authentication/Login";
import PrivateRoute from "components/Common/PrivateRoute";
import ShowLoading from "components/Common/ShowLoading";
import NavBar from "components/NavBar";
import CreateQuestion from "components/Questions/create";
import EditQuestion from "components/Questions/edit";
import ShowQuestions from "components/Questions/show";
import CreateQuiz from "components/Quiz/create";
import ShowQuiz from "components/Quiz/show";
import Reports from "components/Reports";
import ExportDownload from "components/Reports/ExportDownload";
import ExportProcessing from "components/Reports/ExportProcessing";
import { QuizzesProvider } from "contexts/quizzes";
import {
  clearLocalStorage,
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
    setAuthHeaders(setLoading);
    if (isLoggedIn) {
      setUserData(getUserDataFromLocalStorage());
    }
  }, []);

  if (loading) {
    return <ShowLoading />;
  }

  const handleLogout = async () => {
    try {
      await authApi.logout();
      clearLocalStorage();
      resetAuthTokens();
      window.location.href = "/";
      setIsLoggedIn(false);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <QuizzesProvider>
      <>
        <NavBar
          userData={userData}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />
        <div className="mx-8 mt-6">
          <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <PrivateRoute
                path="/reports/download/:exportId"
                redirectRoute="/reports"
                condition={!isLoggedIn}
                component={ExportDownload}
              />
              <PrivateRoute
                path="/reports/export/:exportId"
                redirectRoute="/reports"
                condition={!isLoggedIn}
                component={ExportProcessing}
              />
              <PrivateRoute
                path="/reports"
                redirectRoute="/login"
                condition={!isLoggedIn}
                component={Reports}
              />
              <PrivateRoute
                path="/quiz/show"
                redirectRoute="/login"
                condition={!isLoggedIn}
                component={ShowQuestions}
              />
              <PrivateRoute
                path="/quiz/create"
                redirectRoute="/login"
                condition={!isLoggedIn}
                component={CreateQuiz}
              />
              <PrivateRoute
                path="/quiz/question/edit"
                redirectRoute="/login"
                condition={!isLoggedIn}
                component={EditQuestion}
              />
              <PrivateRoute
                path="/quiz/question/create"
                redirectRoute="/login"
                condition={!isLoggedIn}
                component={CreateQuestion}
              />
              <PrivateRoute
                path="/"
                redirectRoute="/login"
                condition={!isLoggedIn}
                component={ShowQuiz}
              />
            </Switch>
            <ToastContainer />
          </Router>
        </div>
      </>
    </QuizzesProvider>
  );
};

export default App;
