const ICON_RULES: Array<[RegExp, string]> = [
  [/wifi/i, 'wifi'],
  [/colokan|listrik/i, 'power'],
  [/\bac\b/i, 'ac_unit'],
  [/outdoor/i, 'deck'],
  [/indoor/i, 'home'],
  [/hewan|pet/i, 'pets'],
  [/live music|dj|vinyl|musik/i, 'music_note'],
  [/rooftop|view/i, 'visibility'],
  [/smoking/i, 'smoking_rooms'],
  [/valet|parkir/i, 'local_parking'],
  [/meeting/i, 'groups'],
  [/kopi/i, 'local_cafe'],
  [/buku|baca/i, 'menu_book'],
  [/tatami|hening|zen/i, 'self_improvement'],
  [/instagramable|spot/i, 'photo_camera'],
  [/heritage|antik/i, 'museum'],
  [/pastry|bakery|roti/i, 'bakery_dining'],
  [/pour over|brew/i, 'coffee_maker'],
]

export function getFasilitasIcon(label: string): string {
  const rule = ICON_RULES.find(([pattern]) => pattern.test(label))
  return rule ? rule[1] : 'check_circle'
}
