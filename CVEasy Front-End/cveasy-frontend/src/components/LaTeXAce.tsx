import { Box } from "@mui/system";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-latex";
import "ace-builds/src-noconflict/snippets/latex";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-monokai";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-searchbox";
import {
  Alert,
  AlertTitle,
  Grid,
  IconButton,
  Snackbar,
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
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export var pdfURL: string | URL | undefined;

export default function LaTeXAce({onCompile}: any) {
  const [input, setInput] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackMessage, setSnackMessage] = useState<string>("");
  const [pdfBlob, setPDFBlob] = useState<string | null>(null);
  const aceRef = useRef<AceEditor | null>(null);
  const { state } = useLocation();
  const passedCode = state.texCode;

  useEffect(() => {
    setInput(passedCode);
  }, []);

  async function copyTextToClip() {
    const aceEditor = aceRef.current?.editor;
    const aceCode = aceEditor?.getValue();

    if (aceCode) {
      try {
        setSnackMessage("Code copied successfully!");
        setOpenSnackbar(true);
        await navigator.clipboard.writeText(aceCode);
      } catch (error) {
        setSnackMessage("Couldn't copy code to clipboard for some reason.");
        setOpenSnackbar(true);
      }
    }
  }


  /* https://thewebdev.info/2021/11/20/how-to-download-a-string-as-txt-file-in-react/ */

  function downloadCode() {
    const element = document.createElement("a");
    const file = new Blob([input], {type: "text/plain"})
    element.href = URL.createObjectURL(file);
    element.download = "template.tex";
    document.body.appendChild(element);
    element.click()
  }

  function handleSnackClose() {
    setOpenSnackbar(false);
    setSnackMessage("");
  }

  function onChange(newVal: any) {
    setInput(newVal);
  }

  function clearCode() {
    setInput("");
  }

  function compileTeX() {
    var texlive = new (TeXLive as any)();
    var pdftex = texlive.pdftex;

    setOpenSnackbar(true)
    setSnackMessage("Compiling.... if nothing happens, check console.log")

    pdftex
      .compile(input)
      .then(function (pdf_dataurl: string | URL | undefined) {
        if (pdf_dataurl) {
          pdfURL = pdf_dataurl;
          setPDFBlob(pdfURL.toString());
          onCompile(pdfURL.toString());
          texlive.terminate();
          setOpenSnackbar(true)
          setSnackMessage("Compiled!")
        }
      });
  };

  return (
    <Box component={"section"}>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "-1rem",
          backgroundColor: brandPrimary[200],
        }}
      >
        <Grid item xs={8} md={8} sm={12}>
          <Typography
            className="editor-title"
            component={"h3"}
            variant={"h3"}
            sx={{ fontSize: "1.5rem", paddingLeft: "1rem" }}
          >
            CVEasy LaTeX editor:
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="Download LaTeX">
            <IconButton onClick={downloadCode} aria-label="Icon that lets you download the LaTeX code used.">
              <Download />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="Copy to Clipboard">
            <IconButton
              onClick={copyTextToClip}
              aria-label="Icon that lets you copy your LaTeX code to your clipboard"
            >
              <Assignment />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="Clear code. THIS WILL REMOVE WHAT YOU WROTE HERE">
            <IconButton onClick={clearCode} aria-label="Icon that clears the editor. Be careful.">
              <CleaningServices />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="Compile code">
            <IconButton
              aria-label="Icon that compiles your given LaTeX code"
              onClick={compileTeX}
            >
              <ArrowCircleRight />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      <AceEditor
        ref={aceRef}
        name="editor"
        mode="latex"
        value={input}
        onChange={onChange}
        theme="monokai"
        height="100dvh"
        width="50vw"
        fontSize="1.1rem"
        wrapEnabled
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snackMessage.startsWith("Failed: ") ? "error" : "success"}
          onClose={handleSnackClose}
        >
          <AlertTitle>
            {snackMessage.startsWith("Failed") ? "Error" : "Success"}
          </AlertTitle>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
