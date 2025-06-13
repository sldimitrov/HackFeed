import { Box, Button, IconButton, Typography, CircularProgress } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import { useTranslation } from 'react-i18next';

interface PostMetaProps {
  likeCount: number;
  onSaveEdit?: () => void;
  onCancelEdit?: () => void;
  isEditing?: boolean;
  isSaving?: boolean;
}

export default function PostMeta({
  likeCount,
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexGrow: 1,
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

        <Box display="flex" alignItems="center">
          <Button
            size="small"
            startIcon={<OutlinedFlagIcon fontSize="small" />}
            sx={{
              textTransform: 'none',
              minWidth: 0,
              padding: 0,
              color: 'text.secondary',
              marginRight: '18px',
            }}
          >
            {t('posts.meta.report')}
          </Button>
        </Box>
      </Box>

      {isEditing && (
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
        </Box>
      )}
    </Box>
  );
}
