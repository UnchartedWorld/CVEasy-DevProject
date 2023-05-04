import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
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
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const token = Cookies.get("token") || "";
  const userID = Cookies.get("userID") || "";

  const navigateTo = useNavigate();

  async function handleUserDetails(event: any) {
    event.preventDefault();

    try {
      if (userDetails === null || userDetails.length === 0) {
        const userDetailsFormData = new FormData();
        userDetailsFormData.append("firstName", firstName);
        userDetailsFormData.append("middleNames", middleName);
        userDetailsFormData.append("lastName", lastName);
        userDetailsFormData.append("phoneNum", phoneNum);

        const headers: any = {};
        if (userID) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        setLoading(true);
        axios.post("api/User/PostUserDetails", userDetailsFormData, {
          headers: headers,
        });

        navigateTo("/Templates");
        window.location.reload();
      } else if (userDetails !== null || userDetails.length !== 0) {
        const userDetailsFormData = new FormData();
        userDetailsFormData.append("firstName", firstName);
        userDetailsFormData.append("middleNames", middleName);
        userDetailsFormData.append("lastName", lastName);
        userDetailsFormData.append("phoneNum", phoneNum);

        const headers: any = {};
        if (userID) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        setLoading(true);
        axios.patch("api/User/UpdateUserDetails", userDetailsFormData, {
          headers: headers,
        });
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setLoading(false);
          const errorMessage =
            error.response.data.message ||
            "An unknown error I didn't account for occurred.";
          setError(errorMessage);
        }
      }
      const errorMessage =
        error.response?.data ||
        "An error has occurred, likely to do with inputs";
      setError(errorMessage);
      setLoading(false);
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
      } catch (error) {
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
    </Box>
  );
}
