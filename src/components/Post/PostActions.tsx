import { Box, CardActions, IconButton, Typography } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

interface PostActionsProps {
  liked: boolean;
  onLike: () => void;
  onShare: () => void;
  onDelete?: () => void;
  showDelete?: boolean;
  onToggleComments: () => void;
}

export default function PostActions({
  liked,
  onLike,
  onShare,
  onDelete,
  showDelete = false,
  onToggleComments,
}: PostActionsProps) {
  const { t } = useTranslation();

  return (
    <CardActions className="flex justify-between px-2 pb-2">
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={onLike}>
          <ThumbUpOffAltIcon sx={{ marginLeft: '5px', color: liked ? 'orange' : 'inherit' }} />
          <Typography variant="caption" sx={{ marginTop: '2px', paddingLeft: '4px' }}>
            {liked ? t('posts.actions.liked') : t('posts.actions.like')}
          </Typography>
        </IconButton>

        <IconButton onClick={onToggleComments}>
          <Typography variant="caption" sx={{ marginTop: '2px', paddingLeft: '4px' }}>
            💬 {t('posts.actions.comment')}
          </Typography>
        </IconButton>
      </Box>

      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={onShare}>
          <ReplyIcon style={{ transform: 'scaleX(-1)' }} />
          <Typography variant="caption" sx={{ marginTop: '4px', paddingLeft: '3px' }}>
            {t('posts.actions.share')}
          </Typography>
        </IconButton>

        {showDelete && onDelete && (
          <IconButton onClick={onDelete} color="error">
            <DeleteIcon fontSize="small" />
            <Typography variant="caption" sx={{ marginTop: '4px', paddingLeft: '3px' }}>
              {t('posts.actions.delete')}
            </Typography>
          </IconButton>
        )}
      </Box>
    </CardActions>
  );
}
