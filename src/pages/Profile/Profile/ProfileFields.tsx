import { TextField } from '@mui/material';
import type { EditableProfile } from '../../../types/profile.ts';

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

  return (
    <>
      <TextField
        name="name"
        label="Name"
        fullWidth
        margin="dense"
        value={formData.name}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <TextField
        name="title"
        label="Title"
        fullWidth
        margin="dense"
        value={formData.title}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <TextField
        name="avatar_url"
        label="Avatar URL"
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
