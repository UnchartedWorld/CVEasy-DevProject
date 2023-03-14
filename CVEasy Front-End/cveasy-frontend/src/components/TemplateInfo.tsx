import * as React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
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

export default function TemplateInfo() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant={"h3"}
            component={"h1"}
            align={"left"}
            color={"inherit"}
            padding={"15px auto"}
          >
            Theme title
          </Typography>
        </Grid>
        <Grid item xs={6} sm={5} md={3}>
          {/* I need to make sure this re-routes to the right page and sends the theme ID, else we can't copy the LaTeX code */}
          <Button variant="contained" component={Link} to="/ResumeCreation">
            Use Template
          </Button>
        </Grid>
        <Grid item xs={6} sm={5} md={3}>
          <Button variant="outlined" onClick={handleClickOpen}>View LaTeX code</Button>
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
                \document[a4paper, test]
                other stuff
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Grid>

        <Grid item xs={12}>
          <Typography
            component={"p"}
            align={"left"}
            color={"inherit"}
            padding={"15px auto"}
          >
            Theme description.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
