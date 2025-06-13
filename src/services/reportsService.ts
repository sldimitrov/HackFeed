import { supabase } from '../lib/supabaseClient';

export default class ReportService {
  static async reportPost(postId: number, reason: string, userId: string) {
    const { error } = await supabase.from('reports').insert({
      post_id: postId,
      reason,
      reported_by: userId,
    });
    if (error) throw new Error(error.message);
  }

  static async getReports() {
    const { data, error } = await supabase
      .from('reports')
      .select('*, post:posts(content), reporter:profiles(name, avatar_url)')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  static async getReportedPostIds(): Promise<number[]> {
    const { data, error } = await supabase.from('reports').select('post_id');

    if (error) throw error;
    return data?.map((r) => r.post_id) ?? [];
  }
}
