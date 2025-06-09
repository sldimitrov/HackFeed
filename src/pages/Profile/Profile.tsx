import {
  Avatar,
  Box,
  TextField,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useUserProfile } from '../../hooks/useProfile';
import ProfileService from '../../services/profileService';
import { defaultProfile } from '../../contants/profile';
import { Background } from '../../components/Base/Background';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const { data: profile, isLoading } = useUserProfile(user?.id);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    avatar_url: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        title: profile.title,
        avatar_url: profile.avatar_url,
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;
    await ProfileService.updateProfile(user.id, formData);
    setEditMode(false);
  };

  if (isLoading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: '#f7f7f7',
        position: 'relative',
        padding: '20px',
      }}
    >
      <Background />
      <Box
        maxWidth="600px"
        mb={10}
        mx="auto"
        component={Paper}
        elevation={3}
        p={4}
        zIndex={1}
        position="relative"
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">My Profile</Typography>
          <Box>
            {editMode ? (
              <IconButton onClick={handleSave} color="primary">
                <SaveIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => setEditMode(true)}>
                <EditIcon />
              </IconButton>
            )}
            <IconButton onClick={logout} color="error">
              <LogoutIcon />
            </IconButton>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" my={3}>
          <Avatar
            src={formData.avatar_url || defaultProfile.avatar_url}
            sx={{ width: 100, height: 100 }}
            alt="Profile Avatar"
          />
        </Box>

        <TextField
          name="name"
          label="Name"
          fullWidth
          margin="dense"
          value={formData.name}
          onChange={handleChange}
          disabled={!editMode}
        />

        <TextField
          name="title"
          label="Title"
          fullWidth
          margin="dense"
          value={formData.title}
          onChange={handleChange}
          disabled={!editMode}
        />

        <TextField
          name="avatar_url"
          label="Avatar URL"
          fullWidth
          margin="dense"
          value={formData.avatar_url}
          onChange={handleChange}
          disabled={!editMode}
        />
      </Box>
    </Box>
  );
}
