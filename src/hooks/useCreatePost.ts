import { useMutation, useQueryClient } from '@tanstack/react-query';
import PostsService from '../services/postsService.ts';
import { QUERY_POSTS } from '../contants/queryKeys.ts';

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ content, user_id }: { content: string; user_id: string }) =>
      PostsService.create(content, user_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_POSTS] });
    },
  });
}
