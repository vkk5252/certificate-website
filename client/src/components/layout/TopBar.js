import React from "react";
import AppBar from '@mui/material/AppBar';
import SignOutButton from "../authentication/SignOutButton.js";

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import logo from "../../assets/DCertGroup-logo.png";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <Link variant="button" color="text.primary" href="/users/new" sx={{ my: 1, mx: 1.5 }} > Register </Link>,
    <Button href="/user-sessions/new" variant="outlined" sx={{ my: 1, mx: 1.5 }}> Login </Button>
  ]

  const authenticatedListItemsEmployee = [
    <Link variant="button" color="text.primary" href="/home" sx={{ my: 1, mx: 1.5 }} > Home </Link>,
    <SignOutButton />
  ]
  const authenticatedListItemsEmployer = [
    <Link variant="button" color="text.primary" href="/home" sx={{ my: 1, mx: 1.5 }} > Home </Link>,
    <Link variant="button" color="text.primary" href="/employee-grid" sx={{ my: 1, mx: 1.5 }} > Candidates </Link>,
    <Link variant="button" color="text.primary" href="/grid-demo" sx={{ my: 1, mx: 1.5 }} > Grid Demo</Link>,
    <SignOutButton />
  ]

  return (
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
          <img id="logo" src={logo} style={{ width: "150px", height: "60px" }} />
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}></Typography>
          <nav>
            {user ? (user.userType === "employer" ? authenticatedListItemsEmployer : authenticatedListItemsEmployee) : unauthenticatedListItems}
          </nav>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TopBar;
