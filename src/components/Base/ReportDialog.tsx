import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ReportDialog({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}) {
  const [reason, setReason] = useState('');
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(reason);
      setReason('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t('reportDialog.title')}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {t('reportDialog.prompt')}
        </Typography>
        <Input
          fullWidth
          placeholder={t('reportDialog.placeholder')}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined">
          {t('reportDialog.cancel')}
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {t('reportDialog.submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
