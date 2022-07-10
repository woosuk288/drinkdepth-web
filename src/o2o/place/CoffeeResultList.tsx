import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { CoffeeResultType } from '../../../pages/o2o/place';
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
        maxWidth: 360,
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
      {coffeeResults.map((coffeeResult) => (
        <ListItem
          key={coffeeResult.id + coffeeResult.branch.address}
          alignItems="flex-start"
        >
          <ListItemAvatar
            sx={{ marginRight: '1rem' }}
            onClick={() => handleImageClick(coffeeResult)}
          >
            <Avatar
              alt="Remy Sharp"
              src={
                coffeeResult.branch.images.length > 0
                  ? coffeeResult.branch.images[0]
                  : coffeeResult.seller.logoURLs['origin']
              }
              sx={{ width: 96, height: 96 }}
              variant="rounded"
            />
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

      {/* <Divider variant="inset" component="li" /> */}
    </List>
  );
}

export default CoffeeResultList;
