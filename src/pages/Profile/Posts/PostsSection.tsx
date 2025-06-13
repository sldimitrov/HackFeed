import { useMemo } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { Post } from '../../../types/post.ts';
import { useCommentsBatch } from '../../../hooks/useComments.ts';
import NoPosts from '../../../components/Post/NoPosts.tsx';
import PostCard from '../../../components/Post/PostCard.tsx';

interface Props {
  loading: boolean;
  posts: Post[];
  reportedPostIds?: number[];
}

export default function PostsSection({ loading, posts, reportedPostIds = [] }: Props) {
  const { t } = useTranslation();

  const postIds = useMemo(() => posts.map((p) => String(p.id)), [posts]);
  const { data: groupedComments } = useCommentsBatch(postIds);
  const isReportedView = reportedPostIds.length > 0;

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        {isReportedView ? 'Reported Posts' : t('profile.postsSection.title')}
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
          const isReported = reportedPostIds.includes(post.id);

          return <PostCard key={key} post={post} comments={comments} isReported={isReported} />;
        })
      )}
    </Box>
  );
}
