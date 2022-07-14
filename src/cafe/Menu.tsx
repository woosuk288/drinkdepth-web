import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { getTestType } from '../utils/combos';
import { CafeMenuType } from '../utils/types';

function Menu(item: CafeMenuType) {
  const router = useRouter();

  const isSmart = getTestType() === 'smart';

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
        <Typography
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
          }}
          variant="subtitle2"
          gutterBottom
        >
          {isSmart && item.description}
        </Typography>

        <Typography
          sx={{ display: 'block' }}
          component="span"
          variant="body2"
          // color="text.primary"
          color={'primary'}
          fontWeight="bold"
          gutterBottom
        >
          {isSmart && item.labels.map((label) => label + ' ')}
        </Typography>

        <Typography variant="subtitle2" sx={{ color: 'red' }}>
          {item.price.toLocaleString()}
        </Typography>
      </ListItemText>
    </ListItem>
  );
}
export default Menu;
