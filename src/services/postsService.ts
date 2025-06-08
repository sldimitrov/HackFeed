import { supabase } from '../lib/supabaseClient.ts';
import type { Post } from '../types/post.ts';

export default class PostsService {
  static async list(): Promise<Post[]> {
    const { data, error } = await supabase
      .from('feed_posts_extended')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data as Post[];
  }

  static async listByUser(): Promise<Post[]> {
    const { data, error } = await supabase
      .from('posts')
      .select('*, user:profiles(name, avatar_url, title)')
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

  static async delete(id: string): Promise<void> {
    const { error } = await supabase.from('posts').delete().eq('id', id);

    if (error) throw new Error(error.message);
  }
}
