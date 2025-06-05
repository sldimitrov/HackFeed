import {
  Avatar,
  Box,
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

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        avatar={<Avatar src={post.user.avatar} />}
        title={
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {post.user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {post.user.title}
            </Typography>
          </Box>
        }
        action={
          <Typography variant="caption" color="text.secondary">
            20 minutes ago
          </Typography>
        }
      />

      <CardContent>
        <Typography
          variant="body2"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.content}
        </Typography>
      </CardContent>

      <CardActions className="flex justify-between px-4 pb-2">
        <Box display="flex" alignItems="center" gap={1}>
          <span role="img" aria-label="fire">
            🔥
          </span>
          <Typography variant="body2">{post.reactions || 4}</Typography>
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
