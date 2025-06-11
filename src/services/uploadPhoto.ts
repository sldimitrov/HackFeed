import { supabase } from '../lib/supabaseClient';
import { toast } from '../utils/toast.ts';
import i18next from 'i18next';

export class ImageUploader {
  private bucket: string;

  constructor(bucketName: string = 'images') {
    this.bucket = bucketName;
  }

  async upload(file: File): Promise<string | null> {
    if (!file) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage.from(this.bucket).upload(filePath, file);

    if (error) {
      console.error('Upload error:', error.message);
      toast.error(i18next.t('toast.settings.imageUploadFailed'));
      return null;
    }

    const { data } = supabase.storage.from(this.bucket).getPublicUrl(filePath);

    const imageUrl = data?.publicUrl;
    if (!imageUrl) {
      toast.error(i18next.t('toast.settings.imageUrlRetrievalFailed'));
      return null;
    }

    toast.success(i18next.t('toast.settings.imageUploadSuccess'));
    return imageUrl;
  }
}
