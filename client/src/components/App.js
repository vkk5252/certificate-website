import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import HomeEmployee from "./employee/HomeEmployee";
import HomeEmployer from "./employer/HomeEmployer";
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
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          {triedFetchUser ? <Redirect to={currentUser ? "/home" : "/user-sessions/new"} /> : null}
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/users/new/employer" component={EmployerRegistrationForm} />
        {
          currentUser?.userType === "employer" ?
            <>
              <Route exact path="/home" component={HomeEmployer} />
              <Route exact path="/employee-grid" component={EmployeeGrid} />
              <Route exact path="/grid-demo" component={GridDemo} />
            </>
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
        <Route exact path="/reset-password">
          <ResetPasswordPage setPasswordResetPopup={setPasswordResetPopup} />
        </Route>
        <Route exact path="/verify-email" component={VerifyEmailForm} />
        <Route>Unauthorized for {window.location.pathname}</Route>
      </Switch>
    </Router>
  );
};

export default hot(App);