import { useQuery } from '@tanstack/react-query';
import ReportService from '../services/reportsService.ts';

export function useReportedPosts() {
  return useQuery({
    queryKey: ['reported-posts'],
    queryFn: ReportService.getReportedPost,
  });
}
