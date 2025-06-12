import { useEffect, useState } from 'react';
import { Box, Divider, TextField } from '@mui/material';
import type { PostCardProps } from '../../types/post.ts';
import { useAuthStore } from '../../store/useAuthStore.ts';
import LikesService from '../../services/likesService.ts';
import { useSharePost } from '../../hooks/useSharePost.ts';
import { useDeletePost, useUpdatePost } from '../../hooks/usePosts.ts';
import PostHeader from './PostHeader.tsx';
import SharedPostContent from './SharedPostContent.tsx';
import PostContent from './PostContent.tsx';
import PostActions from './PostActions.tsx';
import PostMeta from './PostMeta.tsx';
import ConfirmDialog from '../Base/ConfirmDialog.tsx';
import { toast } from '../../utils/toast.ts';
import { useTranslation } from 'react-i18next';
import KEYS from '../../contants/keyCodes.ts';
import MotionCard from '../Base/MotionCard.tsx';
import CommentsService from '../../services/commentsService.ts';
import CommentSection from './CommentsSection.tsx';
import { useQueryClient } from '@tanstack/react-query';
import {QUERY_COMMENTS_BATCH} from "../../contants/queryKeys.ts";

export default function PostCard({ post, mutationType, comments }: PostCardProps) {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const [liked, setLiked] = useState(post.liked_by_current_user || false);
  const [likeCount, setLikeCount] = useState(0);
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [expanded, setExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentsOpen, setCommentsOpen] = useState(false);
  const toggleComments = () => setCommentsOpen((prev) => !prev);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [lastSharedTimes, setLastSharedTimes] = useState<{ [postId: number]: number }>({});
  const COOLDOWN_MS = 1 * 60 * 1000;

  const updatePost = useUpdatePost(mutationType);
  const sharePost = useSharePost();
  const deletePost = useDeletePost();
  const showDelete =
    (user?.id === post.user_id && !post.shared_by_id) || user?.id === post.shared_by_id;
  const isLong = post.content.length > 100;

  const handleLike = async () => {
    if (!user) return;
    if (liked) {
      await LikesService.unlike(post.id, user.id);
      setLikeCount((prev) => prev - 1);
    } else {
      await LikesService.like(post.id, user.id);
      setLikeCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !user) return;

    try {
      await CommentsService.create({
        post_id: post.id,
        user_id: user.id,
        content: newComment,
      });
      toast.success(t('toast.comments.commentSuccess'));
      setNewComment('');

      queryClient.invalidateQueries({
        queryKey: [QUERY_COMMENTS_BATCH],
      });
    } catch (error) {
      toast.error(t('toast.comments.commentError'));
    }
  };

  const handleShare = async (postId: number) => {
    if (!user) return;

    const now = Date.now();
    const lastShared = lastSharedTimes[postId] || 0;

    if (now - lastShared < COOLDOWN_MS) {
      const remaining = Math.ceil((COOLDOWN_MS - (now - lastShared)) / 1000);
      toast.info(t('toast.templates.shareCooldown', { seconds: remaining }));
      return;
    }

    try {
      await sharePost.mutateAsync({ post_id: postId, user_id: user.id });
      setLastSharedTimes((prev) => ({ ...prev, [postId]: now }));
      toast.success(t('toast.posts.shareSuccess'));
    } catch (error) {
      toast.error(t('toast.auth.errorGeneric'));
    }
  };

  const handleSaveEdit = async () => {
    if (!editedContent.trim()) return;

    try {
      await updatePost.mutateAsync({ id: String(post.id), content: editedContent });
      toast.success(t('toast.posts.updateSuccess'));
      setEditing(false);
    } catch (error) {
      toast.error(t('toast.posts.updateError'));
    }
  };

  const cancelEdit = () => {
    setEditedContent(post.content);
    setEditing(false);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    try {
      deletePost.mutate({ post_id: post.id, shared: post.shared });
      toast.success(t('toast.posts.deleteSuccess'));
    } catch (error) {
      toast.error(t('toast.auth.errorGeneric'));
    }
    setDeleteDialogOpen(false);
  };

  useEffect(() => {
    setLikeCount(post.like_count || 0);
  }, [post.id, user]);

  return (
    <MotionCard sx={{ mb: 3 }}>
      <PostHeader
        id={post.shared_by_id || post.user_id}
        avatar={post.shared_by_avatar_url || post.avatar_url}
        name={post.shared_by_name || post.name}
        title={post.shared_by_title || post.title}
        created_at={post.created_at}
        canEdit={!post.shared && user?.id === post.user_id}
        onEdit={() => setEditing(true)}
      />

      <Box sx={{ padding: 1 }}>
        {editing ? (
          <>
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
          </>
        ) : post.shared ? (
          <SharedPostContent post={post} expanded={expanded} />
        ) : (
          <PostContent content={post.content} expanded={expanded} />
        )}
      </Box>

      <PostMeta
        likeCount={likeCount}
        isLong={isLong}
        expanded={expanded}
        onToggleExpand={() => setExpanded(!expanded)}
        isEditing={editing}
        isSaving={updatePost.isPending}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={cancelEdit}
      />

      <Divider />

      <CommentSection
        commentsOpen={commentsOpen}
        comments={comments}
        newComment={newComment}
        setNewComment={setNewComment}
        handleAddComment={handleAddComment}
      />

      <PostActions
        liked={liked}
        onLike={handleLike}
        onShare={() => handleShare(post.id)}
        onDelete={handleDelete}
        showDelete={showDelete}
        onToggleComments={toggleComments}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t('posts.confirmDialog.deleteTitle')}
        content={t('posts.confirmDialog.deleteContent')}
      />
    </MotionCard>
  );
}
