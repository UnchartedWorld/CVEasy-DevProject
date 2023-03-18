import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Container component={"main"} sx={{ mt: "5rem", height: "80dvh" }}>
      <Typography
        variant="h1"
        component={"h1"}
        sx={{ fontWeight: "bold", fontSize: "3.5rem" }}
      >
        404 - Page not found
      </Typography>
      <Typography variant="h2" component={"h2"} sx={{ fontSize: "2.5rem" }}>
        Seems like you ended up on a page that didn't exist. That sucks, a lot,
        but no matter. Here's a button to find your way back home <br />{" "}
        ♡＼(￣▽￣)／♡
      </Typography>
      <Button
        variant="contained"
        sx={{
          display: "block",
          padding: "1rem 2rem",
          marginTop: "2rem",
        }}
      >
        <Link style={{ textDecoration: "none", color: "inherit" }} to={`/Home`}>
          Head home
        </Link>
      </Button>
    </Container>
  );
}
