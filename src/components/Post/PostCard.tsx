import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import type { PostCardProps } from '../../types/post.ts';
import { getTimeAgo } from '../../util/timeAgo.ts';
import defaultAvatar from '../../assets/defaultAvatar.jpeg';
import { useUserProfile } from '../../hooks/useProfile.ts';

export default function PostCard({ post }: PostCardProps) {
  const [expanded, setExpanded] = useState(false);

  const isLong = post.content.length > 100;
  const displayContent = expanded ? post.content : post.content.slice(0, 100);

  const { data: currentPostProfile } = useUserProfile(post?.user_id);

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        avatar={<Avatar src={defaultAvatar} />}
        title={
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {currentPostProfile?.name || 'Anonymous'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {currentPostProfile?.title || 'No title provided'}
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

      <CardActions className="flex justify-between px-4 pb-2">
        <Box display="flex" alignItems="center" gap={1}>
          <span role="img" aria-label="fire">
            🔥
          </span>
          {/* TODO: Add reactions */}
          <Typography variant="body2">Generic 4</Typography>
        </Box>
        <Box>
          <IconButton>
            <FavoriteBorderIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <ShareIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}
