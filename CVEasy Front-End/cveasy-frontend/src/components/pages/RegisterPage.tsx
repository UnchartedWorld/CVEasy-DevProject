import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Backdrop, CircularProgress } from "@mui/material";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
        CVEasy
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const navigateTo = useNavigate();

  async function handleSubmit(event: any) {
    event.preventDefault();

    try {
      const registrationFormData = new FormData();
      registrationFormData.append("Username", username);
      registrationFormData.append("Password", password);
      registrationFormData.append("Email", email);

      setLoading(true);
      const response = await axios.post(
        "api/User/Register",
        registrationFormData
      );

      navigateTo("/Login");
      window.location.replace("/Login");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          const errorMessage =
            error.response.data.message ||
            "An unknown error I didn't account for occurred.";
          setError(errorMessage);
          setLoading(false);
        }
      }
      const errorMessage =
        error.response?.data.errorMessage ||
        "An error has occurred, likely to do with inputs";
      setError(errorMessage);
      setLoading(false);
      setDisabled(false);
    }
  }

  // Used https://ihateregex.io/expr/email/ to get this Regex

  /**
   * A function that returns a boolean value dependant on whether the email is valid or not.
   * @param email String that represents inputted email.
   * @returns Boolean value determining if the email is valid or not.
   */
  function isEnteredEmailValid(email: string) {
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    return emailRegex.test(email);
  }

  function isEnteredUsernameValid(username: string): boolean {
    if (username.length < 4 || username === "") {
      return false;
    } else {
      return true;
    }
  }

  function isEnteredPasswordValid(password: string): boolean {
    if (password.length < 8 || password === "") {
      return false;
    } else {
      return true;
    }
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    setDisabled(!isEnteredEmailValid(inputEmail));
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputPassword = event.target.value;
    setPassword(inputPassword);
    setDisabled(
      !isEnteredEmailValid(email) ||
        event.target.value === "" ||
        event.target.value.length < 8 ||
        username === "" ||
        username.length < 3
    );
  }

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputUsername = event.target.value;
    setUsername(inputUsername);
    setDisabled(
      !isEnteredEmailValid(email) ||
        password === "" ||
        password.length < 8 ||
        event.target.value === "" ||
        event.target.value.length < 3
    );
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  aria-required
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  onChange={handleUsernameChange}
                  error={!isEnteredUsernameValid(username)}
                  InputProps={{
                    inputProps: {
                      minLength: 3,
                      maxLength: 30,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  aria-required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleEmailChange}
                  error={!isEnteredEmailValid(email)}
                  InputProps={{
                    inputProps: {
                      minLength: 5,
                      maxLength: 60,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  aria-required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handlePasswordChange}
                  error={!isEnteredPasswordValid(password)}
                  InputProps={{
                    inputProps: {
                      minLength: 8,
                      maxLength: 50,
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={disabled}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        {error && (
          <Alert severity="error" onClose={clearErrorMessage}>
            {error}
          </Alert>
        )}
        {loading && (
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme: any) => theme.zIndex.drawer + 1,
            }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </Container>
    </ThemeProvider>
  );
}
