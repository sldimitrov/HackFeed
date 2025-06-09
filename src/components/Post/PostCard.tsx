import { useEffect, useState } from 'react';
import { Box, Card, Divider } from '@mui/material';
import type { PostCardProps } from '../../types/post.ts';
import { useAuthStore } from '../../store/useAuthStore.ts';
import LikesService from '../../services/likesService.ts';
import { useSharePost } from '../../hooks/useSharePost.ts';
import { useDeletePost } from '../../hooks/usePosts.ts';
import PostHeader from './PostHeader.tsx';
import SharedPostContent from './SharedPostContent.tsx';
import PostContent from './PostContent.tsx';
import PostActions from './PostActions.tsx';
import PostMeta from './PostMeta.tsx';
import ConfirmDialog from '../Base/ConfirmDialog.tsx';
import { toast } from '../../utils/toast.ts';
import { TOAST_MESSAGES, TOAST_TEMPLATES } from '../../contants/toastMessages.ts';

export default function PostCard({ post }: PostCardProps) {
  const { user } = useAuthStore();
  const [liked, setLiked] = useState(post.liked_by_current_user || false);
  const [likeCount, setLikeCount] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [lastSharedTimes, setLastSharedTimes] = useState<{ [postId: number]: number }>({});
  const COOLDOWN_MS = 1 * 60 * 1000;

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

  const handleShare = async (postId: number) => {
    if (!user) return;

    const now = Date.now();
    const lastShared = lastSharedTimes[postId] || 0;

    if (now - lastShared < COOLDOWN_MS) {
      const remaining = Math.ceil((COOLDOWN_MS - (now - lastShared)) / 1000);
      toast.info(TOAST_TEMPLATES.SHARE_COOLDOWN(remaining));
      return;
    }

    try {
      await sharePost.mutateAsync({ post_id: postId, user_id: user.id });
      setLastSharedTimes((prev) => ({ ...prev, [postId]: now }));
      toast.success(TOAST_MESSAGES.POST_SHARE_SUCCESS);
    } catch (error) {
      toast.error(TOAST_MESSAGES.ERROR_GENERIC);
    }
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    try {
      deletePost.mutate({ post_id: post.id, shared: post.shared });
      toast.success(TOAST_MESSAGES.POST_DELETE_SUCCESS);
    } catch (error) {
      toast.error(TOAST_MESSAGES.ERROR_GENERIC);
    }
    setDeleteDialogOpen(false);
  };

  useEffect(() => {
    setLikeCount(post.like_count || 0);
  }, [post.id, user]);

  return (
    <Card sx={{ mb: 3 }}>
      <PostHeader
        id={post.shared_by_id || post.user_id}
        avatar={post.shared_by_avatar_url || post.avatar_url}
        name={post.shared_by_name || post.name}
        title={post.shared_by_title || post.title}
        created_at={post.created_at}
      />

      <Box sx={{ padding: 1 }}>
        {post.shared ? (
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
      />

      <Divider />

      <PostActions
        liked={liked}
        onLike={handleLike}
        onShare={() => handleShare(post.id)}
        onDelete={handleDelete}
        showDelete={showDelete}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete this post?"
        content="This action cannot be undone. Are you sure you want to proceed?"
      />
    </Card>
  );
}
