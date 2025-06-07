import { supabase } from '../lib/supabaseClient.ts';
import type { UserProfile } from '../types/profile.ts';

export default class UserService {
  static async getProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();

    if (error) throw new Error(error.message);
    return data;
  }

  static async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
    const { error } = await supabase.from('profiles').update(updates).eq('id', userId);

    if (error) throw new Error(error.message);
  }

  static async deleteProfile(userId: string): Promise<void> {
    const { error } = await supabase.from('profiles').delete().eq('id', userId);

    if (error) throw new Error(error.message);
  }
}
