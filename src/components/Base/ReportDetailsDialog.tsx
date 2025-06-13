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

interface ReportDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  reports: ReportDetail[];
}

export default function ReportDetailsDialog({ open, onClose, reports }: ReportDetailsDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" disableScrollLock>
      <DialogTitle>Reported Post Details</DialogTitle>
      <DialogContent dividers>
        {reports.length === 0 ? (
          <DialogContentText>No reports found for this post.</DialogContentText>
        ) : (
          <List dense>
            {reports.map((report, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Reason: ${report.reason}`}
                  secondary={`Reported by: ${report.profiles?.name ?? report.reported_by}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
