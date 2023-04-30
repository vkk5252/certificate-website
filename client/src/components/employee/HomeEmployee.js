import React, { useState } from "react";
import FormError from "../layout/FormError";
import config from "../../config";

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

  //   return (
  //     <div className="grid-container">
  //       <h1>User Credentials</h1>
  //       <form onSubmit={onSubmit}>
  //         <div>
  //           <label>
  //             First Name 
  //             <input type="text" name="firstName" value={userPayload.firstName} onChange={onInputChange} />
  //             <FormError error={errors.firstName} />
  //           </label>
  //         </div>
  //         <div>
  //           <label>
  //             Last Name 
  //              <input type="text" name="lastName" value={userPayload.lastName} onChange={onInputChange} />
  //             <FormError error={errors.lastName} />
  //           </label>
  //         </div>
  //         <div>
  //           <label>
  //             Address 
  //             <input type="text" name="address" value={userPayload.address} onChange={onInputChange} />
  //             <FormError error={errors.address} />
  //           </label>
  //         </div>
  //         <div>
  //           <label>
  //             City 
  //             <input type="text" name="city" value={userPayload.city} onChange={onInputChange} />
  //             <FormError error={errors.city} />
  //           </label>
  //         </div>
  //         <div>
  //           <label>
  //             Zipcode 
  //             <input type="text" name="zipcode" value={userPayload.zipcode} onChange={onInputChange} />
  //             <FormError error={errors.zipcode} />
  //           </label>
  //         </div>
  //         <div>
  //           <input type="submit" className="button" value="Submit" />
  //         </div>
  //       </form>
  //     </div>
  //   );
  // };

  // export default HomeEmployee;

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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
          <Typography component="h1" variant="h5">
            User Information
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={userPayload.firstName}
                  onChange={onInputChange}
                  variant="filled"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={userPayload.lastName}
                  onChange={onInputChange}
                  variant="filled"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="Address"
                  variant="filled"
                  value={userPayload.address}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  variant="filled"
                  value={userPayload.city}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="zipcode"
                  label="Zipcode"
                  name="zipcode"
                  variant="filled"
                  value={userPayload.zipcode}
                  onChange={onInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit 
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default HomeEmployee;
