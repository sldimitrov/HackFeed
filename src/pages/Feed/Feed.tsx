import { Box, Button, CircularProgress, Container, useMediaQuery } from '@mui/material';
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard.tsx';
import type { Post } from '../../types/post.ts';
import PostCreator from '../../components/Post/PostCreator.tsx';
import PostCard from '../../components/Post/PostCard.tsx';
import { useUserProfile } from '../../hooks/useProfile.ts';
import { defaultProfile } from '../../contants/profile.ts';
import { useAuthStore } from '../../store/useAuthStore.ts';
import { Background } from '../../components/Base/Background.tsx';
import NoPosts from '../../components/Post/NoPosts.tsx';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useInfinitePosts } from '../../hooks/usePosts.ts';
import { warningButtonStyles } from '../../styles/buttonStyles.ts';
import { fetchNextPageSafe } from '../../utils/pagination.ts';
import { useCommentsBatch } from '../../hooks/useComments.ts';
import { MUTATION_TYPE } from '../../contants/mutationType.ts';

export function Feed() {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width:780px)');

  const { user } = useAuthStore();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfinitePosts();
  const { data: profile } = useUserProfile(user?.id);

  const posts = data?.pages.flat() ?? [];

  const postIds = useMemo(() => posts.map((p) => String(p.id)), [posts]);
  const { data: groupedComments } = useCommentsBatch(postIds);

  const { userPostsCount, totalUserLikes } = useMemo(() => {
    let count = 0;
    let likes = 0;

    if (posts && user?.id) {
      const postsForProfileCard = posts.filter((post: Post) => {
        const isMyOriginalAndNotShared = post.user_id === user.id && post.shared_by_id === null;
        const isSharedByMe = post.shared_by_id === user.id;

        return isMyOriginalAndNotShared || isSharedByMe;
      });

      count = postsForProfileCard.length;
      likes = postsForProfileCard.reduce(
        (sum: number, post: Post) => sum + (post.like_count || 0),
        0,
      );
    }

    return { userPostsCount: count, totalUserLikes: likes };
  }, [posts, user?.id]);

  return (
    <Box position="relative" minHeight="100vh" bgcolor="#f7f7f7" sx={{ overflowX: 'hidden' }}>
      <Background />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, mt: 5, pb: 5 }}>
        <Box
          display="flex"
          flexDirection={isMobile ? 'column' : 'row'}
          justifyContent="center"
          gap={4}
          maxWidth="838px"
          mx="auto"
        >
          {/* Left side: Profile card */}
          <Box flexShrink={0} width={isMobile ? '100%' : '260px'}>
            {profile && (
              <UserProfileCard
                id={user?.id || ''}
                name={profile?.name || defaultProfile.name}
                title={profile?.title || defaultProfile.title}
                avatar={profile?.avatar_url || defaultProfile.avatar_url}
                likes={totalUserLikes}
                posts={userPostsCount}
              />
            )}
          </Box>

          <Box flexGrow={1} width="100%">
            <PostCreator />

            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <CircularProgress />
              </Box>
            ) : posts && posts.length === 0 ? (
              <NoPosts message={t('profile.postsSection.noPosts')} />
            ) : (
              // TODO: Outsource the mapping logic outside the template for cleaner JSX
              posts.map((post: Post) => {
                const isRepost = post.shared;
                const key = isRepost ? `repost-${post.id}-${post.shared_by_id}` : `post-${post.id}`;
                const comments = groupedComments?.[post.id] ?? [];

                return (
                  <PostCard
                    key={key}
                    post={post}
                    comments={comments}
                    mutationType={MUTATION_TYPE.FEED_POST}
                    role={profile?.role}
                  />
                );
              })
            )}

            {hasNextPage && (
              <Box mt={2} display="flex" justifyContent="center">
                <Button
                  onClick={() => fetchNextPageSafe(fetchNextPage)}
                  disabled={isFetchingNextPage}
                  variant="contained"
                  color="warning"
                  sx={warningButtonStyles}
                >
                  {isFetchingNextPage ? t('feed.loadingMore') : t('feed.showMore')}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Feed;
