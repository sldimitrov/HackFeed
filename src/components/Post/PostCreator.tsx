import { TextField, Button, Box } from '@mui/material';
import { useUser } from '../../hooks/useUser.ts';

export default function PostCreator() {
  const user = useUser();

  console.log('Current user:', user);

  return (
    <Box marginBottom="25px" bgcolor="white" className="rounded-lg shadow-md p-4 mb-4">
      <TextField
        fullWidth
        multiline
        rows={2}
        placeholder="Share something to the community..."
        variant="outlined"
      />
      <Box className="flex justify-end mt-2">
        <Button
          sx={{ marginY: '5px', marginX: '15px', height: '30px' }}
          variant="contained"
          color="warning"
        >
          Post
        </Button>
      </Box>
    </Box>
  );
}
