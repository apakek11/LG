-- =========================================================================
-- Pasang foto stok fiktif (aesthetic, belum pernah dipakai di tempat lain)
-- untuk Bubur Ayam Barito — menggantikan placeholder "Foto belum tersedia".
-- Bukan foto asli tempat ini.
-- =========================================================================

update public.tempat
set foto = array['https://lh3.googleusercontent.com/aida/AEtjO1WYuvyyR6MWCqvQQysDM1JIcEJ6yb3gr-zpG-UMb_Rz5K5DKjxaz1ayP7F7NemitK-1Ycr1c3-DorgvjesoM8M0Ur22yX5THpEWKfNF9ebBqnBh_umnGfGaaloW4y0N2nh07WMVRxb3XOPx0g2nDeTpVsuaWBePN_R535ILjMlDuUMKbkdwohxoMhWiulXDIixlgsVuJPpO-Mhh_t-hQvQPP8bz-QIfonpi8KcpkBHeLWRZVJX27-253g']
where id = 'bubur-ayam-barito';
