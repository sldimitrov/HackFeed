import { supabase } from '../lib/supabaseClient';
import type { ReportDetail } from '../types/post.ts';

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

  static async getReportedPost(): Promise<ReportDetail[]> {
    const { data, error } = await supabase.from('reports').select(`
    post_id,
    reason,
    reported_by,
    profiles!reported_by(name)
  `);

    if (error) throw error;
    return data as unknown as ReportDetail[];
  }
}
