import { Tour } from '../types/tour';

export const TOURS_DATA: Tour[] = [
  {
    id: 'atm-cave',
    title: 'Actun Tunichil Muknal (ATM) Cave Expedition',
    shortDescription: 'National Geographic’s #1 Sacred Cave. Wade, swim, and climb through the Maya underworld of Xibalba to ancient skeletal remains.',
    fullDescription: 'The ATM Cave is globally renowned as one of the most sacred Maya ceremonial caverns on Earth. Guided by licensed BTB speleology guides, you will hike through the Tapir Mountain Nature Reserve, swim into the cave mouth, wade through subterranean crystal rivers, and ascend to the high chambers where sacrificial calcified pottery and the famous "Crystal Maiden" skeleton reside.',
    badge: 'National Geographic #1',
    category: 'caves',
    priceUsd: 125, // BZD $250
    duration: 'Full Day · 8h',
    physicalRating: 'Challenging / Strenuous',
    rating: 4.98,
    reviewsCount: 342,
    image: '/src/assets/images/tour_atm_cave_1790779714359.jpg',
    location: 'Tapir Mountain Nature Reserve, Cayo',
    minAge: 10,
    departureTime: '7:30 AM',
    isAvailable: true,
    included: [
      'Belize Tourism Board (BTB) Licensed & Certified Spelunking Guide',
      'All Reserve & Archeological Entrance Fees (NICH Permits)',
      'High-Lumen Subterranean Headlamp & High-Impact Safety Helmet',
      'Belizean Stew Chicken Lunch & Refreshments Included',
      'Roundtrip Shuttle from San Ignacio Town Hotels'
    ],
    whatToBring: [
      'Pair of clean dry socks (mandatory for cave dry chambers)',
      'Quick-dry shorts and t-shirt / rashguard',
      'Sturdy closed-toe hiking shoes or water shoes with traction',
      'Dry change of clothes & towel for after the trek',
      'No cameras/cell phones allowed in ATM cave by NICH regulations'
    ]
  },
  {
    id: 'caracol-pine-ridge',
    title: 'Caracol Maya City & Mountain Pine Ridge',
    shortDescription: 'Deep in the Chiquibul Jungle: Explore Caana ("Sky Palace"), the tallest man-made structure in Belize, combined with stops at Big Rock Falls or Rio On Pools.',
    fullDescription: 'Journey deep into the Chiquibul Forest Reserve and Mountain Pine Ridge in rugged expedition 4x4 vehicles. Explore Caracol, once the superpower city-state that defeated Tikal in ancient warfare. Ascend the towering Caana pyramid—still one of the tallest man-made structures in Belize. Afterwards, plunge into the pristine granite waterfall pool of Big Rock Falls surrounded by emerald rainforest.',
    badge: 'Mountain Pine Ridge',
    category: 'waterfalls',
    priceUsd: 140, // BZD $280
    duration: 'Full Day · 8.5h',
    physicalRating: 'Moderate',
    rating: 4.95,
    reviewsCount: 195,
    image: '/src/assets/images/tour_caracol_waterfall_1790779735253.jpg',
    location: 'Vaca Plateau / Chiquibul Forest Reserve, Cayo',
    minAge: 8,
    departureTime: '7:00 AM',
    isAvailable: true,
    included: [
      'Rugged 4x4 Safari Van Transport through Pine Ridge',
      'Expert Maya Archeology Specialist Guide',
      'Caracol Archeological Park & Waterfall Permits',
      'Riverside Tablecloth Lunch (Stewed Chicken, Rice, Salad, Habanero Sauce)',
      'Chilled towels and hydration coolers'
    ],
    whatToBring: [
      'Comfortable hiking footwear with solid grip',
      'Light layers (morning in Pine Ridge can be crisp)',
      'Swimsuit under clothes for waterfall plunge',
      'Insect protection and brimmed sun hat',
      'Camera or smartphone for panoramic jungle views'
    ]
  },
  {
    id: 'xunantunich-ruins',
    title: 'Xunantunich Maya Ruins & Riverside Ferry',
    shortDescription: 'Hand-cranked river ferry across the Mopan River, panoramic views from El Castillo overlooking Guatemala and the Cayo countryside.',
    fullDescription: 'Cross the emerald Mopan River aboard a historic hand-cranked ferry to explore Xunantunich ("Stone Woman"). Scale the majestic 130-foot El Castillo pyramid for 360-degree panoramic views across the Belize-Guatemala border and the surrounding jungle canopy. Inspect intricately carved astronomical friezes and ballcourts with our master archaeology guides.',
    badge: 'Classic Heritage',
    category: 'ruins',
    priceUsd: 95, // BZD $190
    duration: 'Half Day · 4.5h',
    physicalRating: 'Moderate',
    rating: 4.92,
    reviewsCount: 289,
    image: '/src/assets/images/tour_xunantunich_1790779725322.jpg',
    location: 'San Jose Succotz (near San Ignacio)',
    minAge: 6,
    departureTime: '8:00 AM & 1:00 PM',
    isAvailable: true,
    included: [
      'Hand-Crank Ferry Crossing & Temple Guided Tour',
      'All Park Admission & Archeological Fees',
      'Picnic Lunch with Rice & Beans, Stew Chicken & Plantains',
      'Cold bottled water and tropical fruit juices',
      'Roundtrip San Ignacio transfer'
    ],
    whatToBring: [
      'Sturdy walking shoes or trail sneakers',
      'Biodegradable eco-sunscreen & bug repellent',
      'Camera for panoramic temple vistas',
      'Cash for local craft market at Succotz village'
    ]
  },
  {
    id: 'cahal-pech-ruins',
    title: 'Cahal Pech Maya Ruins & Visitor Center',
    shortDescription: 'Royal palace compound of an elite Maya family perched on a hill above San Ignacio; compact, shady, and accessible.',
    fullDescription: 'Perched on the highest hill overlooking San Ignacio Town and the twin rivers, Cahal Pech ("Place of Ticks") served as the luxurious hilltop residential palace for Maya royalty. Wander through 34 conserved structures, interconnected sunken courtyards, temples, and ceremonial sweat baths nestled under shade trees. Visit the on-site interpretive center showcasing artifacts, figurines, and jade jewelry.',
    badge: 'San Ignacio Local',
    category: 'ruins',
    priceUsd: 65, // BZD $130
    duration: 'Half Day · 3h',
    physicalRating: 'Easy / Accessible',
    rating: 4.88,
    reviewsCount: 164,
    image: '/src/assets/images/tour_cahal_pech_1791165141600.jpg',
    location: 'San Ignacio Town, Cayo District',
    minAge: 4,
    departureTime: '9:00 AM & 2:00 PM',
    isAvailable: true,
    included: [
      'Certified Archaeological Historian Guide',
      'All Site Entrance Permits & Museum Passes',
      'Purified Water & Tropical Fruit Snacks',
      'Roundtrip transport from San Ignacio accommodations'
    ],
    whatToBring: [
      'Comfortable walking shoes',
      'Sun hat and sunglasses',
      'Camera or phone for archeological photos'
    ]
  },
  {
    id: 'barton-creek-canoeing',
    title: 'Barton Creek Cave Canoeing & Green Hills',
    shortDescription: 'Glide silently in a canoe by flashlight through a massive water cave used by ancient Maya for rituals; optional stop at butterfly ranches.',
    fullDescription: 'Gliding by canoe into the high vaulted cathedral portals of Barton Creek Cave is one of the most serene and atmospheric experiences in Central America. Equipped with powerful exploration floodlights, paddle one mile into ancient subterranean chambers beneath towering stalactite chandeliers. On the way back, tour the lush Green Hills Butterfly Ranch, wandering through aviaries hosting over 30 native Belizean butterfly species.',
    badge: 'Top Family Eco-Tour',
    category: 'tubing',
    priceUsd: 90, // BZD $180
    duration: 'Half Day · 4.5h',
    physicalRating: 'Gentle / Relaxing',
    rating: 4.90,
    reviewsCount: 210,
    image: '/src/assets/images/tour_barton_creek_1790779744942.jpg',
    location: 'Georgeville / Barton Creek, Cayo',
    minAge: 5,
    departureTime: '8:30 AM & 1:00 PM',
    isAvailable: true,
    included: [
      'Tandem Expedition Canoe, Paddles & Coast-Guard Approved Life Vests',
      'High-Power Exploration Floodlight & Cave Entry Fee',
      'Green Hills Butterfly Ranch Admission with Botanist Tour',
      'Belize Tourism Board Licensed Cave Guide',
      'Fresh fruit snacks and purified hydration',
      'Roundtrip transfer from San Ignacio'
    ],
    whatToBring: [
      'Casual lightweight clothing and water-friendly shoes',
      'Light rain jacket or windbreaker',
      'Camera with low-light capability',
      'Hand towel and dry bag for valuables'
    ]
  },
  {
    id: 'nohoch-cheen-tubing-zipline',
    title: 'Nohoch Che’en Cave Tubing & Zipline Combo',
    shortDescription: 'Float on inner tubes down the Caves Branch River through underground limestone chambers; canopy ziplining through the jungle.',
    fullDescription: 'Experience Belize’s most beloved adrenaline and relaxation duo. Trek through the sub-tropical rainforest to the Caves Branch River, strap on your headlamp, and float through immense limestone caverns filled with stalactites, underground waterfalls, and Maya crystal formations. Then clip into high-tension steel zip-lines to soar across the jungle canopy across 7 platforms.',
    badge: 'Adventure & Fun',
    category: 'tubing',
    priceUsd: 115, // BZD $230
    duration: 'Full Day · 6.5h',
    physicalRating: 'Moderate',
    rating: 4.93,
    reviewsCount: 318,
    image: '/src/assets/images/tour_cave_tubing_zipline_1791165196667.jpg',
    location: 'Frank’s Eddy / Caves Branch, Cayo',
    minAge: 7,
    departureTime: '8:00 AM',
    isAvailable: true,
    included: [
      'Heavy-duty cave tube, life jacket and waterproof headlamp',
      'Complete canopy zipline harness, helmet and pulley rig',
      'All National Park & Reserve entrance fees',
      'Belizean buffet lunch with fresh juices',
      'Roundtrip transportation in air-conditioned van'
    ],
    whatToBring: [
      'Water shoes with hard soles or strap sandals',
      'Swimwear and quick-dry cover-up',
      'Dry change of clothes and towel',
      'Waterproof phone case or action camera'
    ]
  },
  {
    id: 'crystal-cave-challenge',
    title: 'Crystal Cave (Mountain Cow Cave) Challenge',
    shortDescription: 'Technical expedition involving jungle trekking, steep descents, crawling through tight chambers, and viewing sparkling crystal formations.',
    fullDescription: 'Regarded as Belize’s most demanding and rewarding cave expedition, Crystal Cave takes you deep beneath St. Herman’s Blue Hole National Park. Hike through steep rainforest trails, scramble down natural rock chimneys, navigate tight crawlways, and discover pristine caverns where walls and floors glitter with genuine calcite crystals alongside ancient Maya sacrificial altars.',
    badge: 'Extreme Spelunking',
    category: 'extreme',
    priceUsd: 135, // BZD $270
    duration: 'Full Day · 7h',
    physicalRating: 'High-Intensity / Strenuous',
    rating: 4.97,
    reviewsCount: 142,
    image: '/src/assets/images/tour_crystal_cave_1791165152866.jpg',
    location: 'St. Herman’s Blue Hole National Park',
    minAge: 13,
    departureTime: '7:30 AM',
    isAvailable: true,
    included: [
      'Certified Extreme Caving & Rescue Specialist Guide',
      'Technical spelunking helmet, high-lumen headlamp & gloves',
      'National Park Permits and Conservation Fees',
      'Energy pack, jungle lunch and cold hydration',
      'Private roundtrip shuttle from San Ignacio'
    ],
    whatToBring: [
      'Sturdy hiking boots with deep ankle support and grip',
      'Long lightweight pants and moisture-wicking shirt',
      'Clean dry socks and full change of post-tour clothes',
      'High fitness level and no fear of enclosed spaces'
    ]
  },
  {
    id: 'black-hole-drop',
    title: 'Black Hole Drop (Actun Loch Tunich)',
    shortDescription: '300-foot rappelling drop off the edge of a sinkhole into the rainforest canopy, followed by cave exploration.',
    fullDescription: 'The ultimate adrenaline rush in Central America. Hike up through the Maya Mountains to the rim of Actun Loch Tunich, a colossal 300-foot sinkhole collapse in the jungle. Rigged into professional climbing harnesses, rappel over the edge, dropping 200 feet freely through the canopy into the lush subterranean basin below. Follow up with cave exploration and a lavish jungle picnic.',
    badge: 'Ultimate Adrenaline',
    category: 'extreme',
    priceUsd: 165, // BZD $330
    duration: 'Full Day · 7.5h',
    physicalRating: 'High Adrenaline & Abseiling',
    rating: 4.99,
    reviewsCount: 175,
    image: '/src/assets/images/tour_black_hole_drop_1791165162762.jpg',
    location: 'Caves Branch Estate / Cayo',
    minAge: 12,
    departureTime: '7:00 AM',
    isAvailable: true,
    included: [
      'Petzl & Black Diamond UIAA Certified Rappelling Rig & Harness',
      'Triple-Safety Guide System with Master Riggers',
      'Rainforest Sinkhole Park & Conservation Fees',
      'Expedition Tablecloth Buffet Lunch & Refreshments',
      'Roundtrip transfer from San Ignacio'
    ],
    whatToBring: [
      'Sturdy trail hiking boots (mandatory)',
      'Breathable athletic apparel (long pants recommended)',
      'Small daypack with water bottle',
      'GoPro / action camera with secure body mount'
    ]
  },
  {
    id: 'tikal-day-expedition',
    title: 'Tikal Day Expedition (Cross-Border Guatemala)',
    shortDescription: 'Full-day guided cross-border excursion to the UNESCO World Heritage Maya metropolis of Tikal.',
    fullDescription: 'Departing early from San Ignacio, experience a seamless VIP cross-border journey into Petén, Guatemala. Marvel at the soaring limestone pyramids of Tikal rising above the jungle, home to Temple I (Great Jaguar), Temple II, and Temple IV overlooking miles of untouched biosphere. Our bilingual archaeological guides bring ancient Maya civilization vividly to life.',
    badge: 'UNESCO World Heritage',
    category: 'ruins',
    priceUsd: 175, // BZD $350
    duration: 'Full Day · 10h',
    physicalRating: 'Moderate',
    rating: 4.96,
    reviewsCount: 228,
    image: '/src/assets/images/tour_tikal_expedition_1791165174378.jpg',
    location: 'Petén, Guatemala (Departing from San Ignacio)',
    minAge: 8,
    departureTime: '6:30 AM',
    isAvailable: true,
    included: [
      'VIP Border Crossing Assistance & All Border Transit Fees',
      'Private Air-Conditioned Van Transport in Belize & Guatemala',
      'Certified Tikal National Park Archaeology Guide',
      'All Guatemala National Park Admissions',
      'Traditional Guatemalan Restaurant Lunch in El Remate'
    ],
    whatToBring: [
      'Valid passport (must have 6+ months validity)',
      'Comfortable walking shoes with cushioned soles',
      'US Cash or Credit Card for park souvenirs',
      'Sun hat, eco-sunscreen and camera'
    ]
  },
  {
    id: 'jungle-treks-birding',
    title: 'Jungle Treks, Medicinal Flora & Bird Watching',
    shortDescription: 'Guided educational hikes learning about Maya medicinal plants, tracking wildlife (howler monkeys, toucans), and night jungle walks.',
    fullDescription: 'Unpack the rich living pharmacy and wildlife of the Cayo river valleys. Led by indigenous bushcraft and naturalist guides, discover traditional remedies extracted from gumbo limbo, contribution trees, and copal resin. Spot toucans, motmots, parrots, and track howler monkey troops along the Macal River trail. Optional dusk extension reveals nocturnal bioluminescence and tree frogs.',
    badge: 'Eco-Education',
    category: 'nature',
    priceUsd: 70, // BZD $140
    duration: 'Half Day · 3.5h',
    physicalRating: 'Easy / Nature Walk',
    rating: 4.91,
    reviewsCount: 153,
    image: '/src/assets/images/tour_jungle_trek_birds_1791165206549.jpg',
    location: 'San Ignacio / Macal River Valley, Cayo',
    minAge: 4,
    departureTime: '6:00 AM (Birding) or 2:30 PM (Flora)',
    isAvailable: true,
    included: [
      'Licensed Naturalist & Ethnobotanist Guide',
      'High-Power Swarovski Binoculars & Spotting Scope',
      'Medicinal Plant Identification Field Guide',
      'Local organic fruit snacks and chilled coconut water',
      'San Ignacio hotel pickup and drop-off'
    ],
    whatToBring: [
      'Lightweight long sleeve shirt and pants',
      'Comfortable walking shoes',
      'Insect repellent and camera with zoom lens',
      'Field notebook or bird checklist'
    ]
  }
];
