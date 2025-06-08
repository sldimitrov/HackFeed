import { Box, Button, IconButton, Typography } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

interface PostMetaProps {
  likeCount: number;
  isLong: boolean;
  expanded: boolean;
  onToggleExpand: () => void;
}

export default function PostMeta({ likeCount, isLong, expanded, onToggleExpand }: PostMetaProps) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ marginBottom: '15px' }}
      gap={1}
    >
      {/* Likes display */}
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton
          sx={{
            marginLeft: '18px',
            width: '25px',
            height: '25px',
            background: 'orange',
            color: 'white',
          }}
        >
          <ThumbUpOffAltIcon fontSize="small" />
        </IconButton>
        <Typography variant="caption" sx={{ paddingTop: '4px' }} color="text.secondary">
          {likeCount} likes
        </Typography>
      </Box>

      {/* Expand / Collapse */}
      <Box>
        {isLong && (
          <Button size="small" onClick={onToggleExpand} sx={{ mt: 1, textTransform: 'none' }}>
            {expanded ? 'See less' : 'See more'}
          </Button>
        )}
      </Box>
    </Box>
  );
}
