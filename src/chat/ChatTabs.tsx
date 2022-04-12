import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CoffeeIcon from '@mui/icons-material/Coffee';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

function ChatTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="icon label tabs example"
      sx={{ '.MuiTabs-flexContainer': { justifyContent: 'space-evenly' } }}
    >
      <Tab icon={<CoffeeIcon />} label="대기" />
      <Tab icon={<PeopleAltIcon />} label="진행중" />
      <Tab icon={<DoneOutlineIcon />} label="완료" />
    </Tabs>
  );
}

export default ChatTabs;
