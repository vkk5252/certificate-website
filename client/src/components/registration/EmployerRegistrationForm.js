import React, { useState } from "react";
import FormError from "../layout/FormError";
import config from "../../config";

const EmployerRegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    userType: "employer",
  });
  const [errors, setErrors] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    const { email, password, passwordConfirmation } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: email.length ? "not an email" : "is required",
      };
    }

    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length ? false : true;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validateInput(userPayload)) {
      try {
          const response = await fetch("/api/v1/users", {
            method: "POST",
            body: JSON.stringify(userPayload),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          });
          const userData = await response.json();
          if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            setErrors(userData.errors);
            throw error;
          }
          setShouldRedirect("/home");
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
    location.href = shouldRedirect;
  }

  return (
    <div className="grid-container">
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
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
          <label>
            Password Confirmation
            <input
              type="password"
              name="passwordConfirmation"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
            <FormError error={errors.passwordConfirmation} />
          </label>
        </div>
        <div>
          <input type="submit" className="button" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default EmployerRegistrationForm;
