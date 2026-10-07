import { BlogPost } from '../types/tour';

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Top 5 Caves to Explore in San Ignacio: From Sacred ATM to Subterranean Rivers',
    subtitle: 'A local guide breakdown of Belize’s underground wonders, physical ratings, and spiritual Maya significance.',
    slug: 'top-5-caves-san-ignacio',
    excerpt: 'San Ignacio is Belize’s subterranean caving capital. Discover which underground river or sacred ceremonial chamber best matches your adventure appetite.',
    content: `San Ignacio Town in Cayo District is the undisputed gateway to the ancient Maya underworld known as Xibalba. Beneath the lush jungle canopy lies an intricate network of limestone caverns carved by subterranean rivers over millions of years.

### 1. Actun Tunichil Muknal (ATM Cave)
Ranked as the #1 Sacred Cave on Earth by National Geographic. The expedition requires swimming into the cave entrance, wading through subterranean waterfalls, and climbing to upper ledges to witness the calcified skeleton of the "Crystal Maiden."

### 2. Barton Creek Cave
A peaceful, cathedral-vaulted cavern explored entirely by canoe. Equipped with powerful exploration spotlights, you'll glide past ancient pottery shards left high on rock ledges by Maya priests.

### 3. Nohoch Che'en (Cave Tubing)
Float on heavy-duty river tubes through dark stalactite-studded caves where the emerald river flows gently beneath subterranean ceilings.

### 4. Che Chem Ha Cave
Famous for its pristine collection of ceremonial storage vessels and high altitude chambers decorated with ancient grain containers.

### 5. Rio Frio Cave
Located in Mountain Pine Ridge, featuring a soaring 65-foot limestone arch where natural daylight filters through massive granite rock arches.`,
    coverImage: '/src/assets/images/tour_atm_cave_1790779714359.jpg',
    category: 'Caving Expeditions',
    tags: ['ATM Cave', 'Barton Creek', 'Spelunking', 'Xibalba'],
    author: 'Miss Gissell Rodriguez',
    authorTag: 'Lead Guide & BTB Instructor',
    status: 'featured',
    readTime: '6 min read',
    publishedAt: '2026-09-15',
    upvotes: 64,
    embeddedTourId: 'tour-atm-cave',
    embeddedTour: {
      id: 'tour-atm-cave',
      title: 'Actun Tunichil Muknal (ATM Cave) Sacred Expedition',
      priceUsd: 135,
      priceBzd: 270,
      duration: 'Full Day (8 Hours)',
      image: '/src/assets/images/tour_atm_cave_1790779714359.jpg',
      rating: 4.98,
      category: 'Caving'
    },
    comments: [
      {
        id: 'c-1',
        authorName: 'Sarah Jenkins',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        text: 'Miss Gissell led our family into ATM last week. The swim through the hourglass keyhole was unforgettable! Are water shoes provided or should we pack our own sneakers?',
        createdAt: '2 days ago',
        likes: 12,
        replies: [
          {
            id: 'c-1-r1',
            authorName: 'Miss Gissell Rodriguez',
            authorAvatar: '/src/assets/images/guide_gissell_rodriguez_1791165132468.jpg',
            text: 'Hello Sarah! So glad you enjoyed the sacred chambers. We recommend packing your own broken-in trail sneakers with good grip, but our expedition shop in San Ignacio also stocks rental water shoes if needed!',
            createdAt: '1 day ago',
            likes: 8
          }
        ]
      },
      {
        id: 'c-2',
        authorName: 'Marcus Vance',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        text: 'Barton Creek canoeing was pure serenity. The acoustics when the guide whispers in the main chamber gave me chills.',
        createdAt: '4 days ago',
        likes: 5
      }
    ]
  },
  {
    id: 'post-2',
    title: 'Essential Packing Guide for the ATM Cave: Socks, Footwear & Camera Rules',
    subtitle: 'NICH conservation standards explained: why dry socks protect the calcite crystal floors.',
    slug: 'packing-guide-atm-cave',
    excerpt: 'Strict NICH preservation regulations govern what you can bring inside ATM Cave. Here is everything you need to know before stepping into Tapir Mountain Reserve.',
    content: `Planning your expedition to Actun Tunichil Muknal (ATM)? Because ATM is both an active archeological site and a delicate hydrological ecosystem, the National Institute of Culture and History (NICH) enforces strict rules.

### Mandatory Item: Clean Socks
When entering the dry upper ceremonial chambers where the skeletal remains and calcified pottery lie, visitors must remove footwear and walk solely in clean socks to prevent oil and sediment transfer from degrading the calcite floor.

### Footwear for the Jungle Trek & Swim
Wear sturdy closed-toe trail sneakers or water shoes with aggressive rubber grip. You will cross the Roaring River three times on the 45-minute jungle hike before swimming into the cave mouth.

### Strict Prohibition on Cameras and Phones
Following an unfortunate tourist mishap in 2012 where a dropped camera fractured an ancient skull, all cameras, GoPros, and cell phones are strictly forbidden inside the cave reserve. Licensed guides carry emergency radios only.`,
    coverImage: '/src/assets/images/tour_barton_creek_1790779744942.jpg',
    category: 'Travel Advice',
    tags: ['ATM Cave', 'Gear List', 'Safety', 'Eco Rules'],
    author: 'Senior Guide Manuel T.',
    authorTag: 'NICH Certified Speleologist',
    status: 'published',
    readTime: '4 min read',
    publishedAt: '2026-09-20',
    upvotes: 42,
    embeddedTourId: 'tour-barton-creek',
    embeddedTour: {
      id: 'tour-barton-creek',
      title: 'Barton Creek Cave Canoeing & Green Hills Butterfly Farm',
      priceUsd: 85,
      priceBzd: 170,
      duration: 'Half Day (5 Hours)',
      image: '/src/assets/images/tour_barton_creek_1790779744942.jpg',
      rating: 4.89,
      category: 'Water Adventures'
    },
    comments: [
      {
        id: 'c-3',
        authorName: 'David Chen',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        text: 'The no-camera rule actually made the experience 100x more immersive. Everyone was truly present in the sacred underworld.',
        createdAt: '3 days ago',
        likes: 19
      }
    ]
  },
  {
    id: 'post-3',
    title: 'Crossing the Historic Mopan Hand-Crank Ferry to Xunantunich',
    subtitle: 'Why the 19th-century mechanical river ferry is an iconic ritual on your way to El Castillo.',
    slug: 'mopan-ferry-xunantunich-guide',
    excerpt: 'One of the most charming traditions in Cayo: How a hand-cranked pontoon ferry transports vehicles and hikers across the Mopan River to the Stone Woman.',
    content: `Before ascending the 130-foot El Castillo pyramid at Xunantunich, travelers must cross the Mopan River in the village of San Jose Succotz.

The ferry itself is an iconic piece of living history: an unmotorized pontoon barge pulled across the emerald river by a ferryman using a mechanical hand-crank connected to an overhead steel cable.

It accommodates one vehicle at a time alongside pedestrians, providing a serene prelude to your ascent into the Maya classic period. Once across, a scenic 1-mile shaded road winds upwards into the ceremonial plaza.`,
    coverImage: '/src/assets/images/tour_xunantunich_1790779725322.jpg',
    category: 'Maya Heritage',
    tags: ['Xunantunich', 'Mopan River', 'Succotz', 'Pyramids'],
    author: 'Miss Gissell Rodriguez',
    authorTag: 'Lead Guide & Cayo Native',
    status: 'published',
    readTime: '3 min read',
    publishedAt: '2026-09-25',
    upvotes: 51,
    embeddedTourId: 'tour-xunantunich',
    embeddedTour: {
      id: 'tour-xunantunich',
      title: 'Xunantunich Temple & Cave Tubing Inland Combo',
      priceUsd: 110,
      priceBzd: 220,
      duration: 'Full Day (7 Hours)',
      image: '/src/assets/images/tour_xunantunich_1790779725322.jpg',
      rating: 4.95,
      category: 'Maya Ruins'
    },
    comments: [
      {
        id: 'c-4',
        authorName: 'Elena Rostova',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        text: 'The view from top of El Castillo looking over the Guatemalan border was breathtaking. The ferryman even let our son help crank the wheel!',
        createdAt: '5 days ago',
        likes: 14
      }
    ]
  }
];
