import { Box, CircularProgress, Typography } from '@mui/material';
import NoPosts from '../../../components/Post/NoPosts.tsx';
import type { Post } from '../../../types/post.ts';
import PostCard from '../../../components/Post/PostCard.tsx';

interface Props {
  loading: boolean;
  posts: Post[];
}

export default function PostsSection({ loading, posts }: Props) {
  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Posts
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      ) : posts.length === 0 ? (
        <NoPosts message="There are no posts to show yet." />
      ) : (
        posts.map((p) => <PostCard key={p.id} post={p} />)
      )}
    </Box>
  );
}
