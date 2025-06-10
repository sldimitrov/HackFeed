export interface UserProfile {
  id: string;
  email: string;
  name: string;
  title: string;
  avatar_url: string;
  created_at: string;
}

export interface EditableProfile {
  name: string;
  title: string;
  avatar_url: string;
}

export interface CommonProfileProps {
  editable: boolean;
  editMode: boolean;
  saving?: boolean;
  formData: EditableProfile;
  setEditMode: (v: boolean) => void;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSave: (data?: EditableProfile) => void;
}

export interface UserProfileCardProps {
  id: string;
  name: string;
  title: string;
  avatar: string;
  likes: number;
  posts: number;
  onEdit?: () => void;
}
