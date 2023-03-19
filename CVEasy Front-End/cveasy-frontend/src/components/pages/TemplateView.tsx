import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import CommentSection from "components/CommentSectionComponent";
import TemplateInfo from "components/TemplateInfo";
import data from "./Templates";

export default function TemplateView() {
  return (
    <Grid container component={"main"} spacing={2} padding={"3rem"}>
      <Container>
        <Grid item xs={6}>
          <TemplateInfo />
        </Grid>

        <Grid item xs={6}>
          <Box
            height={"100%"}
            width={"100%"}
            component="img"
            padding={4}
            alt="Stuff"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.kinja-img.com%2Fgawker-media%2Fimage%2Fupload%2Fs--KqMl6Djd--%2Fc_fill%2Cfl_progressive%2Cg_center%2Ch_900%2Cq_80%2Cw_1600%2F18mib01sr6u5ejpg.jpg&f=1&nofb=1&ipt=afbe8aa7e3ba83c9de26f66e12026bfb31931224c0ac4df7ca70dcd7049dfc88&ipo=images"
          />
        </Grid>
        <Grid item xs={12} sx={{ paddingTop: "10rem"}}>
          <CommentSection />
        </Grid>
      </Container>
    </Grid>
  );
}
