// utils/toast.ts
import { useSnackbar } from 'notistack';

let useSnackbarRef: any;
export const SnackbarUtilsConfigurator = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

export const toast = {
  success(msg: string) {
    useSnackbarRef.enqueueSnackbar(msg, { variant: 'success' });
  },
  error(msg: string) {
    useSnackbarRef.enqueueSnackbar(msg, { variant: 'error' });
  },
  info(msg: string) {
    useSnackbarRef.enqueueSnackbar(msg, { variant: 'info' });
  },
  warning(msg: string) {
    useSnackbarRef.enqueueSnackbar(msg, { variant: 'warning' });
  },
};
