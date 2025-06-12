import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import KEYS from '../../contants/keyCodes';
import type { PostComment } from '../../types/post';
import { useTranslation } from 'react-i18next';
import { CommentCard } from './CommentCard.tsx';
import { useDeleteComment } from '../../hooks/useComments.ts';
import { toast } from '../../utils/toast.ts';
import ConfirmDialog from '../Base/ConfirmDialog.tsx';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import { useState } from 'react';
import CommentIcon from '@mui/icons-material/Comment';

interface CommentSectionProps {
  commentsOpen: boolean;
  comments: PostComment[] | undefined;
  newComment: string;
  setNewComment: (value: string) => void;
  handleAddComment: () => void;
  userId: string;
  isPostShared: boolean;
}

export default function CommentSection({
  commentsOpen,
  comments,
  newComment,
  setNewComment,
  handleAddComment,
  userId,
  isPostShared,
}: CommentSectionProps) {
  const { t } = useTranslation();

  const { mutate: deleteComment, isPending } = useDeleteComment();

  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteRequest = (commentId: string) => {
    setCommentToDelete(commentId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (commentToDelete) {
      deleteComment(commentToDelete, {
        onSuccess: () => {
          toast.success(t('toast.comments.deleteSuccess'));
          setCommentToDelete(null);
          setDeleteDialogOpen(false);
        },
        onError: () => {
          toast.error(t('toast.comments.deleteError'));
        },
      });
    }
  };

  if (!commentsOpen) return null;

  return (
    <Box sx={{ px: 2, pt: 1 }}>
      <Box mt={2}>
        <Box sx={{ display: 'flex' }}>
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
          <IconButton onClick={handleAddComment} sx={{ mt: 1, color: 'orange' }}>
            <CommentIcon />
          </IconButton>
          {isPostShared && (
            <Tooltip title={t('posts.comments.tooltip')} arrow>
              <Typography
                variant="body2"
                sx={{ mt: 2, ml: 1, color: 'text.disabled', cursor: 'help' }}
              >
                <InfoOutlineIcon fontSize="small" />
              </Typography>
            </Tooltip>
          )}
        </Box>

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
                  commentId={comment.id}
                  userId={comment.user_id}
                  currentUserId={userId}
                  onDeleteRequest={handleDeleteRequest}
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
      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t('posts.comments.confirmDeleteTitle')}
        content={t('posts.comments.confirmDeleteContent')}
        isLoading={isPending}
      />
    </Box>
  );
}
