import { supabase } from '../lib/supabaseClient.ts';

class CommentsService {
  async getByPost(postId: string) {
    return supabase
      .from('comments')
      .select(`id, content, created_at, user_id, post_id, profiles (name, avatar_url)`)
      .eq('post_id', postId)
      .order('created_at');
  }

  async create({
    post_id,
    user_id,
    content,
  }: {
    post_id: number;
    user_id: string;
    content: string;
  }) {
    return supabase.from('comments').insert([{ post_id, user_id, content }]);
  }
}

export default new CommentsService();
