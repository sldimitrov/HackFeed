import { TextField } from '@mui/material';
import type { EditableProfile } from '../../../types/profile.ts';
import { useTranslation } from 'react-i18next';

interface Props {
  editable: boolean;
  editMode: boolean;
  formData: EditableProfile;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
}

export default function ProfileFields({
  editable,
  editMode,
  formData,
  handleChange,
  handleKeyDown,
}: Props) {
  const disabled = !editable || !editMode;
  const { t } = useTranslation();

  return (
    <>
      <TextField
        name="name"
        label={t('profile.fields.name')}
        fullWidth
        margin="dense"
        value={formData.name}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <TextField
        name="title"
        label={t('profile.fields.title')}
        fullWidth
        margin="dense"
        value={formData.title}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <TextField
        name="avatar_url"
        label={t('profile.fields.avatarUrl')}
        fullWidth
        margin="dense"
        value={formData.avatar_url}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
    </>
  );
}
