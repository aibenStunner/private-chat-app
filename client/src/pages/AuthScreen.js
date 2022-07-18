import React, { useRef, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  Card,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { SIGNIN_USER, SIGNUP_USER } from "../graphql/mutations";

const AuthScreen = ({ setLoggedIn }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [formData, setFromData] = useState({});
  const authForm = useRef(null);

  const [signUpUser, { data: signUpResponse, loading: l1, error: e1 }] =
    useMutation(SIGNUP_USER);

  const [signInUser, { data: signInResponse, loading: l2, error: e2 }] =
    useMutation(SIGNIN_USER, {
      onCompleted(data) {
        localStorage.setItem("jwt", data.signInUser.token);
        setLoggedIn(true);
      },
    });

  if (l1 || l2) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box textAlign="center">
          <CircularProgress />
          <Typography variant="h6">Authenticating...</Typography>
        </Box>
      </Box>
    );
  }

  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (showLogin) {
      signInUser({
        variables: {
          userSignIn: formData,
        },
      });
    } else {
      signUpUser({
        variables: {
          newUser: formData,
        },
      });
    }
  };

  return (
    <Box
      ref={authForm}
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Card variant="outlined" sx={{ padding: "10px" }}>
        <Stack direction="column" spacing={2} sx={{ width: "400px" }}>
          {signUpResponse && (
            <Alert severity="success">
              {signUpResponse.signUpUser.firstName} Signed Up!
            </Alert>
          )}
          {e1 && <Alert severity="error">{e1.message}</Alert>}
          {e2 && <Alert severity="error">{e2.message}</Alert>}
          <Typography variant="h5">
            Please {showLogin ? "Login" : "Signup"}
          </Typography>
          {!showLogin && (
            <>
              <TextField
                name="firstName"
                label="First Name"
                variant="standard"
                onChange={handleChange}
                required
              />
              <TextField
                name="lastName"
                label="Last Name"
                variant="standard"
                onChange={handleChange}
                required
              />
            </>
          )}

          <TextField
            type="email"
            name="email"
            label="Email"
            variant="standard"
            onChange={handleChange}
            required
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            variant="standard"
            onChange={handleChange}
            required
          />
          <Typography
            variant="subtitle1"
            textAlign="center"
            onClick={() => {
              setShowLogin((prevValue) => !prevValue);
              setFromData({});
              authForm.current.reset();
            }}
          >
            {showLogin ? "Signup?" : "Login?"}
          </Typography>
          <Button variant="outlined" type="submit">
            {showLogin ? "Login" : "Signup"}
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default AuthScreen;
