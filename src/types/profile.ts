export interface UserProfileCardProps {
  name: string;
  title: string;
  avatar: string;
  likes: number;
  posts: number;
  onEdit?: () => void;
}
