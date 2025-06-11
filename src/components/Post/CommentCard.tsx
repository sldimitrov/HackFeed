import { Avatar, Box, Card, Typography } from '@mui/material';

interface CommentCardProps {
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

export function CommentCard({ author, avatar, content, timestamp }: CommentCardProps) {
  return (
    <Card sx={{ display: 'flex', gap: 2, p: 2, mb: 1 }}>
      <Avatar src={avatar} alt={author} />
      <Box>
        <Typography fontWeight={600}>{author}</Typography>
        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
          {content}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(timestamp).toLocaleString()}
        </Typography>
      </Box>
    </Card>
  );
}
