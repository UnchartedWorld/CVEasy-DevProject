import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CommentSection from "components/CommentSectionComponent";
import TemplateInfo from "components/TemplateInfo";
import { useEffect, useState } from "react";

export default function TemplateView() {
  const [themeData, setThemeData] = useState();
  const { state } = useLocation();
  const themeID = state.themeId;

  useEffect(() => {
    axios.get(`api/Themes/${themeID}`).then((response) => {
      setThemeData(response.data.data);
    });
  }, []);

  if (!themeData) return null;

  return (
    <Grid container component={"main"} spacing={2} padding={"3rem"}>
      <Container>
        <Grid item xs={12}>
          <TemplateInfo data={themeData} />
        </Grid>
        {/* <Grid item xs={12} sx={{ paddingTop: "10rem" }}> */}
        {/*   <CommentSection data={themeData} /> */}
        {/* </Grid> */}
      </Container>
    </Grid>
  );
}
