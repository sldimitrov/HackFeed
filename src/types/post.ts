export interface Reactions {
  likes: number;
  comments: number;
  shares: number;
}

export interface Post {
  id: number;
  content: string;
  created_at: string;
  user_id: number;
}

export interface PostCardProps {
  post: Post;
}
