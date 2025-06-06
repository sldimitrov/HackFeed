import { Box, CircularProgress, Container, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard.tsx';
import type { Post } from '../../types/post.ts';
import PostCreator from '../../components/Post/PostCreator.tsx';
import PostCard from '../../components/Post/PostCard.tsx';
import orangeBG from '../../assets/hackSoftOrange.png';
import grayBG from '../../assets/hackSoftGray.png';
import { usePosts } from '../../hooks/usePosts.ts';

export function Feed() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { data: posts, isLoading } = usePosts();

  return (
    <Box position="relative" minHeight="100vh" bgcolor="#f7f7f7" sx={{ overflowX: 'hidden' }}>
      {/* Orange top-right background */}
      <Box
        component="img"
        src={orangeBG}
        alt="orange background"
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          zIndex: 0,
          width: 'auto',
          height: 'auto',
          maxWidth: '70%',
        }}
      />

      {/* Gray bottom-left background */}
      <Box
        component="img"
        src={grayBG}
        alt="gray background"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 0,
          width: 'auto',
          height: 'auto',
          maxWidth: '70%',
        }}
      />

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
            <UserProfileCard
              name="Ivaylo Bachvarov"
              title="Co-Founder, HackSoft"
              avatar="https://i.pravatar.cc/150?img=5"
              likes={210}
              posts={4}
            />
          </Box>

          <Box flexGrow={1} width="100%">
            <PostCreator />
            {!isLoading ? (
              posts ? (
                posts.map((post: Post) => <PostCard key={post.id} post={post} />)
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <CircularProgress />
                </Box>
              )
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <CircularProgress />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Feed;
