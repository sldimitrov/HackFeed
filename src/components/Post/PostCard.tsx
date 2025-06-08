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

export default function PostCard({ post }: PostCardProps) {
  const { user } = useAuthStore();
  const [liked, setLiked] = useState(post.liked_by_current_user || false);
  const [likeCount, setLikeCount] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const sharePost = useSharePost();
  const deletePost = useDeletePost();
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
    await sharePost.mutateAsync({ post_id: postId, user_id: user.id });
    // TODO add a toast notification
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePost.mutate(post.id);
    }
  };

  useEffect(() => {
    setLikeCount(post.like_count || 0);
  }, [post.id, user]);

  return (
    <Card sx={{ mb: 3 }}>
      <PostHeader
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
        showDelete={user?.id === post.user_id}
      />
    </Card>
  );
}
