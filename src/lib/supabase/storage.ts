import { supabase } from "./client";

const BUCKET = "post-images";

export async function uploadImage(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error } = await supabase.storage.from(BUCKET).upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(filePath);

  return publicUrl;
}

export async function deleteImage(url: string): Promise<void> {
  const path = url.split(`${BUCKET}/`)[1];
  if (!path) return;

  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) throw new Error(`Delete failed: ${error.message}`);
}
