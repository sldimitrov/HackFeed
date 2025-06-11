import PostsService from '../services/postsService.ts';
import { QUERY_POSTS, QUERY_USER_POSTS } from '../contants/queryKeys.ts';
import {
  type InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type { Post, UpdatePostPayload } from '../types/post.ts';

export function useInfinitePosts() {
  const PAGE_SIZE = 5;

  return useInfiniteQuery<Post[], Error, InfiniteData<Post[]>, string[], number>({
    queryKey: [QUERY_POSTS],
    queryFn: ({ pageParam = 0 }) => PostsService.list(pageParam, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length * PAGE_SIZE,
    staleTime: 10000,
  });
}

export function useUserPosts(user_id: string) {
  return useQuery<Post[]>({
    queryKey: [QUERY_USER_POSTS],
    queryFn: () => PostsService.listByUser(user_id),
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: UpdatePostPayload) => PostsService.update(id, content),
    onSuccess: () => {
      // Invalidate or refetch post list
      queryClient.invalidateQueries({ queryKey: [QUERY_POSTS] });
    },
    onError: (error) => {
      console.error('Failed to update post:', error);
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ post_id, shared }: { post_id: number; shared: boolean }) =>
      PostsService.delete(String(post_id), shared),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_POSTS] });
    },
  });
}
