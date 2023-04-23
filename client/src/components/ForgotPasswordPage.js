import React, { useState } from "react";
import config from "./../config";
import FormError from "./layout/FormError";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ForgotPasswordPage = (props) => {
  const [userPayload, setUserPayload] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateEmail = (payload) => {
    setErrors({});
    const { email } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: email.length ? "not an email" : "is required",
      };
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length ? false : true;
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validateEmail(userPayload)) {
      try {
        const response = await fetch("/api/v1/reset-password/send-email", {
          method: "POST",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          })
        })
        const body = await response.json();
        setErrors({ password: body.message });
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          setErrors(userData);
          throw (error)
        }
        setShouldRedirect("/forgot-password/email-sent")
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`)
      }
    }
  }

  if (shouldRedirect) {
    location.href = shouldRedirect;
  }

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://dcertgroup.com/">
        DCertGroup.com 
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const theme = createTheme();

  return (
    // <>
    //   <div className="grid-container" onSubmit={onSubmit}>
    //     <h1>Forgot password</h1>
    //     <form>
    //       <div>
    //         <label>
    //           Email
    //           <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
    //           <FormError error={errors.email} />
    //         </label>
    //       </div>
    //       <div>
    //         <input type="submit" className="button" value="Send email" />
    //       </div>
    //     </form>
    //   </div>
    // </>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
             Recover Password 
            </Typography>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={userPayload.email}
                onChange={onInputChange}
                variant="filled"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send recovery email 
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>

  );
};

export default ForgotPasswordPage;