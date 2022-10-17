import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

type CategoryTabsProps = {
  categories: {
    label: string;
    value: string;
  }[];

  tabIndex: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
};

export default function CategoryTabs({
  categories,
  tabIndex,
  handleTabChange,
}: CategoryTabsProps) {
  // const [value, setValue] = React.useState(0);

  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="scrollable auto tabs example"
      >
        {categories.map((category) => (
          <Tab key={category.label} label={category.label} />
        ))}
        {/* <Tab label="Item Two" />
        <Tab label="Item Three" />
        <Tab label="Item Four" />
        <Tab label="Item Five" />
        <Tab label="Item Six" />
        <Tab label="Item Seven" /> */}
      </Tabs>
    </Box>
  );
}
