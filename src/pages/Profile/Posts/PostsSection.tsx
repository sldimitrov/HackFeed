import { Box, CircularProgress, Typography } from '@mui/material';
import NoPosts from '../../../components/Post/NoPosts.tsx';
import type { Post } from '../../../types/post.ts';
import PostCard from '../../../components/Post/PostCard.tsx';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useCommentsBatch } from '../../../hooks/useComments.ts';

interface Props {
  loading: boolean;
  posts: Post[];
}

export default function PostsSection({ loading, posts }: Props) {
  const { t } = useTranslation();

  const postIds = useMemo(() => posts.map((p) => String(p.id)), [posts]);
  const { data: groupedComments } = useCommentsBatch(postIds);

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
        posts.map((post: Post) => {
          const isRepost = post.shared;
          const key = isRepost ? `repost-${post.id}-${post.shared_by_id}` : `post-${post.id}`;
          const comments = groupedComments?.[post.id] ?? [];

          return <PostCard key={key} post={post} comments={comments} />;
        })
      )}
    </Box>
  );
}
