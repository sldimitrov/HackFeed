import { supabase } from '../lib/supabaseClient';
import { toast } from '../utils/toast.ts';

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
      toast.error('Image upload failed');
      return null;
    }

    const { data } = supabase.storage.from(this.bucket).getPublicUrl(filePath);

    const imageUrl = data?.publicUrl;
    if (!imageUrl) {
      toast.error('Failed to retrieve image URL');
      return null;
    }

    toast.success('Image uploaded successfully!');
    return imageUrl;
  }
}
