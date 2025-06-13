import { useMemo } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { Post, ReportDetail } from '../../../types/post.ts';
import { useCommentsBatch } from '../../../hooks/useComments.ts';
import NoPosts from '../../../components/Post/NoPosts.tsx';
import PostCard from '../../../components/Post/PostCard.tsx';

interface Props {
  loading: boolean;
  posts: Post[];
  reports?: ReportDetail[];
}

export default function PostsSection({ loading, posts, reports = [] }: Props) {
  const { t } = useTranslation();

  const reportedPostIds = useMemo(() => {
    return [...new Set(reports.map((r) => r.post_id))];
  }, [reports]);

  const postIds = useMemo(() => posts.map((p) => String(p.id)), [posts]);
  const { data: groupedComments } = useCommentsBatch(postIds);
  const isReportedView = reports.length > 0;

  const reportsByPostId = useMemo(() => {
    const map: Record<number, ReportDetail[]> = {};
    for (const report of reports) {
      if (!map[report.post_id]) map[report.post_id] = [];
      map[report.post_id].push(report);
    }
    return map;
  }, [reports]);

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
        posts
          .filter((post) => !isReportedView || reportedPostIds.includes(post.id))
          .map((post: Post) => {
            const isRepost = post.shared;
            const key = isRepost ? `repost-${post.id}-${post.shared_by_id}` : `post-${post.id}`;
            const comments = groupedComments?.[post.id] ?? [];
            const isReported = reportedPostIds.includes(post.id);
            const reportDetails = reportsByPostId[post.id] || [];

            return (
              <PostCard
                key={key}
                post={post}
                comments={comments}
                isReported={isReported}
                reports={reportDetails}
              />
            );
          })
      )}
    </Box>
  );
}
