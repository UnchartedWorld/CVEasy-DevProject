import {
  Alert,
  AlertTitle,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AccountDetails() {
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackMessage, setSnackMessage] = useState<string>("");

  const token = Cookies.get("token") || "";
  const userID = Cookies.get("userID") || "";

  const navigateTo = useNavigate();

  async function handleUserDetails(event: any) {
    event.preventDefault();

    try {
      if (
        userDetails !== null &&
        userDetails.length !== 0 &&
        userDetails !== undefined
      ) {
        const userDetailsFormData = new FormData();
        userDetailsFormData.append("UserID", userID);
        userDetailsFormData.append("firstName", firstName);
        userDetailsFormData.append("middleNames", middleName);
        userDetailsFormData.append("lastName", lastName);
        userDetailsFormData.append("phoneNum", phoneNum);

        const headers: any = {};
        if (userID) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        setLoading(true);
        const response = await axios.patch(
          "api/User/UpdateUserDetails",
          userDetailsFormData,
          {
            headers: headers,
          }
        );

        navigateTo("/Templates");
        window.location.reload();
      } else if (userDetails === undefined || userDetails === null) {
        const userDetailsFormData = new FormData();
        userDetailsFormData.append("UserID", userID);
        userDetailsFormData.append("firstName", firstName);
        userDetailsFormData.append("middleNames", middleName);
        userDetailsFormData.append("lastName", lastName);
        userDetailsFormData.append("phoneNum", phoneNum);

        const headers: any = {};
        if (userID) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        setLoading(true);
        const response = await axios.post(
          "api/User/PostUserDetails",
          userDetailsFormData,
          {
            headers: headers,
          }
        );

        if (response.status === 200) {
          navigateTo("/Templates");
          window.location.reload();
        }
      }
    } catch (error: any) {
      console.log("Error response:", error.response);
      console.log("Error object:", error);
      if (error.response && error.response.data) {
        const errorMessage = error.response?.data?.message;
        setError(errorMessage);
        setSnackMessage(error);
        setOpenSnackbar(true);
        setLoading(false);
      }
      if (phoneNum.length > 10) {
        setError("Phone number input is invalid, likely too long.");
        setSnackMessage("Phone number input is invalid, likely too long.");
        setOpenSnackbar(true);
        setLoading(false);
      }
      if (!error.response || !error.response.data || phoneNum.length <= 10) {
        setError(
          "An error has occurred, likely due to the name inputs being invalid"
        );
        setSnackMessage(
          "An error has occurred, likely due to the name inputs being invalid"
        );
        setOpenSnackbar(true);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    async function getUserDetails() {
      try {
        const response = await axios.get(`api/User/UserDetails/${userID}`);
        setUserDetails(response.data.data);

        setFirstName(response.data.data.firstName);
        setMiddleName(response.data.data.middleNames);
        setLastName(response.data.data.lastName);
        setPhoneNum(response.data.data.phoneNum);
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
          }
        }
        setUserDetails(null);
      }
    }
    getUserDetails();
  }, [userID]);

  function handleFirstNameInput(event: React.ChangeEvent<HTMLInputElement>) {
    const inputFirstName = event.target.value;
    setFirstName(inputFirstName);
  }

  function handleMiddlesNameInput(event: React.ChangeEvent<HTMLInputElement>) {
    const middleNamesInput = event.target.value;
    setMiddleName(middleNamesInput);
  }

  function handleLastNameInput(event: React.ChangeEvent<HTMLInputElement>) {
    const lastNameInput = event.target.value;
    setLastName(lastNameInput);
  }

  function handlePhoneNumInput(event: React.ChangeEvent<HTMLInputElement>) {
    const phoneNumInput = event.target.value;
    const filteredInput = phoneNumInput.replace(/\D/g, "");
    setPhoneNum(filteredInput);
  }

  function handleSnackClose() {
    setOpenSnackbar(false);
    setSnackMessage("");
  }

  return (
    <Box component={"main"} sx={{ flexGrow: 1, minHeight: "100dvh" }}>
      <Container>
        <Grid
          container
          padding={"3rem"}
          component={"form"}
          alignItems={"center"}
          spacing={3}
          onSubmit={handleUserDetails}
        >
          <Grid item xs={12}>
            <Typography
              variant="h1"
              component={"h1"}
              sx={{ fontSize: "4rem", fontWeight: "bold" }}
            >
              Update/Enter user details
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h2"
              component={"h2"}
              sx={{ fontSize: "2rem", mb: "2rem", mt: "2rem" }}
            >
              Enter first name:
            </Typography>
            <TextField
              id="firstNameTextField"
              name="firstName"
              value={firstName}
              fullWidth
              autoComplete="given-name"
              label="Enter first name"
              variant="outlined"
              onChange={handleFirstNameInput}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography
              variant="h2"
              component={"h2"}
              sx={{ fontSize: "2rem", mb: "2rem", mt: "2rem" }}
            >
              Enter middle name(s):
            </Typography>
            <TextField
              id="middleNameTextField"
              name="middleName"
              value={middleName}
              fullWidth
              label="Enter middle name(s)"
              variant="outlined"
              onChange={handleMiddlesNameInput}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography
              variant="h2"
              component={"h2"}
              sx={{ fontSize: "2rem", mb: "2rem", mt: "2rem" }}
            >
              Enter last name:
            </Typography>
            <TextField
              id="lastNameTextField"
              name="lastName"
              value={lastName}
              fullWidth
              label="Enter last name"
              variant="outlined"
              onChange={handleLastNameInput}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              variant="h2"
              component={"h2"}
              sx={{ fontSize: "2rem", mb: "2rem", mt: "2rem" }}
            >
              Enter phone number
            </Typography>
            <TextField
              id="phoneNumberTextField"
              name="phoneNumber"
              value={phoneNum}
              fullWidth
              type={"text"}
              label="Enter phone number name"
              variant="outlined"
              onChange={handlePhoneNumInput}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Grid>
        </Grid>
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={"error"} onClose={handleSnackClose}>
          <AlertTitle>{"Failed"}</AlertTitle>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
