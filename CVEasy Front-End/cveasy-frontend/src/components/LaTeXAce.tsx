import { Box } from "@mui/system";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/snippets/latex";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-monokai";
import AceEditor from "react-ace";
import {
  Button,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { brandPrimary } from "../CustomColors";
import {
  ArrowCircleRight,
  Assignment,
  CleaningServices,
  Download,
} from "@mui/icons-material";

export default function LaTeXAce() {


  return (
    <Box component={"section"}>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "-1rem",
          backgroundColor: brandPrimary[200],
          marginLeft: "0.05rem",
        }}
      >
        <Grid item xs={8} md={8} sm={12}>
          <Typography
            className="editor-title"
            component={"h3"}
            variant={"h3"}
            sx={{ fontSize: "1.5rem" }}
          >
            CVEasy LaTeX editor:
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="Download LaTeX">
            <IconButton aria-label="Icon that lets you download the LaTeX code used.">
              <Download />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="Copy to Clipboard">
            <IconButton aria-label="Icon that lets you copy your LaTeX code to your clipboard">
              <Assignment />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="Clear code. THIS WILL REMOVE WHAT YOU WROTE HERE">
            <IconButton aria-label="Icon that clears the editor. Be careful.">
              <CleaningServices />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="Compile code">
            <IconButton aria-label="Icon that compiles your given LaTeX code">
              <ArrowCircleRight />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      <AceEditor
        name="editor"
        mode="latex"
        value="test"
        theme="monokai"
        height="90vh"
        width="49.55vw"
        fontSize="1.1rem"
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
      />
    </Box>
  );
}
