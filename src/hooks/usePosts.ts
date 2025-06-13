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
import { MUTATION_TYPE } from '../contants/mutationType.ts';
import type { MutationType } from '../types/mutation.ts';

export function useInfinitePosts(PAGE_SIZE: number = 5) {
  return useInfiniteQuery<Post[], Error, InfiniteData<Post[]>, string[], number>({
    queryKey: [QUERY_POSTS],
    queryFn: ({ pageParam = 0 }) => PostsService.list(pageParam, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length * PAGE_SIZE,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useUserPosts(user_id: string) {
  return useQuery<Post[]>({
    queryKey: [QUERY_USER_POSTS, user_id],
    queryFn: () => PostsService.listByUser(user_id),
    enabled: !!user_id,
    staleTime: 1000 * 60 * 3, // 3 minutes
    gcTime: 1000 * 60 * 6, // 6 minutes
  });
}

export function useUpdatePost(type: MutationType = MUTATION_TYPE.FEED_POST) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: UpdatePostPayload) => PostsService.update(id, content),
    onSuccess: () => {
      const queryKey = type === MUTATION_TYPE.USER_POST ? QUERY_USER_POSTS : QUERY_POSTS;
      queryClient.invalidateQueries({ queryKey: [queryKey] });
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
