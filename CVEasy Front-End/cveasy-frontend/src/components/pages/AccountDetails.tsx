import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";


export default function AccountDetails() {
  return (
    <Box component={"main"} sx={{ flexGrow: 1, minHeight: "100dvh" }}>
      <Container>
        <Grid
          container
          padding={"3rem"}
          component={"form"}
          alignItems={"center"}
          spacing={3}
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
              fullWidth
              autoComplete="given-name"
              label="Enter first name"
              variant="outlined"
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
              fullWidth
              label="Enter middle name(s)"
              variant="outlined"
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
              fullWidth
              label="Enter last name"
              variant="outlined"
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
              fullWidth
              type={"tel"}
              label="Enter phone number name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained">Save</Button>

          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}
