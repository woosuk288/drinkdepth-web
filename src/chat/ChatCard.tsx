import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ChatCard() {
  return (
    <Card sx={{ maxWidth: { xs: 300, sm: 360 }, marginLeft: 'auto' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="280"
        image="https://d2wosiipoa41qn.cloudfront.net/hXpgS_Icj7KHuRglb7Rf3Nunkts=/650x650/s3.ap-northeast-2.amazonaws.com/koke-uploads/images/20210910/858536d69cd94a32b95cfa39db31b4e0.png"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          날아올라
        </Typography>
        <Typography variant="body2" color="text.secondary">
          수량 : 1kg x 1개 <br />
          가격 : 33,000원
          <br />
          주문번호 : 11029384756
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">주문내역 확인</Button>
      </CardActions>
    </Card>
  );
}
