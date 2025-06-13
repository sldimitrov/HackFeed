import { useQuery } from '@tanstack/react-query';
import ReportService from '../services/reportsService.ts';

export function useReportedPostIds() {
  return useQuery({
    queryKey: ['reported-post-ids'],
    queryFn: ReportService.getReportedPostIds,
  });
}
