import { Box, Grid, Typography } from "@mui/material";
import { brandPrimary } from "CustomColors";
import LaTeXAce from "components/LaTeXAce";
import PDFPreview from "components/PDFPreview";
import { useState } from "react";

export default function ResumeCreation() {
  const [pdfBlob, setPDFBlob] = useState<string | null>(null);

  function handleCompilation(pdfBlob: any) {
    if (pdfBlob) {
      setPDFBlob(pdfBlob.toString());
    }
  }

  return (
    <Box component={"main"} sx={{ flexGrow: 1 }}>
      <Grid container paddingTop={"1rem"} paddingBottom={"1rem"} sx={{backgroundColor: brandPrimary[200]}}>
        <Grid item xs={6}>
          <LaTeXAce onCompile={handleCompilation} />
        </Grid>
        {pdfBlob ? (
          <Grid item xs={6}>
            <PDFPreview pdfURL={pdfBlob} />
          </Grid>
        ) : (
          <Typography
            component={"h4"}
            variant={"h4"}
            sx={{
              marginTop: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "auto",
            }}
          >
            PDF not rendered, please try writing and compiling!
          </Typography>
        )}
      </Grid>
    </Box>
  );
}
