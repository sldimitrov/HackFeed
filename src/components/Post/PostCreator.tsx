import { TextField, Button, Box } from '@mui/material';
import { useUser } from '../../hooks/useUser.ts';
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient.ts';

export default function PostCreator() {
  const [content, setContent] = useState('');
  const user = useUser();

  const handleSubmit = async () => {
    if (!content.trim()) {
      return;
    }

    const { error } = await supabase.from('posts').insert([{ content, user_id: user?.id }]);

    if (error) {
      console.error('Error posting:', error);
    } else {
      setContent('');
    }
  };

  return (
    <Box marginBottom="25px" bgcolor="white" className="rounded-lg shadow-md p-4 mb-4">
      <TextField
        fullWidth
        multiline
        rows={2}
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
