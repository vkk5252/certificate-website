import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Button from '@mui/material/Button';

const SignOutButton = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const signOut = async (event) => {
    event.preventDefault()
    try {
        const response = await fetch("/api/v1/user-sessions", {
        method: "delete",
        headers: new Headers({
          "Content-Type": "application/json",
        })
      })
      if(!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const respBody = await response.json()
      setShouldRedirect(true)
      return { status: "ok" }
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <Button onClick={signOut} variant="outlined" sx={{ my: 1, mx: 1.5 }}> Logout </Button>
  );
};

export default SignOutButton;
