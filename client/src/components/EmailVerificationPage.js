import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const EmailVerificationPage = (props) => {
  const { search } = useLocation();
  const { email, uuid } = queryString.parse(search);
  const [message, setMessage] = useState("");

  const verify = async (email, uuid) => {
    const response = await fetch(`/api/v1/verify-email/?email=${email}&uuid=${uuid}`);
    const { message } = await response.json();
    setMessage(message);
  }

  useEffect(() => {
    verify(email, uuid);
  }, []);
  
  return (
    <>
      <h4>{message}</h4>
    </>
  );
}

export default EmailVerificationPage;