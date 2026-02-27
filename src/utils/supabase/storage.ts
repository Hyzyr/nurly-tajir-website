import { supabase } from './client';
import { UploadProgressItem } from '@/UI/components/form/MultiImageUploader';

export async function uploadImage(
  folder: string,
  path: string,
  file: File
): Promise<string | null> {
  try {
    const fullPath = `${folder}/${path}`;

    const { data, error } = await supabase.storage
      .from('website-images')
      .upload(fullPath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.error('Storage upload error:', error);
      throw error;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('website-images').getPublicUrl(data.path);

    return publicUrl;
  } catch (error: unknown) {
    if (error instanceof Error && error.message?.includes('row-level security')) {
      console.error(
        'RLS Policy Error: Please set up storage policies. See storage.ts for SQL commands.'
      );
    }
    console.error('Error uploading image:', error);
    return null;
  }
}

/**
 * Upload multiple files sequentially, reporting per-file progress via callback.
 * Progress values: 0 = queued, 50 = uploading, 100 = done, -1 = error.
 */
export async function uploadImages(
  folder: string,
  files: File[],
  onProgress: (items: UploadProgressItem[]) => void
): Promise<string[]> {
  // Initialise all items as queued (0 %)
  const progress: UploadProgressItem[] = files.map((f) => ({ name: f.name, progress: 0 }));
  onProgress([...progress]);

  const urls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    // Mark as in-flight
    progress[i] = { name: file.name, progress: 50 };
    onProgress([...progress]);

    const timestamp = Date.now();
    const url = await uploadImage(folder, `product-${timestamp}-${file.name}`, file);

    if (url) {
      progress[i] = { name: file.name, progress: 100, url };
      urls.push(url);
    } else {
      progress[i] = { name: file.name, progress: -1 };
    }

    onProgress([...progress]);
  }

  return urls;
}

export async function deleteImage(folder: string, path: string): Promise<boolean> {
  try {
    const fullPath = `${folder}/${path}`;
    const { error } = await supabase.storage.from('website-images').remove([fullPath]);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}
