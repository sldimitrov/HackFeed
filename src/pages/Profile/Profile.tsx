import { useEffect, useState } from 'react';
import { Box, TextField, Button, Avatar, Typography } from '@mui/material';
import { useAuthStore } from '../../store/useAuthStore';
import ProfileService from '../../services/profileService.ts';

export default function Profile() {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState({ name: '', title: '', avatar_url: '' });

  useEffect(() => {
    if (user) {
      ProfileService.getCurrentProfile(user.id).then(setProfile);
    }
  }, [user]);

  const handleSave = async () => {
    await ProfileService.updateProfile(user.id, profile);
    // Optional: Toast or feedback
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>
        My Profile
      </Typography>
      <Avatar src={profile.avatar_url} sx={{ width: 80, height: 80, mb: 2 }} />
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
      />
      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={profile.title}
        onChange={(e) => setProfile({ ...profile, title: e.target.value })}
      />
      <Button variant="contained" onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
}
