import { Avatar, Box, CardHeader, Typography } from '@mui/material';
import { getTimeAgo } from '../../utils/timeAgo.ts';
import defaultAvatar from '../../assets/defaultAvatar.jpeg';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../../utils/slugify.ts';
import { defaultProfile } from '../../contants/profile.ts';

export default function PostHeader({
  id,
  avatar,
  name,
  title,
  created_at,
}: {
  id: string;
  avatar?: string;
  name: string;
  title: string;
  created_at: string;
}) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (id) {
      navigate(`/profile/${id}/${slugify(name || 'user')}`, { state: { userId: id } });
    }
  };

  return (
    <CardHeader
      avatar={
        <Avatar
          src={avatar || defaultAvatar}
          sx={{ cursor: 'pointer' }}
          alt="Profile Avatar"
          onClick={handleProfileClick}
        />
      }
      title={
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {name || defaultProfile.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {title || defaultProfile.title}
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
