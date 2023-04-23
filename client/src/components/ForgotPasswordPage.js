import React, { useState } from "react";
import config from "./../config";
import FormError from "./layout/FormError";

const ForgotPasswordPage = (props) => {
  const [userPayload, setUserPayload] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
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

  return (
    <>
      <div className="grid-container" onSubmit={onSubmit}>
        <h1>Forgot password</h1>
        <form>
          <div>
            <label>
              Email
              <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
              <FormError error={errors.email} />
            </label>
          </div>
          <div>
            <input type="submit" className="button" value="Send email" />
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordPage;