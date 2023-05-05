import { Grid, Typography } from "@mui/material";

export default function About() {
  return (
    <Grid
      container
      component={"main"}
      marginTop={"0.5rem"}
      sx={{
        minHeight: "80dvh",
        padding: "2rem",
      }}
    >
      <Grid item xs={12}>
        <Typography
          variant={"h1"}
          component={"h1"}
          align={"left"}
          color={"inherit"}
          padding={"10px auto"}
          sx={{ fontSize: "4rem" }}
        >
          About this website
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" component={"p"} sx={{ fontSize: "1.5rem" }}>
          CVEasy is a ReactJS-based LaTeX compiling resume creator that allows
          end users to, well, use LaTeX and make resumes, essays and whatever
          else they feel like creating. It takes great inspiration from numerous
          open source projects, alongside taking advantage of Texlive.js. It's
          best described as being in alpha development, and shouldn't
          realistically be used in any professional setting whatsoever.
        </Typography>
      </Grid>
    </Grid>
  );
}
