import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Document, pdf } from "@react-pdf/renderer";
import { brandPrimary } from "CustomColors";

interface PDFPreviewProps {
  pdfURL: string | null;
}

export default function PDFPreview(props: PDFPreviewProps) {
  const { pdfURL } = props;

  if (!pdfURL) {
    return (
      <Typography className="no-pdf-text" component={"h4"} variant={"h4"}>
        No PDF to display yet.
      </Typography>
    );
  }

  return (
    <Box component={"section"}>
      <Grid
        container
        sx={{
          marginLeft: "0.03rem",
        }}
      >
        <Grid item xs={12}>
          <Typography
            className="preview-title"
            component={"h3"}
            variant={"h3"}
            sx={{ fontSize: "1.5rem" }}
          >
            PDF Preview:
          </Typography>
        </Grid>
      </Grid>
      <div id={"pdfViewerContainer"} style={{ paddingTop: "12px", height: "101.5dvh" }}>
        <Document>
          <iframe title="pdf-viewer" width={"100%"} height={"100%"} src={pdfURL} />
        </Document>
      </div>
    </Box>
  );
}
