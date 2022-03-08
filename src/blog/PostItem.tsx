import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { BlogEntry } from '../../pages/blog';
import { useRouter } from 'next/router';

type PostItemProps = BlogEntry & { link: string };

function PostItem({
  name,
  publish_date,
  tags,
  header_image,
  link,
  content,
}: PostItemProps) {
  const router = useRouter();

  return (
    <Card sx={{ maxWidth: 360, width: '100%' }}>
      <CardActionArea onClick={() => router.push(`/${link}`)}>
        <CardMedia
          sx={{ borderRadius: '10px 10px 0 0', height: 180 }}
          image={header_image}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography variant="subtitle2" component="span">
              {tags.join(' / ')}
            </Typography>
            <Typography variant="subtitle2" component="span">
              {publish_date}
            </Typography>
          </Typography>
          {/* <Typography
            variant="body2"
            color="text.secondary"
            sx={{ height: 60 }}
          >
            {summary.length > 80 ? `${summary.slice(0, 80)}}...` : summary}
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PostItem;
