export interface Post {
  id: number;
  avatar_url: string;
  like_count: number;
  liked_by_current_user: boolean;
  name: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}

export interface PostCardProps {
  post: Post;
}
