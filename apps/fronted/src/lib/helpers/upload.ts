import { supabaseClient } from './supabase';

export async function uploadThumbnail(image: File): Promise<string> {
  try {
    const fileName = `${crypto.randomUUID()}_${image.name}`;
    const { data, error } = await supabaseClient().storage.from('thumbnails').upload(fileName, image);

    if (error || !data?.path) throw new Error(error?.message || 'Failed to upload the file.');

    const { data: urlData } = supabaseClient().storage.from('thumbnails').getPublicUrl(data.path);

    if (!urlData.publicUrl) throw new Error('Failed to retrieve public URL.');

    console.log(data);
    return urlData.publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('An error occurred while uploading the thumbnail.');
  }
}
