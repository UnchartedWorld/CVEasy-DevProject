import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { brandPrimary } from "CustomColors";

export default function UploadGuidelines() {
  return (
    <Grid
      container
      component={"section"}
      marginTop={"0.5rem"}
      sx={{
        backgroundColor: brandPrimary[100],
        minHeight: "80dvh",
        padding: "2rem",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h1" component={"h1"} sx={{ fontSize: "4rem", fontWeight: "bold"}} >
          Upload a theme
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2" component={"h2"} sx={{ fontSize: "2rem" }}>
          Upload guidelines:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <List>
          <ListItem>
            <ListItemText
              primary="- It must be a TeX file."
              secondary="Otherwise, it won't actually work."
            ></ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText
              primary="- It should NOT utilise images."
              secondary="With the nature of this website, images wouldn't work."
            ></ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText
              primary="- The description, tags and other website-based info must be appropriate"
              secondary="No racism, discrimination or insults, otherwise expect your template to be removed."
            ></ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText
              primary="- It should contain the suggested keywords seen below."
              secondary="You don't need them, but it helps users."
            ></ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText
              primary="- It should be as concise as possible."
              secondary="Comments are okay, but keep the code brief where reasonable."
            ></ListItemText>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}
