import { useQuery } from '@tanstack/react-query';
import CommentsService from '../services/commentsService';
import type { Comment } from '../types/post.ts';

export function useComments(postId: string) {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: async (): Promise<Comment[]> => {
      const { data, error } = await CommentsService.getByPost(postId);
      if (error) throw new Error(error.message);

      return (data ?? []).map((comment) => ({
        ...comment,
        profiles: {
          name: comment.profiles.name || '',
          avatar_url: comment.profiles.avatar_url || null,
        },
      }));
    },
  });
}
