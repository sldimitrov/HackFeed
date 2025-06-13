import { Box, Button, IconButton, Typography, CircularProgress } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import { useTranslation } from 'react-i18next';
import { toast } from '../../utils/toast.ts';
import ReportService from '../../services/reportsService.ts';

interface PostMetaProps {
  likeCount: number;
  onSaveEdit?: () => void;
  onCancelEdit?: () => void;
  isEditing?: boolean;
  isSaving?: boolean;
  userId?: string;
  postId?: number;
}

export default function PostMeta({
  likeCount,
  onSaveEdit,
  onCancelEdit,
  isEditing,
  isSaving,
  userId,
  postId,
}: PostMetaProps) {
  const { t } = useTranslation();

  const handleReport = async (postId: number) => {
    console.log('handleReport called with postId:', postId);
    const reason = prompt('Защо докладваш този пост?');
    if (!reason) return;

    try {
      await ReportService.reportPost(postId, reason, userId || '');
      toast.success('Докладът беше изпратен');
    } catch (error) {
      toast.error('Проблем при докладването');
      console.error(error);
    }
  };

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
            onClick={() => handleReport(postId || 0)}
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
