import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import type { PostCardProps } from '../../types/post.ts';
import { getTimeAgo } from '../../util/timeAgo.ts';
import defaultAvatar from '../../assets/defaultAvatar.jpeg';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useAuthStore } from '../../store/useAuthStore.ts';
import LikesService from '../../services/likesService.ts';

export default function PostCard({ post }: PostCardProps) {
  const { user } = useAuthStore();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setLikeCount(post.like_count || 0);
  }, [post.id, user]);

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

  const isLong = post.content.length > 100;
  const displayContent = expanded ? post.content : post.content.slice(0, 100);

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

      <CardContent sx={{ py: 1 }}>
        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
          {displayContent}
          {isLong && !expanded && '...'}
        </Typography>
        {isLong && (
          <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
            <Button
              size="small"
              onClick={() => setExpanded(!expanded)}
              sx={{ mt: 1, textTransform: 'none' }}
            >
              {expanded ? 'See less' : 'See more'}
            </Button>
          </Box>
        )}
      </CardContent>

      {/* Number of Likes - show users in future */}
      <Box display="flex" alignItems="center" sx={{ marginBottom: '15px' }} gap={1}>
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

      <Divider />

      {/* Like button is here */}
      <CardActions className="flex justify-between px-2 pb-2">
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton>
            <ThumbUpOffAltIcon sx={{ marginLeft: '5px' }} onClick={handleLike} />
          </IconButton>
        </Box>
        <Box>
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton>
            <ShareIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}
