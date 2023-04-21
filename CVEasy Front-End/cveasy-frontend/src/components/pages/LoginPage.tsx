import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        CVEasy - Courtesy of MUI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

interface LoginResponse {
  token: string;
  userID: string;
}

const theme = createTheme();

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const navigateTo = useNavigate();

  // Used https://ihateregex.io/expr/email/ to get this Regex

  /**
   * A function that returns a boolean value dependant on whether the email is valid or not.
   * @param email String that represents inputted email.
   * @returns Boolean value determining if the email is valid or not.
   */
  function isEnteredEmailValid(email: string) {
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    return emailRegex.test(email)
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    setDisabled(!isEnteredEmailValid(inputEmail) || password === '' || password.length < 8);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputPassword = event.target.value;
    setPassword(inputPassword);
    setDisabled(!isEnteredEmailValid(email) || event.target.value === '' || event.target.value.length < 8)
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    try {
      const loginFormData = new FormData();
      loginFormData.append("Email", email);
      loginFormData.append("Password", password);
      
      setLoading(true);
      const response: AxiosResponse<LoginResponse> = await axios.post(
        "api/User/Login",
        loginFormData
      );

      if (response.status === 200) {
        const token = response.data.token;
        const userID = response.data.userID;
        const expirationTimeInHours = 47;
        const trueExpirationTime = expirationTimeInHours / 24;
  
        Cookies.set('token', token, { expires: trueExpirationTime, secure: true, sameSite: 'strict'})
        Cookies.set('userID', userID, { expires: trueExpirationTime, secure: true, sameSite: 'strict'})
        setDisabled(true);

        navigateTo('/Templates');
        window.location.replace('/Templates');

      }
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          const errorMessage = error.response?.data.message || "An unknown message I didn't account for occurred."
          setError(errorMessage);
          console.log(error.response.data.error);
        }
      }
    }
  }

  function clearErrorMessage() {
    setError("");
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleEmailChange}
              error={!isEnteredEmailValid(email)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
              InputProps={{
                inputProps: {
                  minLength: 8,
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={disabled}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/Register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        {error && (
          <Alert severity="error" onClose={clearErrorMessage}>
            {error}
          </Alert>
        )}
      </Container>
    </ThemeProvider>
  );
}
