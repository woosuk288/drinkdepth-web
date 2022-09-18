import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';

import MoodIcon from '@mui/icons-material/Mood';
import CloseIcon from '@mui/icons-material/Close';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addMenuComment,
  DB_COMMENTS,
  deleteMenuComment,
  fetchMenuComments,
} from '../utils/firebase/services';
import { auth } from '../utils/firebase/firebaseInit';

const SLICE_COUNT = 3;

type MenuReviewProps = {
  menuId: string;
  commentCount: number;
};

function MenuReview({ menuId, commentCount }: MenuReviewProps) {
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();
  const [reviewCount, setReviewCount] = useState(commentCount);

  const { isLoading: isLoadingComments, data: comments } = useQuery(
    [DB_COMMENTS, menuId],
    fetchMenuComments,
    {
      onSuccess: (data) => {
        console.log('comments : ', data);
      },
    }
  );
  const { mutate: addCommentMutate, isLoading: isAddingComment } = useMutation(
    addMenuComment,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([DB_COMMENTS, menuId]);
        setReviewCount((prev) => prev + 1);
      },
    }
  );

  const { mutate: deleteCommentMutate } = useMutation(deleteMenuComment, {
    onSuccess: (_, { commentId }) => {
      queryClient.invalidateQueries([DB_COMMENTS, menuId]);
      setReviewCount((prev) => prev - 1);
    },
  });

  const handleAddComment = () => {
    addCommentMutate({ menuId, comment }, { onSuccess: () => setComment('') });
  };

  const handleDeleteComment = (commentId: string) => {
    deleteCommentMutate({ menuId, commentId });
  };

  console.log('menuId : ', menuId);
  console.log('reviewCount : ', reviewCount);

  return (
    <List>
      <Typography
        variant="h6"
        fontWeight="bold"
        align="center"
        sx={{ marginBottom: '2rem' }}
      >
        고객 리뷰
      </Typography>

      {/* Comments */}

      {isLoadingComments ? (
        <ListItem sx={{ justifyContent: 'center' }}>
          <CircularProgress />
        </ListItem>
      ) : !comments || comments.length === 0 ? (
        <Typography
          // fontWeight="bold"
          align="center"
          color="GrayText"
          sx={{ marginBottom: '2rem' }}
        >
          고객님이 첫 번째 리뷰를 등록하세요.
        </Typography>
      ) : (
        comments?.slice(0, SLICE_COUNT).map((comment) => (
          <ListItem key={comment.id}>
            <Typography
              fontWeight="bold"
              component="span"
              sx={{ marginRight: '1rem' }}
            >
              {comment.displayName.charAt(0) + '**'}
            </Typography>
            <Typography sx={{ flex: 1 }} noWrap>
              {comment.comment}
            </Typography>

            {auth.currentUser?.uid === comment.uid && (
              <IconButton
                size="small"
                onClick={() => handleDeleteComment(comment.id!)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </ListItem>
        ))
      )}

      {reviewCount > SLICE_COUNT && (
        <ListItem>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ cursor: 'pointer' }}
          >
            댓글 {reviewCount}개 모두 보기
          </Typography>
        </ListItem>
      )}

      {/* TextField */}
      <TextField
        disabled={!auth.currentUser}
        autoComplete="off"
        sx={{ paddingLeft: '1rem', paddingY: '0.5rem' }}
        placeholder={
          auth.currentUser ? '댓글 달기...' : '로그인 후 가능합니다.'
        }
        fullWidth
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MoodIcon fontSize="large" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Button
                sx={{ fontWeight: 'bold' }}
                onClick={handleAddComment}
                disabled={comment.length < 1 || isAddingComment}
              >
                게시
              </Button>
            </InputAdornment>
          ),

          disableUnderline: true,
        }}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </List>
  );
}
export default MenuReview;
