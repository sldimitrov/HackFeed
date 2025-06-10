import { Box, CircularProgress, Typography } from '@mui/material';
import NoPosts from '../../../components/Post/NoPosts.tsx';
import type { Post } from '../../../types/post.ts';
import PostCard from '../../../components/Post/PostCard.tsx';
import { useTranslation } from 'react-i18next';

interface Props {
  loading: boolean;
  posts: Post[];
}

export default function PostsSection({ loading, posts }: Props) {
  const { t } = useTranslation();

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        {t('profile.postsSection.title')}
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      ) : posts.length === 0 ? (
        <NoPosts message={t('profile.postsSection.noPosts')} />
      ) : (
        posts.map((p) => <PostCard key={p.id} post={p} />)
      )}
    </Box>
  );
}
