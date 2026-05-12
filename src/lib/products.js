// Product data - harga dari Oura Store + Rp 500 markup
export const GAMES = [
  {
    id: 'mobile-legends',
    name: 'Mobile Legends',
    slug: 'mobile-legends',
    publisher: 'Moonton',
    category: 'topup',
    image: '/images/ml-banner.jpg',
    description: 'Top up Diamond Mobile Legends Bang Bang. Proses cepat & aman!',
    requireServer: true,
    items: [
      // Special Items
      { id: 'ml-wdp', name: 'Weekly Diamond Pass', price: 30084, category: 'Special Items' },
      { id: 'ml-2wdp', name: '2x Weekly Diamond Pass', price: 59668, category: 'Special Items' },
      { id: 'ml-3wdp', name: '3x Weekly Diamond Pass', price: 89252, category: 'Special Items' },
      { id: 'ml-4wdp', name: '4x Weekly Diamond Pass', price: 118836, category: 'Special Items' },
      { id: 'ml-5wdp', name: '5x Weekly Diamond Pass', price: 148420, category: 'Special Items' },
      { id: 'ml-tp', name: 'Twilight Pass', price: 153576, category: 'Special Items' },
      // Top Up Instant
      { id: 'ml-5', name: '5 (5+0) Diamonds', price: 2035, category: 'Top Up Instant' },
      { id: 'ml-10', name: '10 (9+1) Diamonds', price: 3611, category: 'Top Up Instant' },
      { id: 'ml-12', name: '12 (11+1) Diamonds', price: 4079, category: 'Top Up Instant' },
      { id: 'ml-14', name: '14 (13+1) Diamonds', price: 4648, category: 'Top Up Instant' },
      { id: 'ml-15', name: '15 (15+0) Diamonds', price: 5104, category: 'Top Up Instant' },
      { id: 'ml-17', name: '17 (16+1) Diamonds', price: 5279, category: 'Top Up Instant' },
      { id: 'ml-18', name: '18 (17+1) Diamonds', price: 5685, category: 'Top Up Instant' },
      { id: 'ml-19', name: '19 (17+2) Diamonds', price: 6124, category: 'Top Up Instant' },
      { id: 'ml-20', name: '20 (18+2) Diamonds', price: 6721, category: 'Top Up Instant' },
      { id: 'ml-22', name: '22 (20+2) Diamonds', price: 7189, category: 'Top Up Instant' },
      { id: 'ml-28', name: '28 (25+3) Diamonds', price: 8681, category: 'Top Up Instant' },
      { id: 'ml-30', name: '30 (28+2) Diamonds', price: 9263, category: 'Top Up Instant' },
      { id: 'ml-33', name: '33 (30+3) Diamonds', price: 10059, category: 'Top Up Instant' },
      { id: 'ml-36', name: '36 (33+3) Diamonds', price: 10867, category: 'Top Up Instant' },
      { id: 'ml-44', name: '44 (40+4) Diamonds', price: 12770, category: 'Top Up Instant' },
      { id: 'ml-45', name: '45 (42+3) Diamonds', price: 13908, category: 'Top Up Instant' },
      { id: 'ml-46', name: '46 (42+4) Diamonds', price: 13977, category: 'Top Up Instant' },
      { id: 'ml-50', name: '50 (46+4) Diamonds', price: 14837, category: 'Top Up Instant' },
      { id: 'ml-56', name: '56 (51+5) Diamonds', price: 16348, category: 'Top Up Instant' },
      { id: 'ml-59', name: '59 (53+6) Diamonds', price: 16860, category: 'Top Up Instant' },
      { id: 'ml-67', name: '67 (62+5) Diamonds', price: 19489, category: 'Top Up Instant' },
      { id: 'ml-74', name: '74 (67+7) Diamonds', price: 21232, category: 'Top Up Instant' },
      { id: 'ml-78', name: '78 (70+8) Diamonds', price: 22484, category: 'Top Up Instant' },
      { id: 'ml-85', name: '85 (77+8) Diamonds', price: 24017, category: 'Top Up Instant' },
      { id: 'ml-86', name: '86 (78+8) Diamonds', price: 24500, category: 'Top Up Instant' },
      { id: 'ml-100', name: '100 (91+9) Diamonds', price: 28662, category: 'Top Up Instant' },
      { id: 'ml-110', name: '110 (100+10) Diamonds', price: 31598, category: 'Top Up Instant' },
      { id: 'ml-129', name: '129 (117+12) Diamonds', price: 36287, category: 'Top Up Instant' },
      { id: 'ml-148', name: '148 (134+14) Diamonds', price: 41963, category: 'Top Up Instant' },
      { id: 'ml-170', name: '170 (154+16) Diamonds', price: 47532, category: 'Top Up Instant' },
      { id: 'ml-184', name: '184 (167+17) Diamonds', price: 53597, category: 'Top Up Instant' },
      { id: 'ml-222', name: '222 (200+22) Diamonds', price: 62693, category: 'Top Up Instant' },
      { id: 'ml-240', name: '240 (217+23) Diamonds', price: 66819, category: 'Top Up Instant' },
      { id: 'ml-277', name: '277 (250+27) Diamonds', price: 78241, category: 'Top Up Instant' },
      { id: 'ml-296', name: '296 (256+40) Diamonds', price: 82105, category: 'Top Up Instant' },
      { id: 'ml-305', name: '305 (276+29) Diamonds', price: 86536, category: 'Top Up Instant' },
      { id: 'ml-370', name: '370 (333+37) Diamonds', price: 104154, category: 'Top Up Instant' },
      { id: 'ml-408', name: '408 (367+41) Diamonds', price: 112731, category: 'Top Up Instant' },
      { id: 'ml-518', name: '518 (467+51) Diamonds', price: 145616, category: 'Top Up Instant' },
      { id: 'ml-568', name: '568 (503+65) Diamonds', price: 153576, category: 'Top Up Instant' },
      { id: 'ml-716', name: '716 (637+79) Diamonds', price: 195038, category: 'Top Up Instant' },
      { id: 'ml-875', name: '875 (774+101) Diamonds', price: 235137, category: 'Top Up Instant' },
      { id: 'ml-1048', name: '1048 (936+112) Diamonds', price: 288327, category: 'Top Up Instant' },
      { id: 'ml-1506', name: '1506 (1339+167) Diamonds', price: 410304, category: 'Top Up Instant' },
      { id: 'ml-2010', name: '2010 (1708+302) Diamonds', price: 510580, category: 'Top Up Instant' },
      { id: 'ml-3738', name: '3738 (3247+491) Diamonds', price: 982576, category: 'Top Up Instant' },
      { id: 'ml-5966', name: '5966 (5009+957) Diamonds', price: 1530705, category: 'Top Up Instant' },
      { id: 'ml-10050', name: '10050 (8540+1510) Diamonds', price: 2550899, category: 'Top Up Instant' },
    ]
  },
  {
    id: 'pubg-mobile',
    name: 'PUBG Mobile',
    slug: 'pubg-mobile',
    publisher: 'Tencent Games',
    category: 'topup',
    image: '/images/pubg-banner.jpg',
    description: 'Top up UC PUBG Mobile. Proses instan & terpercaya!',
    requireServer: false,
    items: [
      // All Region
      { id: 'pubg-60', name: '60 UC', price: 16626, category: 'All Region' },
      { id: 'pubg-325', name: '325 UC', price: 81499, category: 'All Region' },
      { id: 'pubg-660', name: '660 UC', price: 162497, category: 'All Region' },
      { id: 'pubg-1800', name: '1800 UC', price: 405863, category: 'All Region' },
      { id: 'pubg-3850', name: '3850 UC', price: 811225, category: 'All Region' },
      { id: 'pubg-8100', name: '8100 UC', price: 1622133, category: 'All Region' },
      // Region Indo
      { id: 'pubg-60id', name: '60 UC (ID)', price: 16626, category: 'Region Indo' },
      { id: 'pubg-120id', name: '120 UC (ID)', price: 32752, category: 'Region Indo' },
      { id: 'pubg-180id', name: '180 UC (ID)', price: 48878, category: 'Region Indo' },
      { id: 'pubg-240id', name: '240 UC (ID)', price: 65004, category: 'Region Indo' },
      { id: 'pubg-325id', name: '325 (300+25) UC (ID)', price: 81499, category: 'Region Indo' },
      { id: 'pubg-385id', name: '385 (360+25) UC (ID)', price: 97625, category: 'Region Indo' },
      { id: 'pubg-445id', name: '445 (420+25) UC (ID)', price: 113751, category: 'Region Indo' },
      { id: 'pubg-505id', name: '505 (480+25) UC (ID)', price: 129877, category: 'Region Indo' },
      { id: 'pubg-565id', name: '565 (540+25) UC (ID)', price: 146003, category: 'Region Indo' },
      { id: 'pubg-660id', name: '660 (600+60) UC (ID)', price: 162497, category: 'Region Indo' },
      { id: 'pubg-720id', name: '720 (660+60) UC (ID)', price: 178623, category: 'Region Indo' },
      { id: 'pubg-780id', name: '780 (720+60) UC (ID)', price: 194749, category: 'Region Indo' },
      { id: 'pubg-840id', name: '840 (780+60) UC (ID)', price: 210875, category: 'Region Indo' },
      { id: 'pubg-900id', name: '900 (840+60) UC (ID)', price: 227001, category: 'Region Indo' },
      { id: 'pubg-985id', name: '985 (900+85) UC (ID)', price: 243496, category: 'Region Indo' },
      { id: 'pubg-1320id', name: '1320 (1200+120) UC (ID)', price: 324494, category: 'Region Indo' },
      { id: 'pubg-1800id', name: '1800 (1500+300) UC (ID)', price: 405863, category: 'Region Indo' },
      { id: 'pubg-1980id', name: '1980 (1680+300) UC (ID)', price: 454240, category: 'Region Indo' },
      { id: 'pubg-2460id', name: '2460 (2100+360) UC (ID)', price: 567859, category: 'Region Indo' },
      { id: 'pubg-3850id', name: '3850 (3000+850) UC (ID)', price: 811225, category: 'Region Indo' },
      { id: 'pubg-8100id', name: '8100 (6000+2100) UC (ID)', price: 1622133, category: 'Region Indo' },
    ]
  },
  {
    id: 'free-fire',
    name: 'Free Fire',
    slug: 'free-fire',
    publisher: 'Garena',
    category: 'topup',
    image: '/images/ff-banner.jpg',
    description: 'Top up Diamond Free Fire. Murah, cepat & terpercaya!',
    requireServer: false,
    items: [
      // Membership
      { id: 'ff-member-weekly', name: 'Member Mingguan', price: 30508, category: 'Membership' },
      { id: 'ff-bp-card', name: 'BP Card', price: 45482, category: 'Membership' },
      { id: 'ff-member-monthly', name: 'Member Bulanan', price: 90451, category: 'Membership' },
      // Top Up Instant
      { id: 'ff-5', name: '5 Diamonds', price: 1474, category: 'Top Up Instant' },
      { id: 'ff-12', name: '12 Diamonds', price: 2448, category: 'Top Up Instant' },
      { id: 'ff-15', name: '15 Diamonds', price: 3422, category: 'Top Up Instant' },
      { id: 'ff-20', name: '20 Diamonds', price: 4395, category: 'Top Up Instant' },
      { id: 'ff-25', name: '25 Diamonds', price: 5369, category: 'Top Up Instant' },
      { id: 'ff-30', name: '30 Diamonds', price: 6343, category: 'Top Up Instant' },
      { id: 'ff-50', name: '50 Diamonds', price: 8287, category: 'Top Up Instant' },
      { id: 'ff-70', name: '70 Diamonds', price: 10233, category: 'Top Up Instant' },
      { id: 'ff-100', name: '100 Diamonds', price: 16075, category: 'Top Up Instant' },
      { id: 'ff-140', name: '140 Diamonds', price: 19965, category: 'Top Up Instant' },
      { id: 'ff-150', name: '150 Diamonds', price: 21912, category: 'Top Up Instant' },
      { id: 'ff-190', name: '190 Diamonds', price: 27752, category: 'Top Up Instant' },
      { id: 'ff-230', name: '230 Diamonds', price: 33592, category: 'Top Up Instant' },
      { id: 'ff-300', name: '300 Diamonds', price: 43324, category: 'Top Up Instant' },
      { id: 'ff-375', name: '375 Diamonds', price: 53056, category: 'Top Up Instant' },
      { id: 'ff-500', name: '500 Diamonds', price: 69599, category: 'Top Up Instant' },
      { id: 'ff-720', name: '720 Diamonds', price: 97820, category: 'Top Up Instant' },
      { id: 'ff-800', name: '800 Diamonds', price: 109500, category: 'Top Up Instant' },
      { id: 'ff-1000', name: '1000 Diamonds', price: 136749, category: 'Top Up Instant' },
      { id: 'ff-1200', name: '1200 Diamonds', price: 164973, category: 'Top Up Instant' },
      { id: 'ff-2000', name: '2000 Diamonds', price: 272024, category: 'Top Up Instant' },
      { id: 'ff-3000', name: '3000 Diamonds', price: 405353, category: 'Top Up Instant' },
      { id: 'ff-5000', name: '5000 Diamonds', price: 738656, category: 'Top Up Instant' },
    ]
  },
  {
    id: 'roblox',
    name: 'Roblox',
    slug: 'roblox',
    publisher: 'Roblox Corporation',
    category: 'topup',
    image: '/images/roblox-banner.jpg',
    description: 'Top up Robux Roblox. Aman & terpercaya!',
    requireServer: false,
    items: [
      // Voucher Gift Card IDR
      { id: 'rb-idr50k', name: 'Roblox IDR 50.000', price: 50511, category: 'Voucher Gift Card IDR' },
      { id: 'rb-idr65k', name: 'Roblox IDR 65.000', price: 66444, category: 'Voucher Gift Card IDR' },
      { id: 'rb-idr100k', name: 'Roblox IDR 100.000', price: 102748, category: 'Voucher Gift Card IDR' },
      { id: 'rb-idr300k', name: 'Roblox IDR 300.000', price: 300736, category: 'Voucher Gift Card IDR' },
      { id: 'rb-idr500k', name: 'Roblox IDR 500.000', price: 493302, category: 'Voucher Gift Card IDR' },
      // Robux
      { id: 'rb-100', name: '100 Robux', price: 69303, category: 'Robux' },
      { id: 'rb-200', name: '200 Robux', price: 90408, category: 'Robux' },
      { id: 'rb-400', name: '400 Robux', price: 105868, category: 'Robux' },
      { id: 'rb-800', name: '800 Robux', price: 158519, category: 'Robux' },
      { id: 'rb-2000', name: '2.000 Robux', price: 397459, category: 'Robux' },
      { id: 'rb-10000', name: '10.000 Robux', price: 1750105, category: 'Robux' },
      // Voucher Gift Card USD
      { id: 'rb-usd10', name: 'Roblox USD $10', price: 167143, category: 'Voucher Gift Card USD' },
      { id: 'rb-usd15', name: 'Roblox USD $15', price: 266501, category: 'Voucher Gift Card USD' },
      { id: 'rb-usd25', name: 'Roblox USD $25', price: 417196, category: 'Voucher Gift Card USD' },
      { id: 'rb-usd50', name: 'Roblox USD $50', price: 833711, category: 'Voucher Gift Card USD' },
      { id: 'rb-usd100', name: 'Roblox USD $100', price: 1726103, category: 'Voucher Gift Card USD' },
    ]
  },
  {
    id: 'joki-eceran',
    name: 'Joki Rank Eceran',
    slug: 'joki-eceran',
    publisher: 'Febristore',
    category: 'joki',
    image: '/images/joki-banner.jpg',
    description: 'Jasa Joki Rank Mobile Legends. Aman, cepat, terpercaya!',
    requireServer: false,
    whatsappRedirect: true,
    items: []
  },
  {
    id: 'joki-gendong',
    name: 'Joki Gendong / Mabar',
    slug: 'joki-gendong',
    publisher: 'Febristore',
    category: 'joki',
    image: '/images/joki-banner.jpg',
    description: 'Jasa Joki Gendong / Main Bareng Mobile Legends.',
    requireServer: false,
    whatsappRedirect: true,
    items: []
  },
  {
    id: 'joki-rank-paketan',
    name: 'Joki Rank Paketan',
    slug: 'joki-rank-paketan',
    publisher: 'Febristore',
    category: 'joki',
    image: '/images/joki-banner.jpg',
    description: 'Jasa Joki Rank Paketan Mobile Legends. Harga lebih hemat!',
    requireServer: false,
    whatsappRedirect: true,
    items: []
  }
];

export const PAYMENT_METHODS = [
  { id: 'qris', name: 'QRIS', accountNumber: '', icon: '', description: 'Scan QR untuk bayar' },
  { id: 'dana', name: 'Dana', accountNumber: '085882862864', icon: '', description: 'Transfer ke Dana' },
  { id: 'gopay', name: 'GoPay', accountNumber: '085694852030', icon: '', description: 'Transfer ke GoPay' },
  { id: 'bank-jago', name: 'Bank Jago', accountNumber: '109013093317', icon: '', description: 'Transfer ke Bank Jago' },
];

export const STORE_INFO = {
  name: 'Febristore',
  whatsapp: '085694852030',
  tiktok: '@febristore_official',
  instagram: '@febristore_official',
  whatsappLink: 'https://wa.me/6285694852030',
};

export function getGameBySlug(slug) {
  return GAMES.find(g => g.slug === slug);
}

export function getTopUpGames() {
  return GAMES.filter(g => g.category === 'topup');
}

export function getJokiServices() {
  return GAMES.filter(g => g.category === 'joki');
}

export function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
}

export function generateOrderId() {
  const date = new Date();
  const d = date.toISOString().slice(0,10).replace(/-/g,'');
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `FS-${d}-${rand}`;
}
