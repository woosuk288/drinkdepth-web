import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

function Menu() {
  const router = useRouter();
  console.log('path : ', router.asPath);

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
      }}
    >
      {testMenuData.map((item) => (
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
              alt="Remy Sharp"
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
            // secondary={

            // }
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
              {item.description}
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
              {item.labels.map((label) => label + ' ')}
            </Typography>

            <Typography variant="subtitle2" sx={{ color: 'red' }}>
              {item.price.toLocaleString()}
            </Typography>
          </ListItemText>
        </ListItem>
      ))}

      {/* <Divider variant="inset" component="li" /> */}
    </List>
  );
}
export default Menu;

export const testMenuData = [
  {
    cafeId: '1',
    id: '1',
    name: '라임블라썸',
    description:
      '라임쥬스와 벚꽃시럽, 탄산수, 라임슬라이스가 올라간 시원함 여름 에이드 테스트입니다 테스트입니다 테스트입니다',
    labels: ['수제', '바닐라시럽', '우유', '에스프레소'],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 6000,
  },
  {
    cafeId: '1',
    id: '2',
    name: '라임블라썸2',
    description:
      '라임쥬스와 벚꽃시럽, 탄산수, 라임슬라이스가 올라간 시원함 여름 에이드 테스트입니다 테스트입니다 테스트입니다',
    labels: ['수제', '바닐라시럽', '우유', '에스프레소'],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 6000,
  },
  {
    cafeId: '1',
    id: '3',
    name: '라임블라썸3',
    description:
      '라임쥬스와 벚꽃시럽, 탄산수, 라임슬라이스가 올라간 시원함 여름 에이드 테스트입니다 테스트입니다 테스트입니다',
    labels: ['수제', '바닐라시럽', '우유', '에스프레소'],
    imageURL:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    price: 6000,
  },
];
