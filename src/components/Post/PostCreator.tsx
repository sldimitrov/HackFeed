import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useCreatePost } from '../../hooks/useCreatePost.ts';
import { useAuthStore } from '../../store/useAuthStore.ts';
import { toast } from '../../utils/toast.ts';
import KEYS from '../../contants/keyCodes.ts';
import { useTranslation } from 'react-i18next';
import { warningButtonStyles } from '../../styles/buttonStyles.ts';

export default function PostCreator() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const createPostMutation = useCreatePost();
  const [content, setContent] = useState('');

  // TODO: Outsource service logic into a separate file
  const handleSubmit = async () => {
    if (!content.trim() || !user?.id || content.trim().length < 5) {
      toast.error(t('toast.posts.createContentTooShort'));
      return;
    }

    try {
      await createPostMutation.mutateAsync({ content, user_id: user.id });
      toast.success(t('toast.posts.createSuccess'));
      setContent('');
    } catch (error: any) {
      if (error.message.includes('row-level security')) {
        toast.error(t('toast.posts.createTooFast'));
      } else {
        toast.error(t('toast.posts.createFailure'));
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === KEYS.ENTER && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Box marginBottom="25px" bgcolor="white" className="rounded-lg shadow-md p-4 mb-4">
      <TextField
        fullWidth
        multiline
        rows={2}
        value={content}
        placeholder={t('posts.creator.placeholder')}
        variant="outlined"
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Box className="flex justify-end mt-2">
        <Button onClick={handleSubmit} variant="contained" color="warning" sx={warningButtonStyles}>
          {t('posts.creator.postButton')}
        </Button>
      </Box>
    </Box>
  );
}
