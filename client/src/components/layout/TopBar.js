import React, { useContext } from "react";
import AppBar from '@mui/material/AppBar';
import SignOutButton from "../authentication/SignOutButton.js";
import { UserContext } from "../App.js";

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import logo from "../../assets/DCertGroup-logo.png";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const TopBar = (props) => {
  const user = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const unauthenticatedListItems = (
    <>
      <Button id="basic-button" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick} >Register</Button>
      <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button', }} >
        <MenuItem onClick={handleClose}><a href="/users/new">User Registration</a></MenuItem>
        <MenuItem onClick={handleClose}><a href="/users/new/employer">Business Registration</a></MenuItem>
      </Menu>
      <Button href="/user-sessions/new" variant="outlined" sx={{ my: 1, mx: 1.5 }}>Login</Button>
    </>
  );
  const authenticatedListItemsEmployee = (
    <>
      <Link variant="button" color="text.primary" href="/home" sx={{ my: 1, mx: 1.5 }} >User Info</Link>
      <SignOutButton />
    </>
  );
  const authenticatedListItemsEmployer = (
    <>
      <Link variant="button" color="text.primary" href="/home" sx={{ my: 1, mx: 1.5 }} >Home</Link>
      <Link variant="button" color="text.primary" href="/employee-grid" sx={{ my: 1, mx: 1.5 }} >Candidates</Link>
      <Link variant="button" color="text.primary" href="/grid-demo" sx={{ my: 1, mx: 1.5 }} d >Grid Demo</Link>
      <SignOutButton />
    </>
  );

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