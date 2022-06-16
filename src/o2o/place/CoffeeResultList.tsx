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
import { CoffeeResultType, SellerType } from '../../../pages/o2o/place';
import AlertDialogSlide from './coffeeDetailDialog';
import ImagesDialog from './ImagesDialog';

type CoffeeResultListProps = {
  coffeeResults: CoffeeResultType[];
};

function CoffeeResultList({ coffeeResults }: CoffeeResultListProps) {
  const [coffeeDetail, setCoffeeDetail] = useState<CoffeeResultType>();
  const [open, setOpen] = React.useState(false);

  const [seller, setSeller] = React.useState<SellerType>();
  const [openImages, setOpenImages] = React.useState(false);

  const handleOpenImages = () => {
    setOpenImages(true);
  };

  const handleCloseImages = () => {
    setOpenImages(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageClick = (coffeeResult: CoffeeResultType) => {
    // open Dialog? image slide
    setSeller(coffeeResult.seller);
    handleOpenImages();
  };

  const handleTextClick = (coffeeResult: CoffeeResultType) => {
    setCoffeeDetail(coffeeResult);
    handleClickOpen();
  };

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
        <ListItem key={coffeeResult.id} alignItems="flex-start">
          <ListItemAvatar
            sx={{ marginRight: '1rem' }}
            onClick={() => handleImageClick(coffeeResult)}
          >
            <Avatar
              alt="Remy Sharp"
              src={coffeeResult.seller.placeImages[0]}
              sx={{ width: 96, height: 96 }}
              variant="rounded"
            />
          </ListItemAvatar>
          <ListItemText
            onClick={() => handleTextClick(coffeeResult)}
            primary={coffeeResult.seller.name}
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

      {coffeeDetail && (
        <AlertDialogSlide
          open={open}
          handleClose={handleClose}
          coffeeDetail={coffeeDetail}
        />
      )}

      {seller && (
        <ImagesDialog
          open={openImages}
          handleClose={handleCloseImages}
          seller={seller}
        />
      )}
    </List>
  );
}

export default CoffeeResultList;
