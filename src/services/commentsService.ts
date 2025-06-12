import { supabase } from '../lib/supabaseClient.ts';
import type { PostComment } from '../types/post.ts';
import type { PostgrestError } from '@supabase/supabase-js';

class CommentsService {
  async getByPostIds(postIds: string[]): Promise<{
    data: PostComment[] | null;
    error: PostgrestError | null;
  }> {
    const { data, error } = await supabase
      .from('comments')
      .select(`id, content, created_at, user_id, post_id, profiles:profiles(name, avatar_url)`)
      .in('post_id', postIds)
      .order('created_at', { ascending: true });

    if (error) {
      return { data: null, error };
    }

    const normalizedData = (data ?? []).map((comment: any) => ({
      ...comment,
      profiles: Array.isArray(comment.profiles) ? comment.profiles[0] : comment.profiles,
    }));

    return {
      data: normalizedData as PostComment[],
      error: null,
    };
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
