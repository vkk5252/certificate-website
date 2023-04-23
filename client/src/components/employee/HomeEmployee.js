import React, { useState } from "react";
import FormError from "../layout/FormError";
import config from "../../config";

const HomeEmployee = () => {
  const [userPayload, setUserPayload] = useState({
    firstName: "",
    lastName: "",
    address: "", 
    city: "",
    zipcode: "",
  });
  const [errors, setErrors] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    const { firstName, lastName, address, city, zipcode } = payload;
    let newErrors = {};
    
    if (firstName.trim() == "") {
      newErrors = {
        ...newErrors,
        firstName: "is required",
      };
    }

    if (lastName.trim() == "") {
      newErrors = {
        ...newErrors,
        lastName: "is required",
      };
    }

    if (address.trim() == "") {
      newErrors = {
        ...newErrors,
        address: "is required",
      };
    }

    if (city.trim() == "") {
      newErrors = {
        ...newErrors,
        city: "is required",
      };
    }

    if (zipcode.trim() == "") {
      newErrors = {
        ...newErrors,
        zipcode: "is required",
      };
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length ? false : true;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validateInput(userPayload)) {
      try {
          const response = await fetch("/api/v1/user-info", {
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
      <h1>User Credentials</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            First Name 
            <input type="text" name="firstName" value={userPayload.firstName} onChange={onInputChange} />
            <FormError error={errors.firstName} />
          </label>
        </div>
        <div>
          <label>
            Last Name 
             <input type="text" name="lastName" value={userPayload.lastName} onChange={onInputChange} />
            <FormError error={errors.lastName} />
          </label>
        </div>
        <div>
          <label>
            Address 
            <input type="text" name="address" value={userPayload.address} onChange={onInputChange} />
            <FormError error={errors.address} />
          </label>
        </div>
        <div>
          <label>
            City 
            <input type="text" name="city" value={userPayload.city} onChange={onInputChange} />
            <FormError error={errors.city} />
          </label>
        </div>
        <div>
          <label>
            Zipcode 
            <input type="text" name="zipcode" value={userPayload.zipcode} onChange={onInputChange} />
            <FormError error={errors.zipcode} />
          </label>
        </div>
        <div>
          <input type="submit" className="button" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default HomeEmployee;
