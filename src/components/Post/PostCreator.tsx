import { TextField, Button, Box } from '@mui/material';
import { useState } from 'react';
import { useCreatePost } from '../../hooks/useCreatePost.ts';
import { useAuthStore } from '../../store/useAuthStore.ts';

export default function PostCreator() {
  const { user } = useAuthStore();
  const createPostMutation = useCreatePost();
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!content.trim() || !user?.id) return;

    createPostMutation.mutate(
      { content, user_id: user.id },
      {
        onSuccess: () => setContent(''),
        onError: (error) => console.error('Error creating post:', error),
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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
        placeholder="What’s on your hacker mind today?"
        variant="outlined"
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Box className="flex justify-end mt-2">
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="warning"
          sx={{
            textTransform: 'capitalize',
            fontWeight: 500,
            px: 3,
            m: 0.5,
            fontSize: '0.875rem',
            borderRadius: 2,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: '#f57c00',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            },
            '&:active': {
              transform: 'scale(0.98)',
            },
          }}
        >
          post
        </Button>
      </Box>
    </Box>
  );
}
