import * as React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Layout from '../../src/Layout';
import PostList from '../../src/community/PostList';
import Meta from '../../src/Meta';
import { apiPost } from '../../apollo/SSG';
import TagList, { TagListProps } from '../../src/blog/TagList';
import { useRouter } from 'next/router';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { Posts_posts_posts } from '../../apollo/__generated__/Posts';
import { Box, Fab, IconButton } from '@mui/material';
import PopularPost from '../../src/community/PopularPostList';

import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const metaData = {
  title: '깊이를 마시다. 커뮤니티',
  description: '음료에 관한 이야기를 나눠보세요.',
  image: '/images/logo_icon.png',
  canonical: 'community',
  type: 'blog',
};

export type CommunityProps = {
  posts: Posts_posts_posts[];
};

const Community: NextPage<CommunityProps> = ({ posts }) => {
  const router = useRouter();

  const parsed = router.query;
  const selectedTag: string =
    typeof parsed.tag !== 'string' || !parsed.tag ? 'All' : parsed.tag;

  const tagList = React.useMemo(
    () =>
      posts.reduce(
        (list: TagListProps['tagList'], cur) => {
          cur.tags.forEach((tag) => {
            if (list[tag] === undefined) list[tag] = 1;
            else list[tag]++;
          });

          list['All']++;

          return list;
        },
        { All: 0 }
      ),
    []
  );

  return (
    <Layout>
      <Meta data={metaData} />

      <Box marginTop={{ xs: '1rem', md: '2rem' }}></Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <PopularPost tableTitle="조회수" />
        <Box sx={{ margin: { sm: '1rem' } }}></Box>
        <PopularPost tableTitle="추천수" />
      </Box>

      <Box marginY="1rem">
        <TagList selectedTag={selectedTag} tagList={tagList} path="community" />
      </Box>
      <PostList />
      {/* <PostList selectedTag={selectedTag} posts={posts} /> */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', right: 20, bottom: 20 }}
      >
        <AddIcon />
      </Fab>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // console.log('Community getStaticProps ', process.env.NEXT_PHASE);

  // const posts = await apiPost.list();

  // if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
  //   await apiPost.cache.set(posts);
  // }

  const posts = [
    {
      id: 'a',
      name: '혹시 이투이 카페에서 일해 보신분 계신가요?',
      image_url: '',
      content: '내용 없음',
      tags: ['잡담'],
      created_at: new Date().toISOString(),
      created_by: '익명',
      read_count: 10,
      like: 0,
    },
    {
      id: 'a',
      name: '혹시 이투이 카페에서 일해 보신분 계신가요?',
      image_url: '',
      content: '내용 없음',
      tags: ['후기'],
      created_at: new Date().toISOString(),
      created_by: '익명',
      read_count: 10,
      like: 0,
    },
    {
      id: 'a',
      name: '혹시 이투이 카페에서 일해 보신분 계신가요?',
      image_url: '',
      content: '내용 없음',
      tags: ['질문'],
      created_at: new Date().toISOString(),
      created_by: '익명',
      read_count: 10,
      like: 0,
    },
  ];

  return {
    props: {
      posts,
    },
    revalidate: 1800,
  };
};

export default Community;
