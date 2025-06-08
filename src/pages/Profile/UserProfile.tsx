import { useAuthStore } from '../../store/useAuthStore.ts';
import { useEffect, useState } from 'react';
import ProfileService from '../../services/profileService.ts';
import { Avatar, Box, CircularProgress, IconButton, TextField, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import PostCard from '../../components/Post/PostCard.tsx';
import { useUserProfile } from '../../hooks/useProfile.ts';
import { useUserPosts } from '../../hooks/usePosts.ts';
import NoPosts from '../../components/Post/NoPosts.tsx';
import type { Post } from '../../types/post.ts';
import { useParams } from 'react-router-dom';
import defaultAvatar from '../../assets/defaultAvatar.jpeg';
import { Background } from '../../components/base/Background.tsx';
import { predefinedAvatars } from '../../contants/predefinedAvatars.ts';

export function UserProfile() {
  const { logout } = useAuthStore();
  const { userId } = useParams();
  const { user } = useAuthStore();
  const { data: profile, isLoading } = useUserProfile(userId);
  const { data: posts, isLoading: loadingPosts } = useUserPosts(userId || '');

  const [formData, setFormData] = useState({ name: '', title: '', avatar_url: '' });
  const [editMode, setEditMode] = useState(false);
  const editable = user?.id === userId;

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
    if (userId) {
      await ProfileService.updateProfile(userId, formData);
      setEditMode(false);
    } else {
      console.error('User ID is not defined');
    }
  };

  const handleSaveWithData = async (data: typeof formData) => {
    if (userId) {
      await ProfileService.updateProfile(userId, data);
      setEditMode(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  };

  if (isLoading) return <CircularProgress />;

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        bgcolor: '#f7f7f7',
        overflow: 'hidden',
        px: { xs: 1.5, sm: 2, md: 3 },
        pt: { xs: 2, sm: 3 },
      }}
    >
      <Background />

      <Box
        sx={{
          maxWidth: { xs: '100%', md: '600px' },
          mx: 'auto',
          zIndex: 1,
          position: 'relative',
          backgroundColor: 'white',
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          flexWrap="wrap"
        >
          <Typography variant="h5" fontSize={{ xs: '1.25rem', sm: '1.5rem' }}>
            {editable ? 'My Profile' : `${profile?.name}'s Profile`}
          </Typography>
          {editable && (
            <Box>
              {editMode ? (
                <IconButton onClick={handleSave}>
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
          )}
        </Box>

        <Box display="flex" justifyContent="center" my={3}>
          <Avatar src={formData.avatar_url || defaultAvatar} sx={{ width: 100, height: 100 }} />
        </Box>

        <TextField
          name="name"
          label="Name"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          onKeyDown={editMode ? handleKeyDown : undefined}
          disabled={!editable || !editMode}
          margin="dense"
        />

        <TextField
          name="title"
          label="Title"
          fullWidth
          value={formData.title}
          onChange={handleChange}
          onKeyDown={editMode ? handleKeyDown : undefined}
          disabled={!editable || !editMode}
          margin="dense"
        />

        <TextField
          name="avatar_url"
          label="Avatar URL"
          fullWidth
          value={formData.avatar_url}
          onChange={handleChange}
          onKeyDown={editMode ? handleKeyDown : undefined}
          disabled={!editable || !editMode}
          margin="dense"
        />

        {editable && editMode && (
          <Box display="flex" justifyContent="center" gap={1} flexWrap="wrap" mt={2}>
            {predefinedAvatars.map((url: string) => (
              <Avatar
                key={url}
                src={url}
                sx={{
                  width: 40,
                  height: 40,
                  border:
                    formData.avatar_url === url ? '2px solid orange' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: '0.2s',
                }}
                onClick={async () => {
                  setFormData((prev) => {
                    const updated = { ...prev, avatar_url: url };
                    // Save immediately after setting
                    handleSaveWithData(updated);
                    return updated;
                  });
                }}
              />
            ))}
          </Box>
        )}

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Posts
          </Typography>
          {loadingPosts ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress />
            </Box>
          ) : posts && posts.length === 0 ? (
            <NoPosts message="There are no posts to show yet." />
          ) : (
            posts?.map((post: Post) => <PostCard key={post.id} post={post} />)
          )}
        </Box>
      </Box>
    </Box>
  );
}
