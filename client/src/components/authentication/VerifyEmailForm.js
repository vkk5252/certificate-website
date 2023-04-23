import React, { useState } from "react";
import config from "../../config";
import FormError from "../layout/FormError";

const VerifyEmailForm = () => {
  const [userPayload, setUserPayload] = useState({ email: ""});
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInput = (payload) => {
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
  };

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

  const onSubmit = async (event) => {
    event.preventDefault()
    if (validateInput(userPayload)) {
      try {
        const response = await fetch("/api/v1/ses-verify-email", {
          method: "POST",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          })
        })
        // const userData = await response.json()

        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          setErrors(userData);
          throw (error)
        }

        setShouldRedirect("/user-sessions/new");
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

  if (shouldRedirect) {
    location.href = shouldRedirect;
  }

  return (
    <>
      <div className="grid-container" onSubmit={onSubmit}>
        <h1>Verify Email</h1>
        <form>
          <div>
            <label>
              Email
              <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
              <FormError error={errors.email} />
            </label>
          </div>
          <div>
            <input type="submit" className="button sign-in-form-button" value="Send AWS Verification" />
          </div>
        </form>
      </div>
    </>
  );
};

export default VerifyEmailForm;