import { Avatar, Box, CardHeader, IconButton, Typography } from '@mui/material';
import { getTimeAgo } from '../../utils/timeAgo.ts';
import defaultAvatar from '../../assets/defaultAvatar.jpeg';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../../utils/slugify.ts';
import { defaultProfile } from '../../contants/profile.ts';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';

export default function PostHeader({
  id,
  avatar,
  name,
  title,
  created_at,
  isReported,
  canEdit = false,
  onEdit,
}: {
  id: string;
  avatar?: string;
  name: string;
  title: string;
  created_at: string;
  isReported?: boolean;
  canEdit?: boolean;
  onEdit?: () => void;
}) {
  const { t } = useTranslation();
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
          {isReported && (
            <Typography
              variant="caption"
              color="error"
              sx={{
                fontWeight: 'bold',
                backgroundColor: '#ffe6e6',
                borderRadius: '4px',
                marginLeft: '5px',
                px: 0.5,
                py: 0.1,
              }}
            >
              {t('posts.reports.reported')}
            </Typography>
          )}
        </Box>
      }
      action={
        <Box pt={0.9}>
          <Typography variant="caption" mt={1} color="text.secondary">
            {getTimeAgo(created_at)}
          </Typography>
          {canEdit && onEdit && (
            <IconButton onClick={onEdit} size="small" sx={{ ml: 1, mb: 0.5 }}>
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      }
    />
  );
}
