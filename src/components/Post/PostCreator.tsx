import { TextField, Button, Box } from '@mui/material';
import { useUser } from '../../hooks/useUser.ts';
import { useState } from 'react';
import { useCreatePost } from '../../hooks/useCreatePost.ts';

export default function PostCreator() {
  const user = useUser();
  const [content, setContent] = useState('');

  const createPostMutation = useCreatePost();

  const handleSubmit = async () => {
    if (!content.trim() || !user?.id) {
      return;
    }

    createPostMutation.mutate(
      { content, user_id: user.id },
      {
        onSuccess: () => {
          // TODO: Add success toast
          setContent('');
        },
        onError: (error) => {
          // TODO: Add error toast
          console.log('Error creating post:', error);
        },
      },
    );
  };

  return (
    <Box marginBottom="25px" bgcolor="white" className="rounded-lg shadow-md p-4 mb-4">
      <TextField
        fullWidth
        multiline
        rows={2}
        value={content}
        placeholder="Share something to the community..."
        variant="outlined"
        onChange={(e) => setContent(e.target.value)}
      />
      <Box className="flex justify-end mt-2">
        <Button
          sx={{ marginY: '5px', marginX: '15px', height: '30px' }}
          variant="contained"
          color="warning"
          onClick={handleSubmit}
        >
          Post
        </Button>
      </Box>
    </Box>
  );
}
