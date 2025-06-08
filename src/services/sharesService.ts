import { supabase } from '../lib/supabaseClient';

export default class ShareService {
  static async sharePost(post_id: number, user_id: string) {
    const { error } = await supabase.from('shares').insert([{ post_id, user_id }]);
    if (error) throw error;
  }
}
