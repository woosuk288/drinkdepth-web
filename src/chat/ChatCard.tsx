import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ChatCard() {
  return (
    <Card sx={{ maxWidth: 360, marginLeft: 'auto' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="280"
        image="https://d2wosiipoa41qn.cloudfront.net/hXpgS_Icj7KHuRglb7Rf3Nunkts=/650x650/s3.ap-northeast-2.amazonaws.com/koke-uploads/images/20210910/858536d69cd94a32b95cfa39db31b4e0.png"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
