import { useQuery } from '@tanstack/react-query';
import { Box, Typography, CircularProgress, Paper, Divider } from '@mui/material';
import ReportService from '../../../services/reportsService.ts';

export default function Reports() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['reports'],
    queryFn: ReportService.getReports,
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="error">Грешка при зареждане на докладите</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Докладвани постове
      </Typography>

      {data.length === 0 ? (
        <Typography>Няма докладвани постове.</Typography>
      ) : (
        data.map((report) => (
          <Paper key={report.id} sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1">
              <strong>Докладван от:</strong> {report.reporter?.name || 'Анонимен'}
            </Typography>
            <Typography>
              <strong>Причина:</strong> {report.reason}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography>
              <strong>Пост:</strong> {report.post?.content || '[Изтрит]'}
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
}
