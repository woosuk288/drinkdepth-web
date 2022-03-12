import { Box, Chip } from '@mui/material';
import React from 'react';
import Link from 'next/link';
export type TagListProps = {
  selectedTag: string;
  tagList: {
    // 프로퍼티 이름은 문자열, 프로퍼티 값은 숫자임을 나타내는 타입 표기 방법
    [key: string]: number;
  };
};

// const TagChip = styled

function TagList({ selectedTag, tagList }: TagListProps) {
  return (
    <Box
      display={'flex'}
      flexWrap={'wrap'}
      justifyContent={'center'}
      paddingTop={3}
    >
      {Object.entries(tagList).map(([name, count]) => (
        <Link href={`/blog/?tag=${name}`} shallow={true}>
          <Chip
            component="a"
            key={name}
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
