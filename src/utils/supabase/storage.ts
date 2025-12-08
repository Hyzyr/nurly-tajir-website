import { supabase } from './client';


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

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('website-images').getPublicUrl(data.path);

    return publicUrl;
  } catch (error: unknown) {
    if (error instanceof Error && error.message?.includes('row-level security')) {
      console.error('RLS Policy Error: Please set up storage policies. See storage.ts for SQL commands.');
    }
    console.error('Error uploading image:', error);
    return null;
  }
}

export async function deleteImage(
  folder: string,
  path: string
): Promise<boolean> {
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
