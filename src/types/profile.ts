import type { UserRoles } from './auth.ts';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  title: string;
  avatar_url: string;
  created_at: string;
  role: UserRoles;
}

export interface EditableProfile {
  name: string;
  title: string;
  avatar_url: string;
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

export interface ProfileFormData {
  name: string;
  title: string;
  avatar_url: string;
}

export interface UseProfileFormProps {
  profile?: ProfileFormData | null;
  userId?: string;
  onSaveSuccess?: () => void;
}

export interface UseProfileFormReturn {
  formData: ProfileFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProfileFormData>>;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  saving: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: (data?: ProfileFormData) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}
