import { useQuery } from '@apollo/client';
import { LinearProgress } from '@mui/material';
import React from 'react';
import { BOOKMARKS_QUERY } from '../../apollo/queries';
import { bookmarks } from '../../apollo/__generated__/bookmarks';
import { PostListWrapper } from '../blog/PostList';
import CoffeeItem from '../coffee/CoffeeItem';

function BookmarkList() {
  const { data, loading, error } = useQuery<bookmarks>(BOOKMARKS_QUERY);

  // if(loading) return <LinearProgress />
  // const bookmarks = data.bookmarks.bookmarks;

  if (loading) return <LinearProgress />;

  return (
    <PostListWrapper>
      {data?.bookmarks.bookmarks?.map((bookmark) => (
        <CoffeeItem
          {...bookmark}
          id={bookmark.product_id}
          key={bookmark.id}
          isSaved={true}
        />
      ))}
    </PostListWrapper>
  );
}

export default BookmarkList;
