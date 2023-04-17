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
import TopBar from "./layout/TopBar";

import EmailVerificationPage from "./EmailVerificationPage.js";
import ResetPasswordPage from "./ResetPasswordPage.js";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch (err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  console.log(currentUser);
  let specificRoutes;
  if (currentUser?.userType === "employer") {
    specificRoutes = [
      <Route exact path="/home" component={HomeEmployer} />, 
      <Route exact path="/employee-grid" component={EmployeeGrid} />
    ];
  }
  if (currentUser?.userType === "employee") {
    specificRoutes = [
      <Route exact path="/home" component={HomeEmployee} />
    ];
  }

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <Redirect to="/user-sessions/new" />
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/users/new/employer" component={EmployerRegistrationForm} />
        {specificRoutes}
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/verify" component={EmailVerificationPage} />
        <Route exact path="/reset-password" component={ResetPasswordPage} />
        <Route>Unauthorized for {window.location.pathname}</Route>
      </Switch>
    </Router>
  );
};

export default hot(App);