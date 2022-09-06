import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

import { useRouter } from 'next/router';
import { useLayoutEffect, useState } from 'react';
import { getLabelWithColor, getTestType } from '../utils/combos';
import { CafeMenuType } from '../utils/types';

function Menu(item: CafeMenuType) {
  const router = useRouter();

  const [isSmartMenu, setIsSmartMenu] = useState(false);

  useLayoutEffect(() => {
    const isSmart = getTestType() === 'smart';
    setIsSmartMenu(isSmart);
  }, []);

  return (
    <ListItem
      key={item.id}
      alignItems="flex-start"
      onClick={() =>
        router.push({
          pathname: `${router.asPath}/menu/${item.id}`,
        })
      }
    >
      {/* <IconButton sx={{ position: 'absolute', left: 0, zIndex: 100 }}>
        <FavoriteBorderIcon />
      </IconButton> */}
      <ListItemAvatar sx={{ marginRight: '1rem' }}>
        <Avatar
          alt={item.name}
          src={item.imageURL}
          sx={{ width: 96, height: 96 }}
          variant="rounded"
        />
      </ListItemAvatar>
      <ListItemText<'div', 'div'>
        sx={{
          '& .MuiListItemText-primary': {
            fontWeight: 'bold',
            marginBottom: '0.35em',
          },
        }}
        // primary={item.name}
        // secondary={}
      >
        <Typography fontWeight={'bold'} gutterBottom>
          {item.name}
        </Typography>
        <Typography noWrap variant="body2" gutterBottom>
          {isSmartMenu && item.description}
        </Typography>

        <Typography
          sx={{
            display: 'block',
            '> span ': {
              marginRight: '2px',
              color: '#fff',
              padding: '2px',
              borderRadius: '2px',
            },
          }}
          component="span"
          variant="body2"
          // color="text.primary"
          // color="inherit"
          fontWeight="bold"
          gutterBottom
        >
          {isSmartMenu &&
            item.labels.map((label) => (
              <span
                key={label}
                style={{
                  backgroundColor: getLabelWithColor(label).color,
                }}
              >
                {label}
              </span>
            ))}
        </Typography>

        <Typography variant="subtitle2" gutterBottom sx={{ color: 'red' }}>
          {item.price.toLocaleString()}
        </Typography>
      </ListItemText>
    </ListItem>
  );
}
export default Menu;
