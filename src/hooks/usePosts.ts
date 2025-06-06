import PostsService from '../services/postsService.ts';
import { QUERY_POSTS } from '../contants/queryKeys.ts';
import { useQuery } from '@tanstack/react-query';

export function usePosts(enabled = true) {
  return useQuery({
    queryKey: [QUERY_POSTS],
    queryFn: () => PostsService.list(),
    staleTime: 10000,
    enabled,
  });
}
