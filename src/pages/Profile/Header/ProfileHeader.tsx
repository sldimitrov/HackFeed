import { Box, IconButton, Typography, CircularProgress, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'bg' : 'en';
    i18n.changeLanguage(newLang); // this will work now
    localStorage.setItem('i18nextLng', newLang); // optional: persist preference
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
      <Typography variant="h5">
        {editable
          ? t('profile.header.myProfile')
          : t('profile.header.userProfile', { name: title })}
      </Typography>

      <Box display="flex" alignItems="center" gap={1}>
        {/* Language Switcher */}
        <Button onClick={toggleLanguage} variant="outlined" size="small">
          {i18n.language === 'en' ? 'EN' : 'BG'}
        </Button>

        {editable && (
          <>
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
          </>
        )}
      </Box>
    </Box>
  );
}
