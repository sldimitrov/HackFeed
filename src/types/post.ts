export interface Reactions {
  likes: number;
  comments: number;
  shares: number;
}

export interface Post {
  id: number;
  content: string;
  created_at: string;
  reactions?: Reactions;
  user: {
    name: string;
    title: string;
    avatar: string;
  };
}

export interface PostCardProps {
  post: Post;
}
