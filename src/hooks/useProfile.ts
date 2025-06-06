import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_PROFILE } from '../contants/queryKeys.ts';
import UserService from '../services/userService.ts';
import type { UserProfile } from '../types/profile.ts';

export function useUserProfile(userId: string | undefined) {
  return useQuery({
    queryKey: [QUERY_PROFILE, userId],
    queryFn: () => {
      if (!userId) throw new Error('Missing user ID');
      return UserService.getProfile(userId);
    },
    enabled: !!userId, // не се изпълнява без userId
  });
}

export function useUpdateUserProfile(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: Partial<UserProfile>) => UserService.updateProfile(userId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_PROFILE, userId] });
    },
  });
}
