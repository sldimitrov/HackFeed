import { useQuery } from '@tanstack/react-query';
import ReportService from '../services/reportsService.ts';
import { QUERY_REPORTED_POSTS } from '../contants/queryKeys.ts';

export function useReportedPosts() {
  return useQuery({
    queryKey: [QUERY_REPORTED_POSTS],
    queryFn: ReportService.getReportedPost,
    staleTime: 1000 * 30, // 30 seconds
    gcTime: 1000 * 60 * 3, // 3 minutes
  });
}
