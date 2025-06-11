import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  content?: string;
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  content,
}: ConfirmDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} disableScrollLock>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('posts.confirmDialog.cancel')}</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          {t('posts.confirmDialog.delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
