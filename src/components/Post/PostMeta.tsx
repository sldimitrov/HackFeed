import { Box, Button, CircularProgress, IconButton, Typography } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import { useTranslation } from 'react-i18next';
import { toast } from '../../utils/toast.ts';
import ReportService from '../../services/reportsService.ts';
import type { ReportDetail } from '../../types/post.ts';
import ReportDetailsDialog from '../Base/ReportDetailsDialog.tsx';
import { useState } from 'react';
import ReportDialog from '../Base/ReportDialog.tsx';

interface PostMetaProps {
  likeCount: number;
  onSaveEdit?: () => void;
  onCancelEdit?: () => void;
  isEditing?: boolean;
  isSaving?: boolean;
  userId?: string;
  postId?: number;
  isReported?: boolean;
  reports?: ReportDetail[];
}

export default function PostMeta({
  likeCount,
  onSaveEdit,
  onCancelEdit,
  isEditing,
  isSaving,
  userId,
  postId,
  isReported = false,
  reports,
}: PostMetaProps) {
  const { t } = useTranslation();

  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [reportTargetPostId, setReportTargetPostId] = useState<number | null>(null);

  const handleReport = (postId: number) => {
    setReportTargetPostId(postId);
    setOpenReportDialog(true);
  };

  const handleReportSubmit = async (reason: string) => {
    if (!reportTargetPostId) return;

    try {
      await ReportService.reportPost(reportTargetPostId, reason, userId || '');
      toast.success(t('posts.reports.reportSuccess'));
    } catch (error) {
      toast.error(t('posts.reports.reportError'));
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
          gap: 1,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            sx={{
              width: 32,
              height: 32,
              backgroundColor: '#f9a825',
              marginLeft: '15px',
              color: 'white',
              '&:hover': {
                backgroundColor: '#f57f17',
              },
            }}
          >
            <ThumbUpOffAltIcon fontSize="small" />
          </IconButton>
          <Typography variant="caption" sx={{ paddingTop: '4px' }} color="text.secondary">
            {t('posts.meta.likes', { likeCount })}
          </Typography>
        </Box>

        {isReported ? (
          <Button
            color="error"
            sx={{
              backgroundColor: '#ffe6e6',
              borderRadius: '4px',
              textTransform: 'none',
              padding: '2px 4px',
              marginRight: '15px',
              cursor: 'pointer',
              maxWidth: '145px',
            }}
            onClick={() => setOpenDetailsDialog(true)}
          >
            {t('posts.reports.showReporterDetails')}
          </Button>
        ) : (
          <Box display="flex" alignItems="center">
            <Button
              size="small"
              variant="outlined"
              startIcon={<OutlinedFlagIcon fontSize="small" />}
              sx={{
                textTransform: 'none',
                borderRadius: '20px',
                padding: '2px 10px',
                fontSize: '0.75rem',
                color: '#e53935',
                marginRight: '15px',
                borderColor: '#e53935',
                '&:hover': {
                  backgroundColor: '#ffe6e6',
                  borderColor: '#d32f2f',
                },
              }}
              onClick={() => handleReport(postId || 0)}
            >
              Report
            </Button>
          </Box>
        )}
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
        </Box>
      )}

      <ReportDialog
        open={openReportDialog}
        onClose={() => setOpenReportDialog(false)}
        onSubmit={handleReportSubmit}
      />

      <ReportDetailsDialog
        open={openDetailsDialog}
        onClose={() => setOpenDetailsDialog(false)}
        reports={reports || []}
      />
    </Box>
  );
}
