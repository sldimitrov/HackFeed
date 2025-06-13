import { useReportedPosts } from '../../../hooks/useReportedPostIds.ts';
import PostsSection from '../Posts/PostsSection.tsx';
import type { Post } from '../../../types/post.ts';

interface Props {
  posts: Post[];
  loading: boolean;
}

export default function Reports({ posts, loading }: Props) {
  const { data: reportedPosts, isLoading: loadingReports } = useReportedPosts();

  return <PostsSection loading={loading || loadingReports} posts={posts} reports={reportedPosts} />;
}
