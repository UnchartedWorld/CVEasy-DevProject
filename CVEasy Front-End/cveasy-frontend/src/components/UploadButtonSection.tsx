import { Button, Grid, TextField, Typography } from "@mui/material";
import { brandPrimary } from "CustomColors";

export default function UploadButtonSection() {
  return (
    <Grid
      container
      component={"form"}
      sx={{
        backgroundColor: brandPrimary[100],
        minHeight: "80dvh",
        padding: "2rem",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h2" component={"h2"} sx={{ fontSize: "2rem" }}>
          Ready to upload?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" component={"h3"} sx={{ fontSize: "1.5rem" }}>
            Fill in your template's details, upload the TeX file and submit it. And thank you for uploading another useful template!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component={"h4"} sx={{ fontSize: "1.25rem", paddingBottom: "0.5rem"  }}>
            Enter title
        </Typography>
        <TextField
              id="templateTitle"
              name="templateTitle"
              fullWidth
              label="Enter template title"
              variant="outlined"
            />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component={"h4"} sx={{ fontSize: "1.25rem", paddingBottom: "0.5rem" }}>
            Enter description
        </Typography>
        <TextField
              id="templateDescription"
              name="templateDescription"
              fullWidth
              label="Enter template description"
              variant="outlined"
            />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component={"h4"} sx={{ fontSize: "1.25rem", paddingBottom: "0.5rem" }}>
            Enter tag(s).
        </Typography>
        <TextField
              id="templateTags"
              name="templateTags"
              fullWidth
              label="Enter tags"
              variant="outlined"
            />
      </Grid>
      <Grid item xs={10}>
        <Button
          variant="contained"
          color="secondary"
          component="label"
          aria-label="Button that allows you to upload TeX files."
        >
          Upload TeX file
          <input hidden accept=".tex" multiple type={"file"} />
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
            variant="contained"
            aria-label="Button that allows you submit template details and file.">
                Submit
            </Button>
      </Grid>
    </Grid>
  );
}
