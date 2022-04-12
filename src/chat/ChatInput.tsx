import { IconButton, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';

function ChatInput() {
  return (
    <TextField
      size="small"
      fullWidth
      name="cacaiaaici"
      placeholder="채팅 내용 입력"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AddIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end">
              <SendIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default ChatInput;
