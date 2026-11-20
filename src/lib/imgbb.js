export async function uploadImage(file) {
  const fd = new FormData();
  fd.append('image', file);
  const r = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, { method: 'POST', body: fd });
  const j = await r.json();
  if (!j.success) throw new Error('Image upload failed');
  return j.data.url;
}
