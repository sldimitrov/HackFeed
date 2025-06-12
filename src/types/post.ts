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

export type PostComment = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  post_id: string;
  profiles: {
    name: string;
    avatar_url: string | null;
  };
};

export interface PostCardProps {
  post: Post;
  mutationType?: MutationType;
  comments: PostComment[] | undefined;
}

export interface UpdatePostPayload {
  id: string;
  content: string;
}
