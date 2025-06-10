import { useState } from 'react';
import { ImageUploader } from '../services/uploadPhoto';
import { toast } from '../utils/toast';
import { TOAST_MESSAGES } from '../contants/toastMessages';

interface UseAvatarUploadProps {
  onUploadComplete: (url: string) => void;
}

interface UseAvatarUploadReturn {
  uploading: boolean;
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  uploadError: string | null;
}

export const useAvatarUpload = ({
  onUploadComplete,
}: UseAvatarUploadProps): UseAvatarUploadReturn => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file: File | undefined = e.target.files?.[0];
    if (!file) return;

    // Reset previous errors
    setUploadError(null);
    setUploading(true);

    try {
      const uploader: ImageUploader = new ImageUploader();
      const uploadedUrl: string | null = await uploader.upload(file);

      if (uploadedUrl) {
        onUploadComplete(uploadedUrl);
        toast.success('Avatar uploaded successfully!');
      } else {
        throw new Error('Upload failed - no URL returned');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setUploadError(errorMessage);
      toast.error(TOAST_MESSAGES.ERROR_GENERIC);
      console.error('Avatar upload failed:', error);
    } finally {
      setUploading(false);
      // Clear the input so the same file can be uploaded again if needed
      e.target.value = '';
    }
  };

  return {
    uploading,
    handleUpload,
    uploadError,
  };
};
