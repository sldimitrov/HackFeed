import { useEffect, useState } from 'react';
import ProfileService from '../services/profileService';
import { toast } from '../utils/toast';
import { TOAST_MESSAGES } from '../contants/toastMessages';
import KEYS from '../contants/keyCodes.ts';

export interface ProfileFormData {
  name: string;
  title: string;
  avatar_url: string;
}

interface UseProfileFormProps {
  profile?: ProfileFormData | null;
  userId?: string;
  onSaveSuccess?: () => void;
}

interface UseProfileFormReturn {
  formData: ProfileFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProfileFormData>>;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  saving: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: (data?: ProfileFormData) => Promise<void>;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

export const useProfileForm = ({
  profile,
  userId,
  onSaveSuccess,
}: UseProfileFormProps): UseProfileFormReturn => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    title: '',
    avatar_url: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  // Sync form data with profile when it loads
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        title: profile.title,
        avatar_url: profile.avatar_url,
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (data?: ProfileFormData): Promise<void> => {
    if (!userId) {
      console.error('User ID is not defined');
      return;
    }

    const dataToSave = data || formData;
    setSaving(true);

    try {
      await ProfileService.updateProfile(userId, dataToSave);
      toast.success(TOAST_MESSAGES.PROFILE_UPDATE_SUCCESS);
      setEditMode(false);
      onSaveSuccess?.();
    } catch (error) {
      console.error('Profile update failed:', error);
      toast.error(TOAST_MESSAGES.ERROR_GENERIC);
    } finally {
      setSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === KEYS.ENTER) {
      e.preventDefault();
      handleSave();
    }
  };

  return {
    formData,
    setFormData,
    editMode,
    setEditMode,
    saving,
    handleChange,
    handleSave,
    handleKeyDown,
  };
};
