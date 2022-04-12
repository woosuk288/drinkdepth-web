import { IconButton, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function ChatSearch() {
  return (
    <TextField
      size="small"
      fullWidth
      name="teafasfeasda"
      placeholder="대화 내용, 닉네임, 태그 검색"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end">
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default ChatSearch;
