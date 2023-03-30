import { Box, Grid } from "@mui/material";
import LaTeXAce from "components/LaTeXAce";

export default function ResumeCreation() {
  return (
    <Box component={"main"} sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} paddingTop={"1rem"} paddingBottom={"1rem"}>
        <Grid item xs={12}>
          <LaTeXAce />
        </Grid>
      </Grid>
    </Box>
  );
}
