import { supabase } from '../lib/supabaseClient.ts';
import type { UserProfile } from '../types/profile.ts';

export default class UserService {
  static async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
    const { error } = await supabase.from('profiles').update(updates).eq('id', userId);

    if (error) throw new Error(error.message);
  }
}
