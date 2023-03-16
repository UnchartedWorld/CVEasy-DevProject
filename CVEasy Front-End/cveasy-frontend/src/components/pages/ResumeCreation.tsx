import { Box, Typography, Grid } from "@mui/material";
import LaTeXAce from "components/LaTeXAce";

export default function ResumeCreation() {
  return (
    <Box component={"main"} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} padding={"1rem"}>
        <Grid item xs={6}>
          <LaTeXAce />
        </Grid>
      </Grid>
    </Box>
  );
}
