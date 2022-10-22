import { Box, List, SxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import CategoryTabs from './CategoryTabs';
import Menu from './Menu';

export type CafeMenusProps = {
  menus: CafeMenuType[];
  sx?: SxProps;
};

function Menus({ menus, sx }: CafeMenusProps) {
  const router = useRouter();
  const initialTabIndex = parseInt(
    (router.query.index as string | undefined) ?? '2',
    10
  );

  const [filteredMenus, setFilteredMenus] = useState(menus);
  const [tabIndex, setTabIndex] = React.useState(initialTabIndex);

  const handleTabChange = (
    _event: React.SyntheticEvent | null,
    newValue: number
  ) => {
    setTabIndex(newValue);

    if (newValue === 0) {
      setFilteredMenus(menus);
    } else {
      const categoryValue = categories[newValue].value;
      const menusByCategory = menus.filter(
        (cafemenu) => cafemenu.category === categoryValue
      );
      setFilteredMenus(menusByCategory);

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

  useEffect(() => {
    if (categories.length > 0) {
      handleTabChange(null, initialTabIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

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
