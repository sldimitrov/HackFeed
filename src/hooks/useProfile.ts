import { useQuery } from '@tanstack/react-query';
import { QUERY_PROFILE } from '../contants/queryKeys.ts';
import ProfileService from '../services/profileService.ts';

export function useUserProfile(userId: string | undefined) {
  return useQuery({
    queryKey: [QUERY_PROFILE, userId],
    queryFn: () => {
      if (!userId) throw new Error('Missing user ID');
      return ProfileService.getCurrentProfile(userId);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // consider data fresh for 5 mins
    gcTime: 1000 * 60 * 10, // keep it in memory for 10 mins
  });
}
