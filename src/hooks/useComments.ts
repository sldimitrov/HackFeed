import { useQuery } from '@tanstack/react-query';
import CommentsService from '../services/commentsService.ts';
import type { PostComment } from '../types/post.ts';

export function useCommentsBatch(postIds: string[]) {
  return useQuery({
    queryKey: ['comments-batch', postIds.sort()],
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
