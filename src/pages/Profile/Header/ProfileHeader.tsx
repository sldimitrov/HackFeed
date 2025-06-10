import { Box, IconButton, Typography, CircularProgress } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';

interface Props {
  title: string;
  editable: boolean;
  editMode: boolean;
  saving?: boolean;
  onEditToggle: () => void;
  onSave: () => void;
  onLogout: () => void;
}

export default function ProfileHeader({
  title,
  editable,
  editMode,
  saving,
  onEditToggle,
  onSave,
  onLogout,
}: Props) {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
      <Typography variant="h5">{title}</Typography>

      {editable && (
        <Box>
          {editMode ? (
            <IconButton onClick={onSave} disabled={saving}>
              {saving ? <CircularProgress size={20} /> : <SaveIcon />}
            </IconButton>
          ) : (
            <IconButton onClick={onEditToggle}>
              <EditIcon />
            </IconButton>
          )}
          <IconButton onClick={onLogout} color="error">
            <LogoutIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
