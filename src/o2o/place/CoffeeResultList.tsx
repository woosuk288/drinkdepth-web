import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import { CoffeeResultType } from '../../../pages/o2o/place';

type CoffeeResultListProps = {
  coffeeResults: CoffeeResultType[];
};

function CoffeeResultList({ coffeeResults }: CoffeeResultListProps) {
  const handleItemClick = (coffeeResult: CoffeeResultType) => {
    alert('로스터리명?, 주소?, 네이버, 티맵, 카카오 링크? 흠......');
  };

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        '& .MuiAvatar-root': { border: '0.1px solid' },
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
            primary={coffeeResult.name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'block' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {/* — {coffeeResult.characters.join(', ')} */}—{' '}
                  {coffeeResult.characters.map(
                    (character) => '#' + character + ' '
                  )}
                </Typography>
                <Typography variant="body2" component="span">
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
