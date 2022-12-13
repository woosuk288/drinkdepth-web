import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { THEME_PRIMARY_COLOR, THEME_SEPERATOR } from 'src/theme';

import packageJson from 'package.json';
import CommonDialog from 'src/common/CommonDialog';
import { useQueryClient } from 'react-query';
import { logoutKakao } from 'src/firebase/services';
import { useState } from 'react';

function Settings() {
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logoutKakao().then(() => queryClient.removeQueries());
  };

  const [openLogout, setOpenLogout] = useState(false);

  return (
    <>
      <List>
        <ListItemButton
          onClick={() => setOpenLogout(true)}
          sx={{
            borderBottom: `1px solid ${THEME_SEPERATOR}`,
          }}
        >
          <ListItemText primary="로그아웃" />
          <NavigateNextIcon />
        </ListItemButton>

        {/* <div style={{ height: '3rem', backgroundColor: THEME_BG_SECONDARY }} /> */}
        {/* <ListSubheader component="div" id="version-info">
          버전 {packageJson.version}
        </ListSubheader> */}
      </List>

      {/* 로그아웃 팝업 */}
      <CommonDialog
        open={openLogout}
        handleClose={() => setOpenLogout(false)}
        title="로그아웃할까요?"
        textSecondary="로그아웃"
        handleSecondary={handleLogout}
      />
    </>
  );
}
export default Settings;
