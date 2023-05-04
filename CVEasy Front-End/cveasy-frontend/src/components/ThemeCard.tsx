import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function ActionAreaCard(props: {
  themeId: number;
  cardImg: any;
  cardTitle: String;
  cardDescription: String;
  themeCreator: String;
}) {
  const { themeId, cardImg, cardTitle, cardDescription, themeCreator } = props;
  const navigation = useNavigate();

  function handleCardClick() {
    navigation("/TemplateView", { state: { themeId: themeId } });
  }

  return (
    <Card sx={{ minWidth: 200, margin: 5, backgroundColor: "#f1f6ec" }}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          height="235"
          image={cardImg}
          alt="A placeholder image for templates"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {cardTitle}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {themeCreator}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cardDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
