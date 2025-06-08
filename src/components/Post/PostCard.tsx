import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import type { PostCardProps } from '../../types/post.ts';
import { getTimeAgo } from '../../util/timeAgo.ts';
import defaultAvatar from '../../assets/defaultAvatar.jpeg';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useAuthStore } from '../../store/useAuthStore.ts';
import LikesService from '../../services/likesService.ts';
import ShareService from '../../services/sharesService.ts';

export default function PostCard({ post }: PostCardProps) {
  const { user } = useAuthStore();
  const [liked, setLiked] = useState(post.liked_by_current_user || false);
  const [likeCount, setLikeCount] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const isLong = post.content.length > 100;
  const displayContent = expanded ? post.content : post.content.slice(0, 100);

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
    await ShareService.sharePost(postId, user.id);
    // Optional toast: "Post shared!"
  };

  useEffect(() => {
    setLikeCount(post.like_count || 0);
  }, [post.id, user]);

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        avatar={<Avatar src={post.avatar_url || defaultAvatar} alt="Profile Avatar" />}
        title={
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {post.name || 'Anonymous'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {post.title || 'No title provided'}
            </Typography>
          </Box>
        }
        action={
          <Typography variant="caption" color="text.secondary">
            {getTimeAgo(post.created_at)}
          </Typography>
        }
      />

      <Box sx={{ padding: 1 }}>
        {post.shared ? (
          <Box
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 2,
              padding: 2,
              bgcolor: '#fafafa',
              mb: 2,
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
              Reposted from {post.name || 'Anonymous'} · {getTimeAgo(post.created_at)}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Avatar src={post.avatar_url || defaultAvatar} sx={{ width: 30, height: 30 }} />
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  {post.name || 'Anonymous'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {post.title || 'No title provided'}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {displayContent}
              {isLong && !expanded && '...'}
            </Typography>
          </Box>
        ) : (
          <Box display="flex" alignItems="center" pl={1} gap={1} mb={1}>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {displayContent}
              {isLong && !expanded && '...'}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Number of Likes - show users in future */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ marginBottom: '15px' }}
        gap={1}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            sx={{
              marginLeft: '18px',
              width: '25px',
              height: '25px',
              background: 'orange',
              color: 'white',
            }}
          >
            <ThumbUpOffAltIcon fontSize="small" />
          </IconButton>
          <Typography variant="caption" sx={{ paddingTop: '4px' }} color="text.secondary">
            {likeCount} likes
          </Typography>
        </Box>

        <Box>
          <Button
            size="small"
            onClick={() => setExpanded(!expanded)}
            sx={{ mt: 1, textTransform: 'none' }}
          >
            {expanded ? 'See less' : 'See more'}
          </Button>
        </Box>
      </Box>

      <Divider />

      {/* Like button is here */}
      <CardActions className="flex justify-between px-2 pb-2">
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={handleLike}>
            <ThumbUpOffAltIcon sx={{ marginLeft: '5px' }} />
            <Typography variant="caption" sx={{ marginTop: '4px', paddingLeft: '3px' }}>
              {liked ? 'Liked' : 'Like'}
            </Typography>
          </IconButton>
        </Box>
        <Box>
          <IconButton onClick={() => handleShare(post.id)}>
            <ReplyIcon style={{ transform: 'scaleX(-1)' }} />
            <Typography variant="caption" sx={{ marginTop: '4px', paddingLeft: '3px' }}>
              Share
            </Typography>
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}
