import { Box, CircularProgress, Container, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard.tsx';
import type { Post } from '../../types/post.ts';
import PostCreator from '../../components/Post/PostCreator.tsx';
import PostCard from '../../components/Post/PostCard.tsx';
import { usePosts } from '../../hooks/usePosts.ts';
import { useUserProfile } from '../../hooks/useProfile.ts';
import { defaultProfile } from '../../contants/profile.ts';
import { useAuthStore } from '../../store/useAuthStore.ts';
import { Background } from '../../components/Base/Background.tsx';
import NoPosts from '../../components/Post/NoPosts.tsx';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export function Feed() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { user } = useAuthStore();
  const { data: posts, isLoading } = usePosts();
  const { data: profile } = useUserProfile(user?.id);

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
      likes = postsForProfileCard.reduce((sum, post) => sum + (post.like_count || 0), 0);
    }

    return { userPostsCount: count, totalUserLikes: likes };
  }, [posts, user?.id]);

  return (
    <Box position="relative" minHeight="100vh" bgcolor="#f7f7f7" sx={{ overflowX: 'hidden' }}>
      <Background />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, mt: 5, pb: 10 }}>
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
              posts?.map((post: Post) => {
                const isRepost = post.shared;

                const key = isRepost ? `repost-${post.id}-${post.shared_by_id}` : `post-${post.id}`;

                return <PostCard key={key} post={post} />;
              })
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Feed;
