import { useState } from 'react';
import { Box, Divider, TextField } from '@mui/material';
import type { PostCardProps } from '../../types/post.ts';
import { useAuthStore } from '../../store/useAuthStore.ts';
import PostHeader from './PostHeader.tsx';
import SharedPostContent from './SharedPostContent.tsx';
import PostContent from './PostContent.tsx';
import PostActions from './PostActions.tsx';
import PostMeta from './PostMeta.tsx';
import ConfirmDialog from '../Base/ConfirmDialog.tsx';
import { useTranslation } from 'react-i18next';
import KEYS from '../../contants/keyCodes.ts';
import MotionCard from '../Base/MotionCard.tsx';
import CommentSection from './CommentsSection.tsx';
import { ADMIN_ROLE } from '../../contants/users.ts';
import { usePostActions } from '../../hooks/usePostActions.ts';

export default function PostCard({
  post,
  mutationType,
  comments,
  role,
  isReported,
  reports,
}: PostCardProps) {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const [commentsOpen, setCommentsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const toggleComments = () => setCommentsOpen((prev) => !prev);

  const {
    liked,
    likeCount,
    editing,
    editedContent,
    newComment,
    isSaving,
    setEditing,
    setEditedContent,
    setNewComment,
    handleLike,
    handleShare,
    handleAddComment,
    handleSaveEdit,
    handleDelete,
  } = usePostActions(post, mutationType);

  const showDelete =
    (user?.id === post.user_id && !post.shared_by_id) ||
    user?.id === post.shared_by_id ||
    role === ADMIN_ROLE;

  const cancelEdit = () => {
    setEditedContent(post.content);
    setEditing(false);
  };

  return (
    <MotionCard sx={{ mb: 3 }}>
      <PostHeader
        id={post.shared_by_id || post.user_id}
        avatar={post.shared_by_avatar_url || post.avatar_url}
        name={post.shared_by_name || post.name}
        title={post.shared_by_title || post.title}
        created_at={post.created_at}
        isReported={isReported}
        canEdit={!post.shared && user?.id === post.user_id}
        onEdit={() => setEditing(true)}
      />

      <Box sx={{ padding: 1 }}>
        {editing ? (
          <TextField
            fullWidth
            multiline
            minRows={4}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === KEYS.ENTER && !e.shiftKey) {
                e.preventDefault();
                handleSaveEdit();
              }
            }}
            variant="outlined"
            sx={{ mb: 1 }}
          />
        ) : post.shared ? (
          <SharedPostContent post={post} />
        ) : (
          <PostContent content={post.content} />
        )}
      </Box>

      <PostMeta
        likeCount={likeCount}
        isEditing={editing}
        isSaving={isSaving}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={cancelEdit}
        userId={user?.id || ''}
        postId={post.id}
        isReported={isReported}
        reports={reports}
      />

      <Divider />

      <CommentSection
        commentsOpen={commentsOpen}
        comments={comments}
        newComment={newComment}
        setNewComment={setNewComment}
        handleAddComment={handleAddComment}
        userId={user?.id || ''}
        isPostShared={post.shared}
      />

      <PostActions
        liked={liked}
        onLike={handleLike}
        onShare={() => handleShare()}
        onDelete={() => setDeleteDialogOpen(true)}
        showDelete={showDelete}
        onToggleComments={toggleComments}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => {
          handleDelete();
          setDeleteDialogOpen(false);
        }}
        title={t('posts.confirmDialog.deleteTitle')}
        content={t('posts.confirmDialog.deleteContent')}
      />
    </MotionCard>
  );
}
