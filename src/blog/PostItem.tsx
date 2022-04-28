import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Posts_posts_posts } from '../../apollo/__generated__/Posts';

type PostItemProps = Posts_posts_posts & { link: string; priority: boolean };

function PostItem({
  name,
  publish_date,
  tags,
  image_url,
  link,
  content,
  priority,
}: PostItemProps) {
  const router = useRouter();

  return (
    <Card
      sx={{
        maxWidth: 360,
        width: '100%',
        position: 'relative',
        '&::after': { content: '""', display: 'block', paddingBottom: '100%' },
      }}
    >
      <CardActionArea
        onClick={() => router.push(`/blog/${link}`)}
        sx={{ position: 'absolute', width: '100%', height: '100%' }}
      >
        <Box borderRadius="10px 10px 0 0">
          <Image
            priority={priority}
            src={image_url}
            layout="fill"
            objectFit="cover"
            sizes="30vw"
            alt={`이미지_${name}`}
          />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background:
              'linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 22.27%)',
          }}
        ></Box>

        <CardContent
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 16,
            color: '#fff',
            padding: 0,
          }}
        >
          {/* <Typography variant="h6" height={60} lineHeight="1.3">
            {name}
          </Typography> */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" component="span" fontWeight={600}>
              {tags.map((t) => `#${t}`).join(' ')}
            </Typography>
            {/* <Typography variant="subtitle2" component="span">
              {new Date(publish_date).toLocaleDateString()}
            </Typography> */}
          </Box>
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
