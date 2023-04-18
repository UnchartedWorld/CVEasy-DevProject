import { Download } from "@mui/icons-material";
import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { brandPrimary } from "CustomColors";

export default function PDFPreview() {
  return (
    <Box component={"section"}>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "-1rem",
          backgroundColor: brandPrimary[200],
          marginLeft: "0.03rem",
        }}
      >
        <Grid item xs={11} md={11} sm={12}>
          <Typography
            className="preview-title"
            component={"h3"}
            variant={"h3"}
            sx={{ fontSize: "1.5rem" }}
          >
            PDF Preview:
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="Download PDF">
            <IconButton aria-label="Icon that lets you download the PDF displayed.">
              <Download />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
}
