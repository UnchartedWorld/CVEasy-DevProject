import { Box, Container, Grid, Typography } from "@mui/material";
import FeatureCards from "./FeatureCards";

const featureCardData = [
  {
    /* https://commons.wikimedia.org/wiki/File:LaTeX_logo.svg */
    img: process.env.PUBLIC_URL + "/assets/LaTeX_logo.svg",
    cardTitle: "LaTeX",
    cardDescription:
      "By using LaTeX, you can create beautifully typeset resumes and much more.",
  },
  {
    /* https://commons.wikimedia.org/wiki/File:PDF_icon.svg */
    img: process.env.PUBLIC_URL + "/assets/pdf-Icon.svg",
    cardTitle: "Exports to PDF",
    cardDescription:
      "Most companies accept PDF resumes, and fortunately we export to PDF too!",
  },
  {
    /* https://www.pexels.com/photo/crop-faceless-person-using-laptop-in-darkness-5926378/ */
    img: process.env.PUBLIC_URL + "/assets/searching.jpg",
    cardTitle: "A wide selection of templates",
    cardDescription:
      "Don't like one template? Don't use it! Find a wide array of pleasant, effective resume templates.",
  },
];

export default function Features() {
  return (
    <Box component={"section"} sx={{ minHeight: "70dvh", mt: 10 }}>
      <Container>
        <Typography
          variant="h2"
          sx={{
            mb: "3rem",
            fontSize: "3rem",
            fontWeight: "bold",
          }}
        >
          What can this web app do? Well..
        </Typography>
        <Grid container spacing={2} alignItems={"center"}>
          {featureCardData.map((featureCards) => (
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCards
                img={featureCards.img}
                cardTitle={featureCards.cardTitle}
                cardDescription={featureCards.cardDescription}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
