-- =========================================================================
-- Pasang foto asli (sudah diupload ke bucket Storage "tempat-foto") untuk
-- tempat yang fotonya sudah tersedia. Jalankan SETELAH file-file berikut
-- diupload ke bucket tempat-foto lewat Dashboard > Storage:
--   gamy-coffee-space.webp
--   kedai-tuju-abuserin.jpg
--   menanti-senja-cipete.jpeg
--   the-post-coffee-eatery.webp
-- =========================================================================

update public.tempat
set foto = array['https://wmcqvnoawihmgohvcanl.supabase.co/storage/v1/object/public/tempat-foto/gamy-coffee-space.webp']
where id = 'gamy-coffee-space';

update public.tempat
set foto = array['https://wmcqvnoawihmgohvcanl.supabase.co/storage/v1/object/public/tempat-foto/kedai-tuju-abuserin.jpg']
where id = 'kedai-tuju-abuserin';

update public.tempat
set foto = array['https://wmcqvnoawihmgohvcanl.supabase.co/storage/v1/object/public/tempat-foto/menanti-senja-cipete.jpeg']
where id = 'menanti-senja-cipete';

update public.tempat
set foto = array['https://wmcqvnoawihmgohvcanl.supabase.co/storage/v1/object/public/tempat-foto/the-post-coffee-eatery.webp']
where id = 'the-post-coffee-eatery';
