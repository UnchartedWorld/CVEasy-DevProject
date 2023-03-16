import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";

export default function Hero() {
  return (
    <Box
      component={"section"}
      sx={{ backgroundColor: "#cccc", minHeight: "100dvh" }}
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
              variant="body2"
              sx={{
                fontSize: "1.125rem",
                mt: "5rem",
                mb: "2rem",
              }}
            >
              CVEasy makes it, well, easy.
            </Typography>

            <Typography
              variant="h1"
              sx={{ fontSize: "4rem", fontWeight: "bold" }}
            >
              Create resumes with the power of LaTeX!
            </Typography>
            <Button
              variant="contained"
              sx={{
                display: "block",
                padding: "0.75rem 1.25rem",
                marginTop: "2rem",
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/Register`}
              >
                Get started
              </Link>
            </Button>
          </Box>

          <Box sx={{ flex: "1.25" }}>
            <img
              src={process.env.PUBLIC_URL + "/assets/resume-Folder.svg"}
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
