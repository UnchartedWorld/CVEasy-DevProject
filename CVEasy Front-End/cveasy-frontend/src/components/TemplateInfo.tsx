import * as React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TemplateInfo({data}: any) {
  const [open, setOpen] = React.useState(false);
  const navigation = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleLaTeXPass() {
    const code: string = data.themeFile;
    navigation('/ResumeCreation', {state: {texCode: code}}); 
  }


console.log("Passed data is = " + JSON.stringify(data))
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant={"h3"}
            component={"h1"}
            fontWeight={"bold"}>
            Theme Name:
          </Typography>
        </Grid>
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
            fontWeight={"bold"}>
              Creator: 
            </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant={"h4"}
            component={"h4"}
            color={"inherit"}>
              {data.createdByUsername}
            </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            component={"h5"}
            variant={"h5"}
            padding={"15px auto"}
            fontWeight={"bold"}>
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
        <Grid item xs={8} sm={7}>
          <Button variant="contained" onClick={handleLaTeXPass}>
            Use Template
          </Button>
        </Grid>
        <Grid item xs={4} sm={5}>
          <Button variant="contained" color="secondary" onClick={handleClickOpen}>View LaTeX code</Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"View source code"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {data.themeFile}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    </Box>
  );
}
