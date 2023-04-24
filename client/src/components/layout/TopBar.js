import React from "react";
// import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import AppBar from '@mui/material/AppBar';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import logo from "../../assets/DCertGroup-logo.png";

const TopBar = ({ user }) => {
  const unauthenticatedListItemsLeft = [];

  const unauthenticatedListItems = [
      <Link variant="button" color="text.primary" href="/users/new" sx={{ my: 1, mx: 1.5 }} > Register </Link>,
      <Button href="/user-sessions/new" variant="outlined" sx={{ my: 1, mx: 1.5 }}> Login </Button>
  ]

  const authenticatedListItemsEmployee = [
      <Link variant="button" color="text.primary" href="/home" sx={{ my: 1, mx: 1.5 }} > Home </Link>,
      <Button href="/user-sessions/new" variant="outlined" sx={{ my: 1, mx: 1.5 }}> Logout </Button>
  ]
  const authenticatedListItemsEmployer = [
      <Link variant="button" color="text.primary" href="/home" sx={{ my: 1, mx: 1.5 }} > Home </Link>,
      <Link variant="button" color="text.primary" href="/employee-grid" sx={{ my: 1, mx: 1.5 }} > Candidates </Link>,
      <Link variant="button" color="text.primary" href="/grid-demo" sx={{ my: 1, mx: 1.5 }} > Grid Demo</Link>,
      <Button href="/user-sessions/new" variant="outlined" sx={{ my: 1, mx: 1.5 }}> Logout </Button>
  ]

  // const authenticatedListItemsLeftEmployee = [
  //   <li className="menu-item" key="home">
  //     <Link to="/home">Home</Link>
  //   </li>
  // ];
  // const authenticatedListItemsLeftEmployer = [
  //   <li className="menu-item" key="home">
  //     <Link to="/home">Home</Link>
  //   </li>,
  //   <li className="menu-item" key="employee-grid">
  //     <Link to="/employee-grid">Candidates</Link>
  //   </li>,
  //   <li className="menu-item" key="grid-demo">
  //     <Link to="/grid-demo">Grid demo</Link>
  //   </li>
  // ];
  // const unauthenticatedListItemsRight = [
  //   <li key="sign-in">
  //     <Link to="/user-sessions/new">Sign In</Link>
  //   </li>,
  //   <li key="sign-up">
  //     <Link to="/users/new">
  //       User Registration
  //     </Link>
  //   </li>,
  //   <li key="sign-up-employer">
  //     <Link to="/users/new/employer">
  //       Business Registration
  //     </Link>
  //   </li>,
  // ];

  // const authenticatedListItemsRight = [
  //   <p key="user" className="menu-item">{user?.email}</p>,
  //   <li key="sign-out">
  //     <SignOutButton />
  //   </li>,
  // ];

  return (
    // <div className="top-bar">
    //   <div className="top-bar-left">
    //     <ul className="menu">
    //       <img id="logo" src={logo} />
    //       {user ? (user.userType === "employer" ? authenticatedListItemsLeftEmployer : authenticatedListItemsLeftEmployee) : unauthenticatedListItemsLeft}
    //     </ul>
    //   </div>
    //   <div className="top-bar-right">
    //     <ul className="menu">{user ? authenticatedListItemsRight : unauthenticatedListItemsRight}</ul>
    //   </div>
    // </div>

    <>
    <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
  
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <img id="logo" src={logo} style={{width: "150px", height: "60px"}} />
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            
          </Typography>
          <nav>
            {user ? (user.userType === "employer" ? authenticatedListItemsEmployer : authenticatedListItemsEmployee) : unauthenticatedListItems}
         </nav>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopBar;
