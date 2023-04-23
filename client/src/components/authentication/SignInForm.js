import { useState } from "react";
import config from "../../config";
import FormError from "../layout/FormError";
import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

const SignInForm = ({ passwordResetPopup, setPasswordResetPopup }) => {
  const [userPayload, setUserPayload] = useState({ email: "", password: "" });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInput = (payload) => {
    setErrors({});
    const { email, password } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: email.length ? "not an email" : "is required",
      };
    }

    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length ? false : true;
  };

  const onSubmit = async (event) => {
    event.preventDefault()
    if (validateInput(userPayload)) {
      try {
        const response = await fetch("/api/v1/user-sessions", {
          method: "POST",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          })
        })
        const userData = await response.json()
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          setErrors(userData);
          throw (error)
        }
        setShouldRedirect("/home");
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`)
      }
    }
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setShouldRedirect("/forgot-password");
  }

  if (shouldRedirect) {
    location.href = shouldRedirect;
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Collapse in={passwordResetPopup}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setPasswordResetPopup(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Close me!
          </Alert>
        </Collapse>
        <Button
          disabled={passwordResetPopup}
          variant="outlined"
          onClick={() => {
            setPasswordResetPopup(true);
          }}
        >
          Re-open
        </Button>
      </Box>
      <div className="grid-container" onSubmit={onSubmit}>
        <h1>Sign In</h1>
        <form>
          <div>
            <label>
              Email
              <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
              <FormError error={errors.email} />
            </label>
          </div>
          <div>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={userPayload.password}
                onChange={onInputChange}
              />
              <FormError error={errors.password} />
            </label>
          </div>
          <div>
            <input type="submit" className="button sign-in-form-button" value="Sign In" />
            <button className="button" onClick={handleForgotPassword}>Forgot password</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInForm;