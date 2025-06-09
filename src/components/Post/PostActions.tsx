import { Box, CardActions, IconButton, Typography } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';

interface PostActionsProps {
  liked: boolean;
  onLike: () => void;
  onShare: () => void;
  onDelete?: () => void;
  showDelete?: boolean;
}

export default function PostActions({
  liked,
  onLike,
  onShare,
  onDelete,
  showDelete = false,
}: PostActionsProps) {
  return (
    <CardActions className="flex justify-between px-2 pb-2">
      {/* Like */}
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={onLike}>
          <ThumbUpOffAltIcon sx={{ marginLeft: '5px', color: `${liked && 'orange'}` }} />
          <Typography variant="caption" sx={{ marginTop: '2px', paddingLeft: '4px' }}>
            {liked ? 'Liked' : 'Like'}
          </Typography>
        </IconButton>
      </Box>

      {/* Share + Delete */}
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={onShare}>
          <ReplyIcon style={{ transform: 'scaleX(-1)' }} />
          <Typography variant="caption" sx={{ marginTop: '4px', paddingLeft: '3px' }}>
            Share
          </Typography>
        </IconButton>

        {showDelete && onDelete && (
          <IconButton onClick={onDelete} color="error">
            <DeleteIcon fontSize="small" />
            <Typography variant="caption" sx={{ marginTop: '4px', paddingLeft: '3px' }}>
              Delete
            </Typography>
          </IconButton>
        )}
      </Box>
    </CardActions>
  );
}
