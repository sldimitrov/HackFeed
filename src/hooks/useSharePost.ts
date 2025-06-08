import { useMutation, useQueryClient } from '@tanstack/react-query';
import ShareService from '../services/sharesService';
import { QUERY_POSTS } from '../contants/queryKeys.ts';

export function useSharePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ post_id, user_id }: { post_id: number; user_id: string }) =>
      ShareService.sharePost(post_id, user_id),
    onSuccess: () => {
      // Refetch posts after a share to update feed
      queryClient.invalidateQueries({ queryKey: [QUERY_POSTS] });
    },
  });
}
