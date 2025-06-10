import { useAuthStore } from '../../store/useAuthStore.ts';
import { Avatar, Box, CircularProgress, IconButton, TextField, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import PostCard from '../../components/Post/PostCard.tsx';
import { useUserProfile } from '../../hooks/useProfile.ts';
import { useUserPosts } from '../../hooks/usePosts.ts';
import NoPosts from '../../components/Post/NoPosts.tsx';
import type { Post } from '../../types/post.ts';
import { useNavigate, useParams } from 'react-router-dom';
import defaultAvatar from '../../assets/defaultAvatar.jpeg';
import { Background } from '../../components/Base/Background.tsx';
import { predefinedAvatars } from '../../contants/predefinedAvatars.ts';
import { useProfileForm } from '../../hooks/useProfileForm.ts';
import { useAvatarUpload } from '../../hooks/useAvatarUpload.ts';

export function UserProfile() {
  const { logout, user } = useAuthStore();
  const { userId } = useParams();
  const navigate = useNavigate();

  const { data: profile, isLoading } = useUserProfile(userId);
  const {
    data: posts,
    isLoading: loadingPosts,
    refetch: refetchPosts,
  } = useUserPosts(userId || '');

  const editable = user?.id === userId;

  const {
    formData,
    setFormData,
    editMode,
    setEditMode,
    saving,
    handleChange,
    handleSave,
    handleKeyDown,
  } = useProfileForm({
    profile,
    userId,
    onSaveSuccess: () => {
      refetchPosts(); // Refresh posts after profile update
    },
  });

  const { uploading, handleUpload } = useAvatarUpload({
    onUploadComplete: (uploadedUrl: string) => {
      const updatedData = { ...formData, avatar_url: uploadedUrl };
      setFormData(updatedData);
      handleSave(updatedData); // Auto-save after upload
    },
  });

  const handleLogout = async (): Promise<void> => {
    logout();
    navigate('/auth');
  };

  const handlePredefinedAvatarClick = (url: string): void => {
    const updatedData = { ...formData, avatar_url: url };
    setFormData(updatedData);
    handleSave(updatedData); // Auto-save after selection
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
            {editable ? 'My Profile' : `${profile?.name || 'Hacker'}'s Profile`}
          </Typography>
          {editable && (
            <Box>
              {editMode ? (
                <IconButton onClick={() => handleSave()} disabled={saving}>
                  {saving ? <CircularProgress size={20} /> : <SaveIcon />}
                </IconButton>
              ) : (
                <IconButton onClick={() => setEditMode(true)}>
                  <EditIcon />
                </IconButton>
              )}
              <IconButton onClick={handleLogout} color="error">
                <LogoutIcon />
              </IconButton>
            </Box>
          )}
        </Box>

        <Box display="flex" justifyContent="center" my={3}>
          {!isLoading && (
            <Avatar
              src={formData.avatar_url || defaultAvatar}
              sx={{ width: 100, height: 100 }}
              alt="Profile Avatar"
            />
          )}
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
                alt="Profile Avatar"
                onClick={() => handlePredefinedAvatarClick(url)}
              />
            ))}

            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-avatar"
              onChange={handleUpload}
            />

            <label htmlFor="upload-avatar">
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  border: '2px dashed gray',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: '0.2s',
                  fontSize: 24,
                  color: 'gray',
                }}
                alt="Upload Avatar"
              >
                {uploading ? <CircularProgress size={20} /> : '+'}
              </Avatar>
            </label>
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
