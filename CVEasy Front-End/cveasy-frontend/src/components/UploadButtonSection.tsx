import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { brandPrimary } from "CustomColors";
import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function UploadButtonSection() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [version, setVersion] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const token = Cookies.get("token");
  const userID = Cookies.get("userID") || "";

  const navigateTo = useNavigate();

  async function handleUpload(event: any) {
    event.preventDefault();

    try {
      if (userID != null || (userID != "" && file)) {
        const uploadFormData = new FormData();
        uploadFormData.append("UserID", userID);
        uploadFormData.append("ThemeTitle", title);
        uploadFormData.append("ThemeDescr", description);
        uploadFormData.append("ThemeVersion", version);
        if (file instanceof File) {
          uploadFormData.append("File", file);
        }

        const headers: any = {};
        if (userID) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        setLoading(true);
        setDisabledButton(true);

        axios.post("api/Themes/UploadTemplate", uploadFormData, {
          headers: headers,
        });

        navigateTo("/Templates");
        window.location.reload();
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setLoading(false);
      }
      const errorMessage =
        error.response?.data ||
        "An error has occurred, likely to do with inputs";
      setError(errorMessage);
      setDisabledButton(false);
      setLoading(false);
    }
  }

  function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const fileToUpload = event.target.files[0];
      const texRegex = /(\.tex)$/i;

      if (!texRegex.exec(fileToUpload.name)) {
        setError("Please upload a .tex file");
        setFile(null);
        setDisabledButton(true);
      } else {
        setFile(event.target.files[0]);
        setError("");
        setDisabledButton(!title || !description || !version || !event.target.files)
      }
    }
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputTitle = event.target.value;
    setTitle(inputTitle);
    setDisabledButton(!event.target.value || !description || !version || !file)
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputDescription = event.target.value;
    setDescription(inputDescription);
    setDisabledButton(!event.target.value || !title || !version || !file)
  }

  function handleVersionChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputVersion = event.target.value;
    setVersion(inputVersion);
    setDisabledButton(!event.target.value || !description || !title || !file)
  }

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
          Fill in your template's details, upload the TeX file and submit it.
          And thank you for uploading another useful template!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          component={"h4"}
          sx={{ fontSize: "1.25rem", paddingBottom: "0.5rem" }}
        >
          Enter title
        </Typography>
        <TextField
          id="templateTitle"
          name="templateTitle"
          fullWidth
          label="Enter template title"
          variant="outlined"
          required
          aria-required
          onChange={handleTitleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          component={"h4"}
          sx={{ fontSize: "1.25rem", paddingBottom: "0.5rem" }}
        >
          Enter description
        </Typography>
        <TextField
          id="templateDescription"
          name="templateDescription"
          fullWidth
          label="Enter template description"
          variant="outlined"
          required
          aria-required
          onChange={handleDescriptionChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          component={"h4"}
          sx={{ fontSize: "1.25rem", paddingBottom: "0.5rem" }}
        >
          Enter version
        </Typography>
        <TextField
          id="templateVersion"
          name="templateVersion"
          label="Enter template version"
          variant="outlined"
          required
          aria-required
          onChange={handleVersionChange}
          sx={{ my: 2 }}
        />
      </Grid>
      <Grid item xs={10}>
        <Button
          variant="contained"
          color="secondary"
          component="label"
          aria-label="Button that allows you to upload TeX files."
          sx={{ mt: 2, mb: 2 }}
        >
          Upload TeX file
          <input
            hidden
            required
            aria-required
            accept=".tex"
            onChange={handleFileInput}
            type={"file"}
          />
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          aria-label="Button that allows you submit template details and file."
          onClick={handleUpload}
          type="submit"
          disabled={disabledButton}
        >
          Submit
        </Button>
      </Grid>
      {error && <Alert severity="error">{error}</Alert>}
      {loading && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme: any) => theme.zIndex.drawer + 1,
          }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Grid>
  );
}
