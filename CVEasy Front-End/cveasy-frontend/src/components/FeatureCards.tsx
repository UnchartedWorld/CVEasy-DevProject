import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export default function FeatureCards(props: {
    img: any;
    cardTitle: String;
    cardDescription: String;
})
{
const { img, cardTitle, cardDescription } = props;
  return (
    <Card sx={{ maxWidth: 350 }}>
        <CardMedia
          component="img"
          height="160"
          image={img}
          title={"Image utilised for the "  + cardTitle + " card."}
          alt={"Image utilised for the "  + cardTitle + " card."}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="h3" sx={{ fontSize: "1.5rem"}}>
            {cardTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cardDescription}
          </Typography>
        </CardContent>
    </Card>
  );
}