import { supabase } from '../lib/supabaseClient';

export default class LikesService {
  static async like(post_id: number, user_id: string) {
    const { error } = await supabase.from('likes').insert([{ post_id, user_id }]);
    if (error) throw new Error(error.message);
  }

  static async unlike(post_id: number, user_id: string) {
    const { error } = await supabase.from('likes').delete().match({ post_id, user_id });
    if (error) throw new Error(error.message);
  }

  static async hasLiked(post_id: number, user_id: string): Promise<boolean> {
    const { data, error } = await supabase.from('likes').select('*').match({ post_id, user_id });
    if (error) throw new Error(error.message);
    return data.length > 0;
  }

  static async count(post_id: number): Promise<number> {
    const { count, error } = await supabase
      .from('likes')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', post_id);
    if (error) throw new Error(error.message);
    return count || 0;
  }
}
