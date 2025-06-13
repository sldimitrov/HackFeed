import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import type { ReportDetail } from '../../types/post.ts';
import { useTranslation } from 'react-i18next';

interface ReportDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  reports: ReportDetail[];
}

export default function ReportDetailsDialog({ open, onClose, reports }: ReportDetailsDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" disableScrollLock>
      <DialogTitle>{t('posts.reports.dialogTitle')}</DialogTitle>
      <DialogContent dividers>
        {reports.length === 0 ? (
          <DialogContentText>{t('posts.reports.noReportsFound')}</DialogContentText>
        ) : (
          <List dense>
            {reports.map((report, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${t('posts.reports.reason')} ${report.reason}`}
                  secondary={`${t('posts.reports.reportedBy')} ${report.profiles?.name ?? report.reported_by}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          {t('posts.reports.closeButton')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
