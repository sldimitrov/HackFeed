import { Avatar, Box, CircularProgress } from '@mui/material';
import defaultAvatar from '../../../assets/defaultAvatar.jpeg';
import { predefinedAvatars } from '../../../contants/predefinedAvatars.ts';
import type { EditableProfile } from '../../../types/profile.ts';

interface Props {
  avatarUrl: string;
  formData: EditableProfile;
  editable: boolean;
  editMode: boolean;
  uploading: boolean;
  onUpload: React.ChangeEventHandler<HTMLInputElement>;
  onAvatarChange: (url: string) => void;
}

export default function AvatarBlock({
  avatarUrl,
  formData,
  editable,
  editMode,
  uploading,
  onUpload,
  onAvatarChange,
}: Props) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" my={3}>
      {/* Avatar */}
      <Avatar src={avatarUrl || defaultAvatar} sx={{ width: 100, height: 100, mb: 1 }} />

      {/* Name & Title */}
      <Box textAlign="center" mb={2}>
        <Box fontWeight={600} fontSize="1.1rem">
          {formData.name || '—'}
        </Box>
        <Box fontSize="0.9rem" color="text.secondary">
          {formData.title || '—'}
        </Box>
      </Box>

      {/* Avatar selection */}
      {editable && editMode && (
        <Box display="flex" gap={1} flexWrap="wrap" justifyContent="center" mt={1}>
          {predefinedAvatars.map((url: string) => (
            <Avatar
              key={url}
              src={url}
              sx={{
                width: 40,
                height: 40,
                border: avatarUrl === url ? '2px solid orange' : '2px solid transparent',
                cursor: 'pointer',
              }}
              onClick={() => onAvatarChange(url)}
            />
          ))}

          <input id="upload-avatar" type="file" accept="image/*" hidden onChange={onUpload} />
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
                fontSize: 24,
                color: 'gray',
              }}
            >
              {uploading ? <CircularProgress size={20} /> : '+'}
            </Avatar>
          </label>
        </Box>
      )}
    </Box>
  );
}
