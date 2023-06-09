import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import HomeEmployee from "./employee/HomeEmployee";
import Dashboard from "./employer/Dashboard/Dashboard.js";
import EmployeeGrid from "./employer/EmployeeGrid";
import EmployerRegistrationForm from "./registration/EmployerRegistrationForm";
import SignInForm from "./authentication/SignInForm";
import VerifyEmailForm from "./authentication/VerifyEmailForm";
import TopBar from "./layout/TopBar";
import EmailVerificationPage from "./EmailVerificationPage.js";
import ResetPasswordPage from "./ResetPasswordPage.js";
import ForgotPasswordPage from "./ForgotPasswordPage.js";
import ForgotPasswordEmailSent from "./ForgotPasswordEmailSent.js";
import GridDemo from "./employer/GridDemo.js";

const UserContext = createContext(undefined);
const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [passwordResetPopup, setPasswordResetPopup] = useState(false);
  const [triedFetchUser, setTriedFetchUser] = useState(false);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
    setTriedFetchUser(true);
  }

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      <TopBar />
      <Router>
        <Switch>
          <Route exact path="/">
            {triedFetchUser ? <Redirect to={currentUser ? "/home" : "/user-sessions/new"} /> : null}
          </Route>
          <Route exact path="/users/new" component={RegistrationForm} />
          <Route exact path="/users/new/employer" component={EmployerRegistrationForm} />
          {
            currentUser?.userType === "employer" ?
              [
                <Route exact path="/home" component={EmployeeGrid} key="home" />,
                <Route exact path="/dashboard" component={Dashboard} key="home" />,
                <Route exact path="/employee-grid" component={EmployeeGrid} key="employeeGrid" />,
                <Route exact path="/grid-demo" component={GridDemo} key="gridDemo" />
              ]
              : currentUser?.userType === "employee" ?
                <Route exact path="/home" component={HomeEmployee} />
                : null
          }
          <Route exact path="/forgot-password" component={ForgotPasswordPage} />
          <Route exact path="/forgot-password/email-sent" component={ForgotPasswordEmailSent} />
          <Route exact path="/user-sessions/new">
            <SignInForm
              passwordResetPopup={passwordResetPopup}
              setPasswordResetPopup={setPasswordResetPopup}
            />
          </Route>
          <Route exact path="/verify" component={EmailVerificationPage} />
          <Route exact path="/verify-email" component={VerifyEmailForm} />
          <Route exact path="/reset-password">
            <ResetPasswordPage setPasswordResetPopup={setPasswordResetPopup} />
          </Route>
          <Route></Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default hot(App);
export { UserContext };