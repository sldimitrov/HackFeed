import type { UserProfile } from './profile.ts';

export interface Reactions {
  likes: number;
  comments: number;
  shares: number;
}

export interface Post {
  id: number;
  content: string;
  created_at: string;
  user_id: string;
  user: UserProfile;
}

export interface PostCardProps {
  post: Post;
}
