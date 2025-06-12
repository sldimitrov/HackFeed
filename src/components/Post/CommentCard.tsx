import { Avatar, Box, Card, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../../utils/slugify.ts';

interface CommentCardProps {
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  commentId: string;
  userId: string;
  currentUserId: string;
  onDeleteRequest: (id: string) => void;
}

export function CommentCard({
  author,
  avatar,
  content,
  timestamp,
  commentId,
  userId,
  currentUserId,
  onDeleteRequest,
}: CommentCardProps) {
  const navigate = useNavigate();

  const handleProfileNavigate = () => {
    navigate(`/profile/${userId}/${slugify('user')}`, { state: { userId: userId } });
  };

  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, p: 2, mb: 1 }}>
        <Avatar
          src={avatar}
          alt={author}
          sx={{ cursor: 'pointer' }}
          onClick={handleProfileNavigate}
        />
        <Box>
          <Typography fontWeight={600}>{author}</Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            {content}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(timestamp).toLocaleString('bg-BG')}
          </Typography>
        </Box>
      </Box>
      {currentUserId === userId && (
        <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
          <IconButton onClick={() => onDeleteRequest(commentId)} color="error" size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Card>
  );
}
