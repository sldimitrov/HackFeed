import { Avatar, Box, IconButton, Typography, Card, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import type { UserProfileCardProps } from '../../types/profile.ts';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../../utils/slugify.ts';
import { useTranslation } from 'react-i18next';
import MotionCard from '../Base/MotionCard.tsx';

const UserProfileCard = ({
  id,
  name,
  title,
  avatar,
  likes,
  posts,
  onEdit,
}: UserProfileCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate(`/profile/${id}/${slugify(name)}`, { state: { userId: id } });
  };

  return (
    <MotionCard>
      <Card sx={{ borderRadius: 1, p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {/* Header: Avatar + Info + Edit */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src={avatar}
              sx={{ width: 56, height: 56, cursor: 'pointer' }}
              alt="Profile Avatar"
              onClick={handleEditProfile}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {title}
              </Typography>
            </Box>
          </Box>
          <IconButton size="small" onClick={onEdit}>
            <EditIcon
              fontSize="small"
              onClick={() => {
                handleEditProfile();
              }}
            />
          </IconButton>
        </Box>

        <Divider />

        {/* Stats Section */}
        <Box display="flex" justifyContent="space-around" textAlign="center">
          <Box>
            <Typography variant="h6">{likes}</Typography>
            <Typography variant="caption" color="text.secondary">
              {t('profile.card.likes')}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">{posts}</Typography>
            <Typography variant="caption" color="text.secondary">
              {t('profile.card.posts')}
            </Typography>
          </Box>
        </Box>
      </Card>
    </MotionCard>
  );
};

export default UserProfileCard;
