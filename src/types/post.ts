export interface Post {
  id: number;
  content: string;
  created_at: string;
  image?: string;
  reactions?: number;
  user: {
    name: string;
    title: string;
    avatar: string;
  };
}

export interface PostCardProps {
  post: Post;
}
