import { Box, List, SxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import CategoryTabs from './CategoryTabs';
import Menu from './Menu';

export type CafeMenusProps = {
  menus: CafeMenuType[];
  sx?: SxProps;
};

function Menus({ menus, sx }: CafeMenusProps) {
  const router = useRouter();
  const [filteredMenus, setFilteredMenus] = useState(menus);
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);

    if (newValue === 0) {
      setFilteredMenus(menus);
    } else {
      const categoryValue = categories[newValue].value;
      const menusByCategory = menus.filter(
        (cafemenu) => cafemenu.category === categoryValue
      );
      setFilteredMenus(menusByCategory);
    }
  };

  const categories = useMemo(() => {
    const initialCategories = [{ label: '전체', value: '전체' }];

    return menus.reduce((pre, cur) => {
      let nextList: CafeMenuCategoryType[] = [...pre];
      if (pre.some((p) => p.value === cur.category) === false) {
        nextList.push({
          label: cur.category,
          value: cur.category,
        });
      }
      return nextList;
    }, initialCategories as CafeMenuCategoryType[]);
  }, [menus]);

  return (
    <Box sx={sx}>
      <Typography
        variant="h6"
        fontWeight="bold"
        align="center"
        sx={{ marginTop: '2rem', marginBottom: '1.5rem' }}
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
          '& > li': {
            borderBottom: '1px solid #ededed',
            cursor: 'pointer',
          },
        }}
      >
        {/* <ListSubheader>

      </ListSubheader> */}
        {filteredMenus.map((item) => (
          <Menu key={item.id} {...item} />
        ))}

        {/* <Divider variant="inset" component="li" /> */}
      </List>
    </Box>
  );
}
export default Menus;
