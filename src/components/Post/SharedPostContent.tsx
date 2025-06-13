import { Avatar, Box, Typography } from '@mui/material';
import defaultAvatar from '../../assets/defaultAvatar.jpeg';
import { TruncatedText } from '../Base/TruncatedText.tsx';

export default function SharedPostContent({ post }: { post: any }) {
  return (
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
        Reposted from {post.name || 'Anonymous'}
      </Typography>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <Avatar
          src={post.avatar_url || defaultAvatar}
          sx={{ width: 30, height: 30 }}
          alt="Profile Avatar"
        />
        <Box>
          <Typography variant="body2" fontWeight="bold">
            {post.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {post.title}
          </Typography>
        </Box>
      </Box>
      <TruncatedText text={post.content} maxLength={140} />
    </Box>
  );
}
