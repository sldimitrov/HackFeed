import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useCooldown } from './useCooldown';
import { toast } from '../utils/toast';
import LikesService from '../services/likesService.ts';
import { useDeletePost, useUpdatePost } from './usePosts.ts';
import { useSharePost } from './useSharePost.ts';
import { useAuthStore } from '../store/useAuthStore.ts';
import type { Post } from '../types/post.ts';
import CommentsService from '../services/commentsService.ts';
import { QUERY_COMMENTS_BATCH, QUERY_POSTS, QUERY_USER_POSTS } from '../contants/queryKeys.ts';
import type { MutationType } from '../types/mutation.ts';
import { useTranslation } from 'react-i18next';

export const usePostActions = (post: Post, mutationType: MutationType) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const [liked, setLiked] = useState(post.liked_by_current_user || false);
  const [likeCount, setLikeCount] = useState(post.like_count || 0);
  const [newComment, setNewComment] = useState('');
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const commentCooldown = useCooldown(60_000);
  const shareCooldown = useCooldown(60_000);

  const updatePost = useUpdatePost(mutationType);
  const sharePost = useSharePost();
  const deleteMutation = useDeletePost();

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

  const handleShare = async () => {
    if (!user) return;

    if (shareCooldown.isOnCooldown(post.id)) {
      const remaining = shareCooldown.getRemaining(post.id);
      toast.info(t('posts.toast.shareCooldown', { remaining }));
      return;
    }

    try {
      await sharePost.mutateAsync({ post_id: post.id, user_id: user.id });
      shareCooldown.trigger(post.id);
      toast.success(t('posts.toast.shareSuccess'));
    } catch (error) {
      toast.error(t('posts.toast.shareError'));
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !user) return;

    if (commentCooldown.isOnCooldown(post.id)) {
      const remaining = commentCooldown.getRemaining(post.id);
      toast.info(t('posts.toast.commentCooldown', { remaining }));
      return;
    }

    try {
      await CommentsService.create({
        post_id: post.id,
        user_id: user.id,
        content: newComment,
      });

      commentCooldown.trigger(post.id);
      setNewComment('');
      toast.success(t('posts.toast.commentSuccess'));
      queryClient.invalidateQueries({ queryKey: [QUERY_COMMENTS_BATCH] });
    } catch (error) {
      toast.error(t('posts.toast.commentError'));
    }
  };

  const handleSaveEdit = async () => {
    if (!editedContent.trim()) return;

    try {
      await updatePost.mutateAsync({ id: String(post.id), content: editedContent });
      toast.success(t('posts.toast.editSuccess'));
      setEditing(false);
    } catch (error) {
      toast.error(t('posts.toast.editError'));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync({ post_id: post.id, shared: post.shared });
      queryClient.invalidateQueries({ queryKey: [QUERY_POSTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_USER_POSTS] });
      toast.success(t('posts.toast.deleteSuccess'));
    } catch (error) {
      toast.error(t('posts.toast.deleteError'));
    }
  };

  useEffect(() => {
    setLikeCount(post.like_count || 0);
  }, [post.id]);

  return {
    liked,
    likeCount,
    editing,
    editedContent,
    newComment,
    setNewComment,
    setEditing,
    setEditedContent,
    handleLike,
    handleShare,
    handleAddComment,
    handleSaveEdit,
    handleDelete,
    isSaving: updatePost.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
