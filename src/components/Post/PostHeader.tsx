import { Avatar, Box, CardHeader, Typography } from '@mui/material';
import { getTimeAgo } from '../../util/timeAgo.ts';
import defaultAvatar from '../../assets/defaultAvatar.jpeg';

export default function PostHeader({
  avatar,
  name,
  title,
  created_at,
}: {
  avatar: string;
  name: string;
  title: string;
  created_at: string;
}) {
  return (
    <CardHeader
      avatar={<Avatar src={avatar || defaultAvatar} alt="Profile Avatar" />}
      title={
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {title}
          </Typography>
        </Box>
      }
      action={
        <Box pt={0.9}>
          <Typography variant="caption" mt={1} color="text.secondary">
            {getTimeAgo(created_at)}
          </Typography>
        </Box>
      }
    />
  );
}
