import { IconButton } from '@mui/material';
import { Box } from '@mui/system';

function KakaoChat() {
  return (
    <Box
      component="a"
      href="https://pf.kakao.com/_ktxnJb/chat"
      target="_blank"
      sx={{
        boxShadow: 3,
      }}
      style={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        zIndex: 100,
        width: '60px',
        height: '60px',
        padding: '8px 6px 8px 10px',
        background: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '50%',
      }}
      rel="noreferrer"
    >
      <img
        src="/images/logo_icon.png"
        alt="1:1 채팅 문의"
        width="44px"
        height="44px"
      />
    </Box>
  );
}
export default KakaoChat;
