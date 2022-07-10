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
import React, { useMemo, useState } from 'react';
import {
  CafeMenuCategoryType,
  CafeMenusProps,
  CafeMenuType,
} from '../util/types';
import CategoryTabs from './CategoryTabs';

function Menus({ cafeMenus }: CafeMenusProps) {
  const router = useRouter();
  console.log('path : ', router.asPath);
  const [filteredMenus, setFilteredMenus] = useState(cafeMenus);

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);

    if (newValue === 0) {
      setFilteredMenus(cafeMenus);
    } else {
      const categoryValue = categories[newValue].value;
      const menusByCategory = cafeMenus.filter(
        (cafemenu) => cafemenu.category === categoryValue
      );
      setFilteredMenus(menusByCategory);
    }
  };

  const categories = useMemo(() => {
    const initialCategories = [{ label: '전체', value: '전체' }];

    return cafeMenus.reduce((pre, cur) => {
      let nextList: CafeMenuCategoryType[] = [...pre];
      if (pre.some((p) => p.value === cur.category) === false) {
        nextList.push({
          label: cur.category,
          value: cur.category,
        });
      }
      return nextList;
    }, initialCategories as CafeMenuCategoryType[]);
  }, [cafeMenus]);

  return (
    <>
      <Typography
        variant="h6"
        fontWeight="bold"
        align="center"
        sx={{ marginTop: '2rem' }}
      >
        메뉴
      </Typography>

      <CategoryTabs
        categories={categories}
        tabIndex={tabIndex}
        handleTabChange={handleTabChange}
      />

      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
        }}
      >
        {/* <ListSubheader>

      </ListSubheader> */}
        {filteredMenus.map((item) => (
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
    </>
  );
}
export default Menus;
