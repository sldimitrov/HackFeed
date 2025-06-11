import { supabase } from '../lib/supabaseClient.ts';
import type { Post } from '../types/post.ts';

export default class PostsService {
  static async list(offset = 0, limit = 5): Promise<Post[]> {
    const { data, error } = await supabase
      .from('feed_posts_shared')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1); // inclusive range

    if (error) throw new Error(error.message);
    return data as Post[];
  }

  static async listByUser(user_id: string): Promise<Post[]> {
    const { data, error } = await supabase
      .from('feed_posts_shared')
      .select('*')
      .or(`and(user_id.eq.${user_id},shared_by_id.is.null),shared_by_id.eq.${user_id}`)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data as Post[];
  }

  static async create(content: string, user_id: string): Promise<void> {
    const { error } = await supabase.from('posts').insert([{ content, user_id }]);

    if (error) throw new Error(error.message);
  }

  static async update(id: string, content: String): Promise<void> {
    const { error } = await supabase.from('posts').update({ content }).eq('id', id);

    if (error) throw new Error(error.message);
  }

  static async delete(id: string, shared: boolean = false): Promise<void> {
    if (!shared) {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase.from('shares').delete().eq('post_id', id);
      if (error) throw new Error(error.message);
    }
  }
}
