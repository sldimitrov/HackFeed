import PostsService from '../services/postsService.ts';
import { QUERY_POSTS, QUERY_USER_POSTS } from '../contants/queryKeys.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Post } from '../types/post.ts';

export function usePosts(enabled = true) {
  return useQuery({
    queryKey: [QUERY_POSTS],
    queryFn: () => PostsService.list(),
    staleTime: 10000,
    enabled,
  });
}

export function useUserPosts(user_id: string) {
  return useQuery<Post[]>({
    queryKey: [QUERY_USER_POSTS],
    queryFn: () => PostsService.listByUser(user_id),
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post_id: number) => PostsService.delete(String(post_id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_POSTS] });
    },
  });
}
