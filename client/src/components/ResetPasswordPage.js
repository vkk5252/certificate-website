import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import queryString from "query-string";

import FormError from "./layout/FormError.js";

const ResetPasswordPage = ({ setPasswordResetPopup }) => {
  const [userPayload, setUserPayload] = useState({ newPassword: "", newPasswordConfirmation: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const { search } = useLocation();
  const { email, uuid } = queryString.parse(search);

  const validateInput = (payload) => {
    const { newPassword, newPasswordConfirmation } = payload;
    let newErrors = {};

    if (newPassword.trim() == "") {
      newErrors = {
        ...newErrors,
        newPassword: "is required",
      };
    }

    if (newPasswordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        newPasswordConfirmation: "is required",
      };
    } else {
      if (newPasswordConfirmation !== newPassword) {
        newErrors = {
          ...newErrors,
          newPasswordConfirmation: "does not match password",
        };
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length ? false : true;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    if (validateInput(userPayload)) {
      try {
          const response = await fetch(`/api/v1/reset-password?email=${email}&uuid=${uuid}`, {
            method: "POST",
            body: JSON.stringify(userPayload),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          });
          const body = await response.json();
          const { message } = body;
          if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            setSuccessMessage(message);
            throw error;
          }
          setSuccessMessage("Password reset successful");
          setPasswordResetPopup(true);
          setShouldRedirect("/user-sessions/new");
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`);
      }
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  
  if (shouldRedirect) {
    // location.href = shouldRedirect;
    return <Redirect to="/user-sessions/new" />
  }

  return (
    <>
      <div className="grid-container" onSubmit={onSubmit}>
        <h1>Reset password for {email}</h1>
        <form>
          <div>
            <label>
              New password
              <input
                type="password"
                name="newPassword"
                value={userPayload.newPassword}
                onChange={onInputChange}
              />
              <FormError error={errors.newPassword} />
            </label>
          </div>
          <div>
            <label>
              New password Confirmation
              <input
                type="password"
                name="newPasswordConfirmation"
                value={userPayload.newPasswordConfirmation}
                onChange={onInputChange}
              />
              <FormError error={errors.newPasswordConfirmation} />
            </label>
          </div>
          <div>
            <input type="submit" className="button" value="Reset password" />
          </div>
        </form>
      </div>
      <h6>{successMessage}</h6>
    </>
  );
}

export default ResetPasswordPage;