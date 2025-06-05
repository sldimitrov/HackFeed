import { Box, Container, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard.tsx';
import type { Post } from '../../types/post.ts';
import PostCreator from '../../components/Post/PostCreator.tsx';
import PostCard from '../../components/Post/PostCard.tsx';
import { mockPosts } from '../../mock/mockPosts.ts';

export function Feed() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
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

        {/* Right side: Create post and feed */}
        <Box flexGrow={1} width="100%">
          <PostCreator />
          {mockPosts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default Feed;
