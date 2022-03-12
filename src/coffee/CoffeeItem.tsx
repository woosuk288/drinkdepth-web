import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {
  Box,
  Button,
  CardActions,
  IconButton,
  SxProps,
  Theme,
} from '@mui/material';
// import { Link } from 'gatsby'

import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Coffee } from '../types';
import Image from 'next/image';
import { useRouter } from 'next/router';

type CoffeeItemProps = Coffee & {
  sxProps?: SxProps<Theme> | undefined;
};

function CoffeeItem({
  id,
  name,
  description,
  main_image,
  tags,
  sxProps,
}: CoffeeItemProps) {
  const router = useRouter();

  const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log('handleIconClick');
  };

  const handleCardClick = () => {
    router.push(`${router.pathname}/${id}`);
  };

  const handleTagClick = () => {
    console.log('handleTagClick');
  };
  return (
    <Card
      sx={{ maxWidth: 360, width: '100%', position: 'relative', ...sxProps }}
    >
      <Box
        component="article"
        sx={{ cursor: 'pointer' }}
        onClick={handleCardClick}
      >
        <Box position="relative" height={280} borderRadius="10px 10px 0 0">
          <Image
            src={main_image}
            layout="fill"
            objectFit="cover"
            alt={`${name}의 이미지`}
          />
        </Box>

        <IconButton
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
          }}
          onClick={handleIconClick}
        >
          <StarBorderIcon fontSize="large" />
        </IconButton>

        <CardContent>
          <Typography variant="h6" component="div" align="center" gutterBottom>
            {name}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          ></Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ height: 40 }}
          >
            {description.length > 50
              ? `${description.slice(0, 48)}...`
              : description}
          </Typography>
        </CardContent>
      </Box>
      <CardActions sx={{ justifyContent: 'center', whiteSpace: 'nowrap' }}>
        {tags.map((t) => (
          <Button key={t} size="small" color="inherit" onClick={handleTagClick}>
            #{t}
          </Button>
        ))}
      </CardActions>
    </Card>
  );
}

export default CoffeeItem;
