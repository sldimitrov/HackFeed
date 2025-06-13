import KEYS from '../contants/keyCodes.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import ProfileService from '../services/profileService.ts';
import { toast } from '../utils/toast.ts';
import { QUERY_PROFILE, QUERY_REPORTED_POSTS, QUERY_USER_POSTS } from '../contants/queryKeys.ts';
import { useTranslation } from 'react-i18next';
import type {
  ProfileFormData,
  UseProfileFormProps,
  UseProfileFormReturn,
} from '../types/profile.ts';

export const useProfileForm = ({
  profile,
  userId,
  onSaveSuccess,
}: UseProfileFormProps): UseProfileFormReturn => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    title: '',
    avatar_url: '',
  });

  const [editMode, setEditMode] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: ProfileFormData) => {
      if (!userId) throw new Error('User ID is not defined');
      return ProfileService.updateProfile(userId, data);
    },
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_PROFILE, userId],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_USER_POSTS, userId],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_REPORTED_POSTS],
        });
      }
      setEditMode(false);
      onSaveSuccess?.();
    },
    onError: () => {
      toast.error(t('toast.auth.errorGeneric'));
    },
  });

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
    const dataToSave = data || formData;
    mutation.mutate(dataToSave);
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
    saving: mutation.isPending,
    handleChange,
    handleSave,
    handleKeyDown,
  };
};
