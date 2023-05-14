import * as React from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useState } from "react";
import Cookies from "js-cookie";
import { MoreVert } from "@mui/icons-material";
import axios from "axios";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TemplateInfo({ data }: any) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [version, setVersion] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [menuAnchor, setMenuAnchor] = useState(null);

  const token = Cookies.get("token");
  const userID = Cookies.get("userID") || "";
  const themeUserId = data.createdByID;

  const navigation = useNavigate();

  async function handleTemplateUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const updateFormData = new FormData();
      updateFormData.append("UserID", userID);
      updateFormData.append("ThemeID", data.themeID);

      if (title !== null || title !== "") {
        updateFormData.append("ThemeName", title);
      }
      if (description !== null || description !== "") {
        updateFormData.append("ThemeDescr", description);
      }
      if (version !== null || version !== "") {
        updateFormData.append("Version", version);
      }
      if (file instanceof File) {
        updateFormData.append("File", file);
      }

      const headers: any = {};
      if (userID) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      axios.patch("api/Themes/UpdateTemplate", updateFormData, {
        headers: headers,
      });
      handleModalClose();
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          const errorMessage =
            error.response.data.message ||
            "An unknown error I didn't account for occurred.";
          setError(errorMessage);
        }
      }
    }
  }

  async function handleTemplateDelete() {
    try {
      if (data.themeID !== null || data.themeID !== "") {
        const headers: any = {};
        if (userID) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await axios.delete(`api/Themes/${data.themeID}`, {
          headers: headers,
        });

        if (response.status === 200) {
          handleDeleteModalClose();
          navigation("/Templates");
          window.location.replace("/Templates");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          const errorMessage =
            error.response.data.message ||
            "An unknown error I didn't account for occurred.";
          setError(errorMessage);
        }
      }
    }
  }

  function isUserCreator(): boolean {
    return userID.toString().trim() === themeUserId.toString().trim();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleMenuOpen(event: any) {
    setMenuAnchor(event.currentTarget);
  }

  function handleMenuClose() {
    setMenuAnchor(null);
  }

  function handleModalClickOpen() {
    handleMenuClose();
    setOpenModal(true);
  }

  function handleDeleteModalOpen() {
    handleMenuClose();
    setOpenDeleteModal(true);
  }

  function handleDeleteModalClose() {
    setOpenDeleteModal(false);
  }

  function handleModalClose() {
    setOpenModal(false);
  }

  function handleLaTeXPass() {
    const code: string = data.themeFile;
    navigation("/ResumeCreation", { state: { texCode: code } });
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputTitle = event.target.value;
    setTitle(inputTitle);
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputDescription = event.target.value;
    setDescription(inputDescription);
  }

  function handleVersionChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputVersion = event.target.value;
    setVersion(inputVersion);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const fileToUpdate = event.target.files[0];
      const texRegex = /(\.tex)$/i;

      if (!texRegex.exec(fileToUpdate.name)) {
        setError("Please upload a .tex file");
        setFile(null);
      } else {
        setFile(event.target.files[0]);
        setError("");
      }
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={isUserCreator() ? 11 : 12}>
          <Typography variant={"h3"} component={"h3"} fontWeight={"bold"}>
            Theme Name:
          </Typography>
        </Grid>
        {isUserCreator() && (
          <Grid item xs={1}>
            <Button onClick={handleMenuOpen}>
              <MoreVert />
            </Button>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleModalClickOpen}>Edit template</MenuItem>
              <MenuItem onClick={handleDeleteModalOpen} sx={{ color: "red" }}>
                Delete template
              </MenuItem>
            </Menu>
          </Grid>
        )}

        <Dialog open={openDeleteModal} onClose={handleDeleteModalClose}>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            Once deleted, you <b>cannot</b> retrieve the template without admin
            support. Please, ensure this is what you want.
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteModalClose}>Cancel</Button>
            <Button onClick={handleTemplateDelete} variant="contained">
              Delete template
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openModal} onClose={handleModalClose}>
          <DialogTitle>
            Edit Template. All fields are optional, so only update what you need
            to
          </DialogTitle>
          <form onSubmit={handleTemplateUpdate}>
            <DialogContent>
              <Typography variant={"h4"} component={"h4"} fontWeight={"bold"}>
                Enter Title:
              </Typography>
              <TextField
                fullWidth
                label="Template Title"
                value={title}
                onChange={handleTitleChange}
                sx={{ my: "16px !important" }}
              />
              <Typography variant={"h4"} component={"h4"} fontWeight={"bold"}>
                Enter Description:
              </Typography>
              <TextField
                fullWidth
                label="Template Description"
                value={description}
                onChange={handleDescriptionChange}
                sx={{ my: "16px !important" }}
              />
              <Typography variant={"h4"} component={"h4"} fontWeight={"bold"}>
                Upload Template:
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                component="label"
                aria-label="Button that allows you to upload TeX files."
                sx={{ my: "16px !important" }}
              >
                Upload TeX file
                <input
                  hidden
                  accept=".tex"
                  onChange={handleFileChange}
                  type={"file"}
                />
              </Button>
              <Typography variant={"h4"} component={"h4"} fontWeight={"bold"}>
                Enter Template Version:
              </Typography>
              <TextField
                fullWidth
                label="Template Version"
                value={version}
                onChange={handleVersionChange}
                sx={{ my: "16px !important" }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleModalClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Update Template
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Grid item xs={12}>
          <Typography
            variant={"h3"}
            component={"h1"}
            align={"left"}
            color={"inherit"}
            padding={"15px auto"}
          >
            {data.themeName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant={"h4"}
            component={"h4"}
            color={"inherit"}
            fontWeight={"bold"}
          >
            Creator:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant={"h4"} component={"h4"} color={"inherit"}>
            {data.createdByUsername}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            component={"h5"}
            variant={"h5"}
            padding={"15px auto"}
            fontWeight={"bold"}
          >
            Description:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            component={"p"}
            align={"left"}
            color={"inherit"}
            padding={"15px auto"}
          >
            {data.themeDescr}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            component={"h6"}
            variant={"h6"}
            padding={"15px auto"}
            fontWeight={"bold"}
          >
            Version:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            component={"p"}
            align={"left"}
            color={"inherit"}
            padding={"15px auto"}
          >
            {data.version}
          </Typography>
        </Grid>
        <Grid item xs={8} sm={7}>
          <Button variant="contained" onClick={handleLaTeXPass}>
            Use Template
          </Button>
        </Grid>
        <Grid item xs={4} sm={5}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
          >
            View LaTeX code
          </Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth
            maxWidth={"xl"}
          >
            <DialogTitle>{"View source code"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <pre>
                  <code>{data.themeFile}</code>
                </pre>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    </Box>
  );
}
