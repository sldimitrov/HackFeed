export interface Post {
  id: number;
  user_id: string;
  name: string;
  title: string;
  avatar_url: string;
  content: string;
  created_at: string;

  like_count: number;
  liked_by_current_user: boolean;

  shared: boolean;
  share_count: number;
  shared_at?: string;
  shared_by_id?: string;
  shared_by_name?: string;
}

export interface PostCardProps {
  post: Post;
}
