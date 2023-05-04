import { Box, Button, Container, Typography } from "@mui/material";
import { brandPrimary } from "CustomColors";
import { Link } from "react-router-dom";

export default function InterestedComponent() {
  return (
    <Box
      component={"section"}
      sx={{ backgroundColor: brandPrimary[100], minHeight: "60dvh" }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h2"
              sx={{ fontSize: "4rem", fontWeight: "bold", mt: "3rem" }}
            >
              Interested?
            </Typography>
            <Button
              data-testid = "browse-Template-Btn"
              variant="contained"
              sx={{
                display: "block",
                padding: "0.75rem 1.25rem",
                marginTop: "2rem",
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/Templates`}
              >
                Browse templates
              </Link>
            </Button>
          </Box>

          <Box sx={{ flex: "1.25" }}>
            <img
              src={process.env.PUBLIC_URL + "/assets/online-CV.svg"}
              alt="Illustration that shows a resume folder"
              title="Illustration that shows a resume folder. Why are you hovering over this?"
              style={{
                maxWidth: "60vw",
                maxHeight: "60dvh",
                marginBottom: "2rem",
                marginTop: "2rem",
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
