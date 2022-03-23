import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import { useRouter } from 'next/router';
import { BlogEntry } from '../types';
import Image from 'next/image';

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
      <CardActionArea onClick={() => router.push(`/blog/${link}`)}>
        <Box position="relative" height={180} borderRadius="10px 10px 0 0">
          <Image
            src={header_image}
            layout="fill"
            objectFit="cover"
            sizes="30vw"
            alt={`이미지_${name}`}
          />
        </Box>

        <CardContent>
          <Typography variant="h6" height={60} lineHeight="1.3">
            {name}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography variant="subtitle2" component="span">
              {tags.map((t) => `#${t}`).join(' ')}
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
