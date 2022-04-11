import { Box, Chip } from '@mui/material';
import React from 'react';
import Link from 'next/link';
export type TagListProps = {
  selectedTag: string;
  tagList: {
    // 프로퍼티 이름은 문자열, 프로퍼티 값은 숫자임을 나타내는 타입 표기 방법
    [key: string]: number;
  };
  path: string;
};

// const TagChip = styled

function TagList({ selectedTag, tagList, path }: TagListProps) {
  return (
    <Box
      display={'flex'}
      flexWrap={'wrap'}
      justifyContent={'center'}
      paddingTop={3}
    >
      {Object.entries(tagList).map(([name, count]) => (
        <Link href={`/${path}/?tag=${name}`} shallow={true} key={name}>
          <Chip
            component="a"
            label={`#${name} ${count}`}
            variant="outlined"
            clickable
            color={name === selectedTag ? 'primary' : 'default'}
            sx={{ margin: '4px' }}
          />
        </Link>
      ))}
    </Box>
  );
}

export default TagList;
