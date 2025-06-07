// hooks/useLikes.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LikesService from '../services/likesService';

export function useLikePost(post_id: number, user_id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => LikesService.like(post_id, user_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', String(post_id)] });
    },
  });
}

export function useUnlikePost(post_id: number, user_id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => LikesService.unlike(post_id, user_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', String(post_id)] });
    },
  });
}

export function useHasLiked(post_id: number, user_id: string) {
  return useQuery({
    queryKey: ['likes', post_id, user_id],
    queryFn: () => LikesService.hasLiked(post_id, user_id),
    enabled: !!post_id && !!user_id,
  });
}

export function useLikeCount(post_id: number) {
  return useQuery({
    queryKey: ['likes', post_id],
    queryFn: () => LikesService.count(post_id),
    enabled: !!post_id,
  });
}
