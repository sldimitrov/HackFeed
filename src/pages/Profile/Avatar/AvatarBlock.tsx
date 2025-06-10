import { Avatar, Box, CircularProgress } from '@mui/material';
import defaultAvatar from '../../../assets/defaultAvatar.jpeg';
import { predefinedAvatars } from '../../../contants/predefinedAvatars.ts';

interface Props {
  avatarUrl: string;
  editable: boolean;
  editMode: boolean;
  uploading: boolean;
  onUpload: React.ChangeEventHandler<HTMLInputElement>;
  onAvatarChange: (url: string) => void;
}

export default function AvatarBlock({
  avatarUrl,
  editable,
  editMode,
  uploading,
  onUpload,
  onAvatarChange,
}: Props) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" my={3}>
      <Avatar src={avatarUrl || defaultAvatar} sx={{ width: 100, height: 100 }} />
      {editable && editMode && (
        <Box display="flex" gap={1} flexWrap="wrap" mt={2}>
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
