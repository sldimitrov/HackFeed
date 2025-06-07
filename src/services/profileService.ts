// src/services/profileService.ts
import type { UserProfile } from '../types/profile.ts';
import { supabase } from '../lib/supabaseClient.ts';

export default class ProfileService {
  static async getCurrentProfile(user_id: string): Promise<UserProfile | null> {
    console.log('user_id:', user_id);

    const { data, error } = await supabase.from('profiles').select('*').eq('id', user_id).single();

    if (error) {
      console.error('Error fetching profile:', error.message);
      return null;
    }

    return data as UserProfile;
  }

  static async updateProfile(user_id: string, updateData: Partial<UserProfile>): Promise<void> {
    const { error } = await supabase.from('profiles').update(updateData).eq('id', user_id);

    if (error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }
  }

  static async createProfile(user_id: string, initialData: Partial<UserProfile>): Promise<void> {
    const { error } = await supabase.from('profiles').insert([{ id: user_id, ...initialData }]);

    if (error) {
      throw new Error(`Failed to create profile: ${error.message}`);
    }
  }
}
