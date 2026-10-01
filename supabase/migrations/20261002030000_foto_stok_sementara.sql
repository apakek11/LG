-- =========================================================================
-- Pasang kembali foto STOK (dari katalog demo lama) sebagai placeholder
-- visual sementara untuk ke-7 tempat ASLI, menggantikan kotak abu-abu
-- "Foto belum tersedia".
--
-- PENTING: ini BUKAN foto asli tempat yang bersangkutan — cuma foto generik
-- supaya tampilan lebih enak dilihat sambil menunggu foto asli diupload.
-- Begitu foto asli sebuah tempat sudah diupload ke bucket Storage, jalankan
-- migration 20261002020000_update_foto.sql (atau update manual) untuk
-- menimpa baris terkait dengan foto yang sebenarnya.
-- =========================================================================

update public.tempat set foto = array['https://lh3.googleusercontent.com/aida-public/AB6AXuANXRxRH_ycvzZrglgGsgEab3HFxOd6xSbpz5wzudYlgoqDnbuIVhe1i9SlZAdbQJiUO5bWCY-fdUshXC90U18Ig_UZlSRQ_oELAE4CEzjb0Kk7dws_IYbOygD5BwAY9jF6ZFGg1DaRpeh5AIoR4qBrFJX-KYxMCN2OEU7Gk7omAYtApfiFA1kYidPhZu661OKtPRy8uulPnYh0F_w1t1Ea7TDk8sD8E86n_CO8ju3B4Qw3YMfXxhmL']
where id = 'menanti-senja-cipete';

update public.tempat set foto = array['https://lh3.googleusercontent.com/aida-public/AB6AXuD8rOU0Q223jc_yqhyA7iQLXC98U1XNtwcDF9c7tyrK9MKw0-FuLF0SpM-yn71bgID3juIz4CcwSPep_Dkg0aex8Um3yEbuG7Y9j_y4zT0ctOvmBRepLMqX1wo5CYBGBmyxBt4RendFtL7FP3IdI_QskzAPqjnPr2wodzXELcuA5YAW1DoVR72uxrIyRLcAcmJYhWjC7XYPuC1QNFPM5To2zQn3dcHw4FDCCGTMTlORD5qKbLt3oo_4']
where id = 'kedai-tuju-abuserin';

update public.tempat set foto = array['https://lh3.googleusercontent.com/aida-public/AB6AXuCVgy2vRj8bf78JloS8XoZS_wNwjzgBvye3_hNM9wXqB0431ya1erzVW3aVS0dwwXSsjFEevw6Um9jTaOnS4nBx2vpDjAeGOV5bhIi5PGwzwUUuzV-aDZj9mQce-gfy2umDxC1rKH9EcwXkCk_E6Ur1wgUGJyJJVc9Zz5GrT4BS-y5ncb205eg5lFV6c9rFQ9F-O1k8fDeNqjYqZzLIXuvqp355Yoa_cOgPYVihrqvGpGWy368IXQQj']
where id = 'gamy-coffee-space';

update public.tempat set foto = array['https://lh3.googleusercontent.com/aida-public/AB6AXuDR6yhObURnPEMxBAq2XOAtPkUprNNUyv4xKBWIqof9HhZBgUQOkmGNviWGuF69ACcGQ2btd_TUxLje3ajj9ohvHq41bAzunz59CfybqEDm3_vdvK3kclKX7aGwMgLj8uc2xHQL_2JXrT1fGCzRDBNLbuxysHMWnmcidiVrLMGwu2VwwHb8U8LAJIutdMx9ElBv2JikWXG2Ktfh6EHO1bzHefE8b_XV135shfb3oUdHBi_0x4tKYiA_']
where id = 'the-post-coffee-eatery';

update public.tempat set foto = array['https://lh3.googleusercontent.com/aida-public/AB6AXuBM26eeH4TBXM3og7vDZ7Dyx48XVxjM3MB1DVRRKl6CnM96NkSdNq_eM7rk-H9TI1DUbOrAKcH15TvwmRSOUQ3BzDygUV3g_KftMrtN3PwES1NvQVEIZriGe-JvhbnRnJ0dn3ddgofYwEWMLhZQWzz9xSl2iLTfLtQR-peyaygsYmB7uDvdos_ge01iiEq56ootaTq1RAdVy8bd-cnioU_RRrfWow59RTAGE4GPq3hfkFQHVRy3ftxk']
where id = 'mamo-coffee-eatery';

update public.tempat set foto = array['https://lh3.googleusercontent.com/aida-public/AB6AXuDBwljfHMX-X5b9FwRON1Fdtjo-J_cMCfdiK0Dct3ynwg8BkPO3PLKtEA3fNGL9p5v2Ao_PDvg1aP8aoRpPzgzSjDASkE5g17FhKb4hh4iXks93OPONF6c1SOAVOeeRUNGInX0wa_54MIrBrAXUWUMgUIsTb1EDJEZ0K0lmwFW7HMpZ-SQjFHMizKKXUoZjokmPJmKB-TqNJjG79M40mAmtV-t5zbCxBbSdfaO_0LPtADQtc9_h9ZoQ']
where id = 'warkop-pancong-lumer-tendean';

update public.tempat set foto = array['https://lh3.googleusercontent.com/aida-public/AB6AXuBy6xwF2hO-r-fD-PIRIWx2tOSe7AtkGV2sXfjmamx9_ueXPCVdaL0kUv4JM6l2r8W2iRoV4aCUShrgPAX9tBSXlseGOS1m19YBrhVRpGsBnTserhiLs9IH7nFWBAcL8XIBhS-rR9uE2Q1o1p2plezlENxI1xwszC9m8KbEAQNtgh6Z0mobGTvEsAhU19dbf5srtbWWP_CRVr1jG3EJJoGszIf2-_AMBS77KwiwHNEFv_auzi09Gcza']
where id = 'gordi-hq';
