import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CommentsService from '../services/commentsService.ts';
import type { PostComment } from '../types/post.ts';
import { QUERY_COMMENTS_BATCH } from '../contants/queryKeys.ts';

export function useCommentsBatch(postIds: string[]) {
  return useQuery({
    queryKey: [QUERY_COMMENTS_BATCH, postIds.sort()],
    enabled: postIds.length > 0,
    staleTime: 60 * 1000,
    gcTime: 3 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await CommentsService.getByPostIds(postIds);
      if (error) throw new Error(error.message);

      const grouped: Record<string, PostComment[]> = {};

      for (const comment of data ?? []) {
        const postId = comment.post_id;
        if (!grouped[postId]) grouped[postId] = [];
        grouped[postId].push({
          ...comment,
          profiles: {
            name: comment.profiles?.name || '',
            avatar_url: comment.profiles?.avatar_url || null,
          },
        });
      }

      return grouped;
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: string) => {
      const { error } = await CommentsService.delete(commentId);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments-batch'] });
    },
  });
}
