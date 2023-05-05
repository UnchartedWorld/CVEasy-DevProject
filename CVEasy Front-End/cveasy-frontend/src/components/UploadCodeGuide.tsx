import { Grid, Typography } from "@mui/material";

export default function UploadCodeGuide() {
  return (
    <Grid
      container
      component={"section"}
      marginTop={"0.5rem"}
      sx={{
        minHeight: "80dvh",
        padding: "2rem",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h2" component={"h2"} sx={{ fontSize: "2rem" }}>
          What should my LaTeX code include?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" component={"p"}>
          Some users may struggle to utilise LaTeX, so you{" "}
          <strong>should</strong> write your templates as if you're introducing
          your grandparents to <i>LaTeX</i> for the first time. First, good
          commenting should be shown throughout to make it easier for someone to
          follow along with the markup. <br /> <br />
          A good example: <br />
          <code>
            % This holds your name, which is displayed on the resume once
            compiled <br />
            \makename{}
          </code>
          <br />
          A bad example: <br />
          <code>
            % Does stuff idk lmao <br />
            \makename{}
          </code>
        </Typography>
      </Grid>
    </Grid>
  );
}
