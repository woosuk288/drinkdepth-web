import { Box, List, SxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import CategoryTabs from './CategoryTabs';
import Menu from './Menu';

export type CafeMenusProps = {
  menuCategories: CafeMenuCategoryType[];
  menus: CafeMenuType[];
  sx?: SxProps;
};

function Menus({ menuCategories, menus, sx }: CafeMenusProps) {
  const router = useRouter();
  const initialTabIndex = parseInt(
    (router.query.index as string | undefined) ?? '0',
    10
  );

  const [filteredMenus, setFilteredMenus] = useState(menus);
  const [tabIndex, setTabIndex] = React.useState(initialTabIndex);

  // TODO: tab index 0 안됨
  // scoroll y hook

  const handleTabChange = (
    _: React.SyntheticEvent | null,
    newValue: number
  ) => {
    if (menuCategories.length === 0) {
      setFilteredMenus(menus);
    } else {
      setTabIndex(newValue);

      const categoryValue = menuCategories[newValue].value;
      const menusByCategory = menus.filter((cafemenu) =>
        cafemenu.categories.includes(categoryValue)
      );
      const sortedMenus = menusByCategory.slice().sort((a, b) => {
        if (a.categories.length !== a.categorySeqs.length) {
          return 1;
        } else if (b.categories.length !== b.categorySeqs.length) {
          return -1;
        } else {
          const idx = a.categories.findIndex((c) => c === categoryValue);
          const seq = a.categorySeqs[idx];

          const idx2 = b.categories.findIndex((c) => c === categoryValue);
          const seq2 = b.categorySeqs[idx2];
          return seq < seq2 ? -1 : 1;
        }
      });
      setFilteredMenus(sortedMenus);

      router.push(
        {
          pathname: router.pathname,
          query: { cafe_id: router.query.cafe_id, index: newValue },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  useEffect(() => {
    if (menuCategories.length > 0) {
      handleTabChange(null, initialTabIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuCategories]);

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

      {menuCategories.length > 0 && (
        <CategoryTabs
          categories={menuCategories}
          tabIndex={tabIndex}
          handleTabChange={handleTabChange}
        />
      )}

      <List
        sx={{
          width: '100%',
          minHeight: '100vh',
          bgcolor: 'background.paper',
          '& > li': {
            borderBottom: '1px solid #ededed',
            cursor: 'pointer',
          },
        }}
      >
        {/* <ListSubheader>

      </ListSubheader> */}
        {filteredMenus.map((item, i) => (
          <Menu key={item.id} item={item} index={i} />
        ))}

        {/* <Divider variant="inset" component="li" /> */}
      </List>
    </Box>
  );
}
export default Menus;
