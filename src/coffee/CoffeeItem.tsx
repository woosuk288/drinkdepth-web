import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {
  Box,
  Button,
  CardActions,
  IconButton,
  SxProps,
  Theme,
} from '@mui/material';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import { Coffee } from '../types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ApolloError, useMutation } from '@apollo/client';
import {
  CREATE_BOOKMARK_MUTATION,
  REMOVE_BOOKMARK_MUTATION,
} from '../../apollo/mutations';
import {
  createBookmark,
  createBookmarkVariables,
} from '../../apollo/__generated__/createBookmark';
import {
  removeBookmark,
  removeBookmarkVariables,
} from '../../apollo/__generated__/removeBookmark';
import client from '../../apollo/client';
import { bookmarks } from '../../apollo/__generated__/bookmarks';
import { BOOKMARKS_QUERY } from '../../apollo/queries';

type CoffeeItemProps = Pick<
  Coffee,
  'id' | 'name' | 'description' | 'main_image' | 'tags'
> & {
  sxProps?: SxProps<Theme> | undefined;
  isSaved: boolean | null;
};

function CoffeeItem({
  id,
  name,
  description,
  main_image,
  tags,
  sxProps,
  isSaved = false,
}: CoffeeItemProps) {
  const router = useRouter();
  const [isMarked, setIsMarked] = useState(isSaved);

  React.useEffect(() => {
    if (isSaved !== null) {
      setIsMarked(isSaved);
    }
  }, [isSaved]);

  const [createBookmark, { loading: loadingCreate }] = useMutation<
    createBookmark,
    createBookmarkVariables
  >(CREATE_BOOKMARK_MUTATION, {
    onCompleted: (result) => {
      if (result.createBookmark.ok) {
        const newBookmark = result.createBookmark.bookmark;
        /**
         * bookmarks
         */
        const prevBookmarks = client.readQuery<bookmarks>({
          query: BOOKMARKS_QUERY,
        });

        if (prevBookmarks?.bookmarks.bookmarks) {
          // cache 데이터 변경
          client.writeQuery({
            query: BOOKMARKS_QUERY,
            data: {
              bookmarks: {
                ...prevBookmarks.bookmarks,
                bookmarks: [...prevBookmarks.bookmarks.bookmarks, newBookmark],
              },
            },
          });
        }

        setIsMarked(true);
      } else {
        alert(result.createBookmark.error);
      }
      // 캐시 확인 후 있으면 기존 목록에 추가
    },
    onError: (error: ApolloError) => {
      console.error(error.message);
    },
  });

  const [removeBookmark, { loading: loadingRemove }] = useMutation<
    removeBookmark,
    removeBookmarkVariables
  >(REMOVE_BOOKMARK_MUTATION, {
    onCompleted: (result) => {
      if (result.removeBookmark.ok) {
        /**
         * bookmarks
         */
        const prevBookmarks = client.readQuery<bookmarks>({
          query: BOOKMARKS_QUERY,
        });

        if (prevBookmarks?.bookmarks.bookmarks) {
          const newBookmarks = prevBookmarks?.bookmarks.bookmarks.filter(
            (b) => b.product_id !== id
          );

          // cache 데이터 변경
          client.writeQuery({
            query: BOOKMARKS_QUERY,
            data: {
              bookmarks: {
                ...prevBookmarks.bookmarks,
                bookmarks: newBookmarks,
              },
            },
          });
        }

        setIsMarked(false);
      } else {
        alert(result.removeBookmark.error);
      }
      // 캐시 확인 후 있으면 기존 목록에 추가
    },
    onError: (error: ApolloError) => {
      console.error(error.message);
    },
  });

  const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isMarked) {
      // 찜하기에 추가
      removeBookmark({
        variables: {
          id,
        },
      });
    } else {
      // 찜하기에 추가
      createBookmark({
        variables: {
          input: {
            product_id: id,
            type: 'coffee',
            name,
            description,
            main_image,
            tags,
          },
        },
      });
    }
  };

  const handleCardClick = () => {
    router.push(`${router.pathname}/${id}`);
  };

  const handleTagClick = () => {
    console.log('handleTagClick');
  };

  return (
    <Card
      sx={{ maxWidth: 360, width: '100%', position: 'relative', ...sxProps }}
    >
      <Box
        component="article"
        sx={{ cursor: 'pointer' }}
        onClick={handleCardClick}
      >
        <Box position="relative" height={280} borderRadius="10px 10px 0 0">
          <Image
            src={main_image}
            layout="fill"
            objectFit="cover"
            sizes="30vw"
            alt={`${name}의 이미지`}
          />
        </Box>

        {isMarked === null ? null : isMarked ? (
          <IconButton
            color="secondary"
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
            }}
            onClick={handleIconClick}
            disabled={loadingCreate || loadingRemove}
          >
            <StarIcon fontSize="large" />
          </IconButton>
        ) : (
          <IconButton
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
            }}
            onClick={handleIconClick}
            disabled={loadingCreate || loadingRemove}
          >
            <StarBorderIcon fontSize="large" />
          </IconButton>
        )}

        <CardContent>
          <Typography variant="h6" component="div" align="center" gutterBottom>
            {name}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          ></Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ height: 40 }}
          >
            {description.length > 50
              ? `${description.slice(0, 48)}...`
              : description}
          </Typography>
        </CardContent>
      </Box>
      <CardActions sx={{ justifyContent: 'center', whiteSpace: 'nowrap' }}>
        {tags.map((t) => (
          <Button key={t} size="small" color="inherit" onClick={handleTagClick}>
            #{t}
          </Button>
        ))}
      </CardActions>
    </Card>
  );
}

export default CoffeeItem;
