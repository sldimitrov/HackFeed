import type { MutationType } from './mutation.ts';

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
  shared_at?: string;
  shared_by_avatar_url: string;
  shared_by_name: string;
  shared_by_title?: string;
  share_count: number;
  shared_by_id?: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles: {
    name: string;
    avatar_url: string | null;
  };
}

export interface PostCardProps {
  post: Post;
  mutationType?: MutationType;
}

export interface UpdatePostPayload {
  id: string;
  content: string;
}
