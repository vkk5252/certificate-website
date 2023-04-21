import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

import logo from "../../assets/DCertGroup-logo.png";

const TopBar = ({ user }) => {
  const unauthenticatedListItemsLeft = [];

  const authenticatedListItemsLeftEmployee = [
    <li className="menu-item">
      <Link to="/home">Home</Link>
    </li>
  ];
  const authenticatedListItemsLeftEmployer = [
    <li className="menu-item">
      <Link to="/home">Home</Link>
    </li>,
    <li className="menu-item">
      <Link to="/employee-grid">Candidates</Link>
    </li>
  ];
  const unauthenticatedListItemsRight = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new"> 
        User Registration 
      </Link>
    </li>,
    <li key="sign-up-employer">
      <Link to="/users/new/employer">
        Business Registration 
      </Link>
    </li>,
  ];

  const authenticatedListItemsRight = [
    <p key="user" className="menu-item">{user?.email}</p>,
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <img id="logo" src={logo} />
          {user ? (user.userType === "employer" ? authenticatedListItemsLeftEmployer : authenticatedListItemsLeftEmployee) : unauthenticatedListItemsLeft}
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItemsRight : unauthenticatedListItemsRight}</ul>
      </div>
    </div>
  );
};

export default TopBar;
