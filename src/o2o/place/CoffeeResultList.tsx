import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CoffeeResultType } from '../../../pages/o2o/place';
import LazyImage from '../../common/LazyImage';
import { getAddressXY } from '../../utils/kakaoAPI';
import AlertDialogSlide from './coffeeDetailDialog';
import ImagesDialog from './ImagesDialog';

type CoffeeResultListProps = {
  coffeeResults: CoffeeResultType[];
  handleImageClick: (coffeeResult: CoffeeResultType) => void;
  handleTextClick: (coffeeResult: CoffeeResultType) => void;
};

function CoffeeResultList({
  coffeeResults,
  handleImageClick,
  handleTextClick,
}: CoffeeResultListProps) {
  // const [open, setOpen] = React.useState(false);
  const [coffees, setCoffees] = useState(coffeeResults.slice(0, 5));

  // useEffect(() => {
  //   if (coffeeResults.length > 0) {
  //     setCoffees(coffeeResults.slice(0, 5));
  //   }
  // }, [coffeeResults]);

  const handleMore = () => {
    const len = coffees.length;
    const nextCoffees = coffeeResults.slice(0, len + 10);
    setCoffees(nextCoffees);
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <List
      sx={{
        width: '100%',
        // maxWidth: 360,
        bgcolor: 'background.paper',
        '& .MuiAvatar-root': { border: '0.1px solid' },
        '& .MuiTypography-root': {
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        },
        '& .MuiListItemText-primary': {
          fontWeight: 'bold',
        },
      }}
    >
      {coffees.map((coffeeResult) => (
        <ListItem
          key={coffeeResult.id + coffeeResult.branch.address}
          alignItems="flex-start"
        >
          <ListItemAvatar
            sx={{ marginRight: '1rem' }}
            onClick={() => handleImageClick(coffeeResult)}
          >
            <Box sx={{ width: 96, height: 96 }}>
              <LazyImage
                src={
                  coffeeResult.branch.images.length > 0
                    ? coffeeResult.branch.images[0]
                    : coffeeResult.seller.logoURLs['origin']
                }
                alt={coffeeResult.branch.name}
                style={{ borderRadius: '0.25rem' }}
              />
            </Box>
          </ListItemAvatar>
          <ListItemText
            onClick={() => handleTextClick(coffeeResult)}
            primary={coffeeResult.branch.name}
            secondary={
              <React.Fragment>
                <Typography component="span">{coffeeResult.name}</Typography>

                <Typography
                  sx={{ display: 'block' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {coffeeResult.characters.map(
                    (character) => '#' + character + ' '
                  )}
                </Typography>
                <Typography
                  variant="body2"
                  component="span"
                  color="text.primary"
                >
                  {coffeeResult.flavors.map((flavor) => '#' + flavor + ' ')}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      ))}

      {coffees.length !== coffeeResults.length && (
        <Box sx={{ margin: '0.5rem 1rem 3rem' }}>
          <Button
            variant="outlined"
            size="large"
            fullWidth
            onClick={handleMore}
          >
            더 보기
          </Button>
        </Box>
      )}

      {/* <Divider variant="inset" component="li" /> */}
    </List>
  );
}

export default CoffeeResultList;
