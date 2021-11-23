import React, { useEffect, useState } from "react";

import { either, isEmpty, isNil } from "ramda";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import authApi from "apis/auth";
import { resetAuthTokens, setAuthHeaders } from "apis/axios";
import handleError from "common/error";
import { initializeLogger } from "common/logger";
import Login from "components/Authentication/Login";
import PrivateRoute from "components/Common/PrivateRoute";
import ShowLoading from "components/Common/ShowLoading";
import NavBar from "components/NavBar";
import CreateQuiz from "components/Quiz/create";
import EditQuiz from "components/Quiz/edit";
import ListQuiz from "components/Quiz/list";
import CreateQuestion from "components/Quiz/Questions/create";
import EditQuestion from "components/Quiz/Questions/edit";
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
              <PrivateRoute
                exact
                path="/login"
                redirectRoute="/"
                condition={isLoggedIn}
                component={Login}
              />
              <PrivateRoute
                path="/report/download/:exportId"
                redirectRoute="/login"
                condition={!isLoggedIn}
                component={ExportDownload}
              />
              <PrivateRoute
                path="/report/export/:exportId"
                redirectRoute="/login"
                condition={!isLoggedIn}
                component={ExportProcessing}
              />
              <PrivateRoute
                path="/report"
                redirectRoute="/login"
                condition={!isLoggedIn}
                component={Reports}
              />
              <PrivateRoute
                path="/quiz/:quizId/edit"
                redirectRoute="/login"
                condition={!isLoggedIn}
                component={EditQuiz}
              />
              <PrivateRoute
                path="/quiz/:quizId/show"
                redirectRoute="/login"
                condition={!isLoggedIn}
                component={ShowQuiz}
              />
              <PrivateRoute
                path="/quiz/create"
                redirectRoute="/login"
                condition={!isLoggedIn}
                component={CreateQuiz}
              />
              <PrivateRoute
                path="/quiz/:quizId/question/:questionId/edit"
                redirectRoute="/login"
                condition={!isLoggedIn}
                component={EditQuestion}
              />
              <PrivateRoute
                path="/quiz/:quizId/question/create"
                redirectRoute="/login"
                condition={!isLoggedIn}
                component={CreateQuestion}
              />
              <PrivateRoute
                path="/"
                redirectRoute="/login"
                condition={!isLoggedIn}
                component={ListQuiz}
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
