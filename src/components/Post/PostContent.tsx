import { Box } from '@mui/material';
import { TruncatedText } from '../Base/TruncatedText.tsx';

export default function PostContent({ content }: { content: string }) {
  return (
    <Box display="flex" alignItems="center" pl={1} gap={1} mb={1}>
      <TruncatedText text={content} maxLength={156} />
    </Box>
  );
}
