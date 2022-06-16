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
import AlertDialogSlide from './coffeeDetailDialog';

type CoffeeResultListProps = {
  coffeeResults: CoffeeResultType[];
};

function CoffeeResultList({ coffeeResults }: CoffeeResultListProps) {
  const [coffeeDetail, setCoffeeDetail] = useState<CoffeeResultType>();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleItemClick = (coffeeResult: CoffeeResultType) => {
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
        <ListItem
          key={coffeeResult.id}
          alignItems="flex-start"
          onClick={() => handleItemClick(coffeeResult)}
        >
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src={coffeeResult.packageImageURLs['200x200']}
              sx={{ width: 48, height: 48 }}
            />
          </ListItemAvatar>
          <ListItemText
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
    </List>
  );
}

export default CoffeeResultList;
