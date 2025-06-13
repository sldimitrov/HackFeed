import { useReportedPosts } from '../../../hooks/useReportedPostIds.ts';
import PostsSection from '../Posts/PostsSection.tsx';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useInfinitePosts } from '../../../hooks/usePosts.ts';
import type { UserProfile } from '../../../types/profile.ts';

interface Props {
  loading: boolean;
  profile?: UserProfile;
}

export default function Reports({ loading, profile }: Props) {
  const { data, isLoading } = useInfinitePosts(100);
  const posts = data?.pages.flat() ?? [];

  const { data: reportedPosts, isLoading: loadingReports } = useReportedPosts();

  if (profile?.role && profile?.role !== 'admin') {
    return;
  }

  if (!reportedPosts || reportedPosts.length <= 0 || isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="20px"
        height="100%"
      >
        {loadingReports ? (
          <CircularProgress />
        ) : (
          <Typography variant="body1" color="text.secondary">
            No reported posts found.
          </Typography>
        )}
      </Box>
    );
  }

  return <PostsSection loading={loading || loadingReports} posts={posts} reports={reportedPosts} />;
}
