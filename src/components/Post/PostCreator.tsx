import { TextField, Button, Box } from '@mui/material';

export default function PostCreator() {
  return (
    <Box className="bg-white rounded-lg shadow-md p-4 mb-4">
      <TextField
        fullWidth
        multiline
        rows={3}
        placeholder="Share something to the community..."
        variant="outlined"
      />
      <Box className="flex justify-end mt-2">
        <Button variant="contained" color="warning">
          Post
        </Button>
      </Box>
    </Box>
  );
}
