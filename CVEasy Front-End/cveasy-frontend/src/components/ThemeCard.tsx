import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard(props: {
  img: any;
  cardTitle: String;
  cardDescription: String;
}) {
  const { img, cardTitle, cardDescription } = props;

  return (
      <Card sx={{ minWidth: 200, margin: 5, backgroundColor: "#f1f6ec" }}>
        <CardActionArea href="/TemplateView">
          <CardMedia
            component="img"
            height="235"
            image={img}
            alt="Image containing stuff"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {cardTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {cardDescription}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
  );
}
