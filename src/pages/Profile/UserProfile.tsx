import { Box, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Background } from '../../components/Base/Background';
import { useAuthStore } from '../../store/useAuthStore';
import { useUserProfile } from '../../hooks/useProfile';
import { useUserPosts } from '../../hooks/usePosts';
import { useProfileForm } from '../../hooks/useProfileForm';
import { useAvatarUpload } from '../../hooks/useAvatarUpload';
import ProfileHeader from './Header/ProfileHeader.tsx';
import AvatarBlock from './Avatar/AvatarBlock.tsx';
import ProfileFields from './Profile/ProfileFields.tsx';
import PostsSection from './Posts/PostsSection.tsx';

export default function UserProfile() {
  const { logout, user } = useAuthStore();
  const { userId } = useParams();
  const navigate = useNavigate();

  const { data: profile, isLoading } = useUserProfile(userId);
  const { data: posts, isLoading: loadingPosts, refetch } = useUserPosts(userId || '');

  const {
    formData,
    setFormData,
    editMode,
    setEditMode,
    saving,
    handleChange,
    handleSave,
    handleKeyDown,
  } = useProfileForm({ profile, userId, onSaveSuccess: refetch });

  const { uploading, handleUpload } = useAvatarUpload({
    onUploadComplete: (url) => {
      const next = { ...formData, avatar_url: url };
      setFormData(next);
      handleSave(next);
    },
  });

  const editable = user?.id === userId;

  if (isLoading) return <CircularProgress />;

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', bgcolor: '#f7f7f7', overflow: 'hidden' }}>
      <Background />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 600,
          mx: 'auto',
          p: 3,
          mt: 2,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <ProfileHeader
          title={editable ? 'My Profile' : `${profile?.name || 'Hacker'}'s Profile`}
          editable={editable}
          editMode={editMode}
          saving={saving}
          onEditToggle={() => setEditMode(!editMode)}
          onSave={() => handleSave()}
          onLogout={() => {
            logout();
            navigate('/auth');
          }}
        />

        <AvatarBlock
          avatarUrl={formData.avatar_url}
          editable={editable}
          editMode={editMode}
          uploading={uploading}
          onUpload={handleUpload}
          onAvatarChange={(url) => {
            const next = { ...formData, avatar_url: url };
            setFormData(next);
            handleSave(next);
          }}
        />

        <ProfileFields
          editable={editable}
          editMode={editMode}
          formData={formData}
          handleChange={handleChange}
          handleKeyDown={editMode ? handleKeyDown : undefined}
        />

        <PostsSection loading={loadingPosts} posts={posts || []} />
      </Box>
    </Box>
  );
}
