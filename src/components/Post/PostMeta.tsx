import { Box, Button, IconButton, Typography, CircularProgress } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useTranslation } from 'react-i18next';

interface PostMetaProps {
  likeCount: number;
  isLong: boolean;
  expanded: boolean;
  onToggleExpand: () => void;
  onSaveEdit?: () => void;
  onCancelEdit?: () => void;
  isEditing?: boolean;
  isSaving?: boolean;
}

export default function PostMeta({
  likeCount,
  isLong,
  expanded,
  onToggleExpand,
  onSaveEdit,
  onCancelEdit,
  isEditing,
  isSaving,
}: PostMetaProps) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginBottom: '15px',
        gap: 1,
        '@media (max-width: 360px)': {
          flexDirection: 'column',
          alignItems: 'center',
        },
      }}
    >
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
          {t('posts.meta.likes', { likeCount })}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mr: 1,
          '@media (max-width: 360px)': {
            mt: 1,
            justifyContent: 'flex-end',
          },
        }}
      >
        {isEditing ? (
          <>
            <Button
              size="small"
              variant="contained"
              color="warning"
              onClick={onSaveEdit}
              disabled={isSaving}
            >
              {isSaving ? <CircularProgress size={16} /> : t('feed.save')}
            </Button>
            <Button size="small" variant="outlined" color="warning" onClick={onCancelEdit}>
              {t('feed.cancel')}
            </Button>
          </>
        ) : (
          isLong && (
            <Button size="small" onClick={onToggleExpand} sx={{ textTransform: 'none' }}>
              {expanded ? t('posts.meta.seeLess') : t('posts.meta.seeMore')}
            </Button>
          )
        )}
      </Box>
    </Box>
  );
}
