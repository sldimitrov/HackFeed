import { Box, TextField, Typography } from '@mui/material';
import KEYS from '../../contants/keyCodes';
import type { Comment } from '../../types/post';
import { useTranslation } from 'react-i18next';
import { CommentCard } from './CommentCard.tsx';

interface CommentSectionProps {
  commentsOpen: boolean;
  comments: Comment[] | undefined;
  newComment: string;
  setNewComment: (value: string) => void;
  handleAddComment: () => void;
}

export default function CommentSection({
  commentsOpen,
  comments,
  newComment,
  setNewComment,
  handleAddComment,
}: CommentSectionProps) {
  const { t } = useTranslation();

  if (!commentsOpen) return null;

  return (
    <Box sx={{ px: 2, pt: 1 }}>
      <Box mt={2}>
        <TextField
          fullWidth
          size="small"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === KEYS.ENTER && !e.shiftKey) {
              e.preventDefault();
              handleAddComment();
            }
          }}
          placeholder={t('posts.comments.addComment')}
          sx={{ mt: 1 }}
        />

        {comments && comments.length > 0 ? (
          <Box mt={2}>
            {[...comments]
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .map((comment) => (
                <CommentCard
                  key={comment.id}
                  author={comment.profiles.name}
                  avatar={comment.profiles.avatar_url || ''}
                  content={comment.content}
                  timestamp={comment.created_at}
                />
              ))}
          </Box>
        ) : (
          <Box mt={2} sx={{ color: 'text.secondary' }}>
            <Typography variant="body2" align="center">
              {t('posts.comments.noComments')}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
