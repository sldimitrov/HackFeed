export interface UserProfile {
  id: string;
  email: string;
  name: string;
  title: string;
  avatar_url: string;
  created_at: string;
}

export interface UserProfileCardProps {
  id: string;
  name: string;
  title: string;
  avatar: string;
  likes: number;
  posts: number;
  onEdit?: () => void;
}
