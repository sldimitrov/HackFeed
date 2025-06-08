import { Box, Typography } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

export default function NoPostsBox({ message = 'No posts to display yet.' }: { message?: string }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="40vh"
      textAlign="center"
      px={2}
    >
      <SentimentDissatisfiedIcon color="disabled" sx={{ fontSize: 48, mb: 1 }} />
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}
