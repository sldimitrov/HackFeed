import { Box, Typography } from '@mui/material';

export default function PostContent({
  content,
  expanded,
  isLong,
}: {
  content: string;
  expanded: boolean;
  isLong: boolean;
}) {
  const displayContent = expanded ? content : content.slice(0, 175);

  return (
    <Box display="flex" alignItems="center" pl={1} gap={1} mb={1}>
      <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
        {displayContent}
        {isLong && !expanded && '...'}
      </Typography>
    </Box>
  );
}
