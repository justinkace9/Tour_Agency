import { Tour } from '../types/tour';
import { TOURS_DATA } from '../data/toursData';

export interface AIResponse {
  text: string;
  recommendedTours?: Tour[];
  suggestedFollowUps?: string[];
}

export const QUICK_PROMPTS = [
  "What should I wear to ATM Cave?",
  "Can I do Xunantunich & Cave Tubing in one day?",
  "Best tours for families in Cayo?",
  "Where are the best fry jacks in San Ignacio?"
];

/**
 * Intelligent Cayo Travel Buddy Engine
 * Synthesizes deep San Ignacio & Cayo District expedition knowledge
 */
export async function getCayoBuddyResponse(userQuery: string): Promise<AIResponse> {
  const query = userQuery.toLowerCase().trim();

  // 1. ATM Cave inquiries
  if (query.includes('atm') || query.includes('actun tunichil') || query.includes('wear') && query.includes('cave')) {
    const atmTour = TOURS_DATA.find(t => t.id === 'atm-cave');
    return {
      text: `**Expedition Preparation for ATM (Actun Tunichil Muknal) Cave:**\n\n` +
        `• **Footwear**: Sturdy closed-toe water shoes or lightweight trail sneakers with traction. **Crucial**: Bring a pair of clean, dry socks in your pocket—NICH regulations require wearing only socks inside the upper sacred dry chambers to protect the delicate calcite crystal calcifications and the *Crystal Maiden* skeleton.\n` +
        `• **Clothing**: Quick-dry athletic shorts or lightweight leggings and a synthetic/rash-guard top. You will swim across the entrance and wade through waist-deep mountain streams.\n` +
        `• **Strict Camera Policy**: Absolute **NO cameras, GoPros, or smartphones** allowed in the cave. This rule has been strictly enforced by the Belize Institute of Archaeology (NICH) since 2012 when an unsecured camera was dropped on a 1,000-year-old Maya skull.\n` +
        `• **What to leave in our van**: Complete change of dry clothes, towel, and flip-flops for after the trek.\n\n` +
        `Our licensed guides provide certified helmets, high-lumen headlamps, and a Belizean buffet lunch!`,
      recommendedTours: atmTour ? [atmTour] : [],
      suggestedFollowUps: [
        "How physically demanding is the ATM trek?",
        "Can kids do the ATM Cave?",
        "What is included in the ATM Cave tour price?"
      ]
    };
  }

  // 2. Xunantunich & Tubing Combo
  if (query.includes('xunantunich') || query.includes('tubing') || query.includes('combo') || query.includes('one day')) {
    const comboTour = TOURS_DATA.find(t => t.id === 'nohoch-cheen-tubing-zipline' || t.id === 'xunantunich-ruins');
    return {
      text: `**Yes, absolutely!** Our **Xunantunich & Cave Tubing Combo** is our most popular full-day inland adventure:\n\n` +
        `• **Morning (Xunantunich)**: A scenic 15-minute drive from San Ignacio to the village of San José Succotz. You'll cross the jade-green Mopan River aboard the iconic hand-cranked ferry, then ascend to *El Castillo* (130 ft tall). The climb is gentle and panoramic—offering 360° views across the jungle canopy into Guatemala.\n` +
        `• **Belizean Lunch**: Enjoy hot stewed chicken with coconut rice & beans and fried sweet plantains at a riverside pavilion.\n` +
        `• **Afternoon (Cave Tubing)**: Float on heavy-duty inflatable tubes through ancient limestone cave systems (Nohoch Che'en Reserve) illuminated only by your headlamp while learning ancient Maya underworld mythology.\n\n` +
        `Total duration is roughly 7.5 hours with all park entrance permits and gear included.`,
      recommendedTours: comboTour ? [comboTour] : [],
      suggestedFollowUps: [
        "Is Xunantunich good for children?",
        "What shoes do I need for cave tubing?",
        "Can I add private shuttle pickup?"
      ]
    };
  }

  // Miss Gissell Rodriguez & Private Guide Inquiries
  if (query.includes('gissell') || query.includes('rodriguez') || query.includes('lead guide') || query.includes('private tour') || query.includes('operator')) {
    const atmTour = TOURS_DATA.find(t => t.id === 'atm-cave');
    const crystalTour = TOURS_DATA.find(t => t.id === 'crystal-cave-challenge');
    return {
      text: `**Meet Miss Gissell Rodriguez — Independent Licensed Tour Guide & Local Operator:**\n\n` +
        `• **Base**: San Ignacio Town, Cayo District, Belize.\n` +
        `• **Credentials**: BTB Licensed Guide, San Ignacio Local Expert, and ATM Cave Specialist.\n` +
        `• **Guiding Style**: Enthusiastic, highly knowledgeable, and welcoming. Gissell specializes in unhurried, personalized inland eco-adventures with strict attention to safety, local history, and cultural heritage.\n` +
        `• **Specialties**: Actun Tunichil Muknal (ATM) Cave, Maya Archaeology, Crystal Cave expeditions, and custom family itineraries.\n\n` +
        `You can click **"Book a Private Tour with Gissell"** on the landing page or WhatsApp (+501 610-8687) to coordinate your private excursion dates!`,
      recommendedTours: [atmTour, crystalTour].filter(Boolean) as Tour[],
      suggestedFollowUps: [
        "What is included in a private tour with Gissell?",
        "Can Gissell guide us to the ATM Cave?",
        "What is the difference between ATM and Crystal Cave?"
      ]
    };
  }

  // 3. Family friendly tours
  if (query.includes('family') || query.includes('kid') || query.includes('children') || query.includes('easy')) {
    const barton = TOURS_DATA.find(t => t.id === 'barton-creek-canoeing');
    const cahal = TOURS_DATA.find(t => t.id === 'cahal-pech-ruins');
    return {
      text: `**Best Cayo Adventures for Families & Multi-Generational Groups:**\n\n` +
        `1. **Barton Creek Cave Canoeing**: The absolute #1 relaxing cave adventure. Instead of vigorous hiking or swimming, you gently paddle an expedition canoe into a massive vaulted cavern cathedral beneath stalactite chandeliers. Great for ages 5 to 75!\n` +
        `2. **Cahal Pech Maya Ruins**: Right above San Ignacio town! Compact, shady walking trails through royal residential courtyards and visitor museum. Ideal for young kids and seniors.\n` +
        `3. **Xunantunich Maya Ruins**: Broad manicured grassy plazas, easy walking stairs, and the thrilling hand-cranked ferry crossing across the Mopan River that kids love.\n` +
        `4. **Cave Tubing at Nohoch Che'en**: Gentle river currents with life jackets and joined tubes, perfect for safe family floating.\n\n` +
        `*Note: For ATM Cave, participants must be at least 40 inches tall and comfortable swimming short stretches.*`,
      recommendedTours: [barton, cahal].filter(Boolean) as Tour[],
      suggestedFollowUps: [
        "Tell me more about Barton Creek Cave",
        "Do you provide child life vests?",
        "Where should we eat with kids in San Ignacio?"
      ]
    };
  }

  // 4. San Ignacio Food & Fry Jacks
  if (query.includes('food') || query.includes('eat') || query.includes('fry jack') || query.includes('restaurant') || query.includes('dinner')) {
    return {
      text: `**San Ignacio Town Local Foodie Guide (Authentic Cayo Flavors):**\n\n` +
        `• **Pop's Restaurant (West St)**: The reigning breakfast champion of Belize. Order the golden, puffed **Fry Jacks** stuffed with scrambled eggs, refried red beans, and Dutch cheese. Pair with Belizean roasted coffee.\n` +
        `• **Ko-Ox Han-Nah ("Let's Go Eat") on Burns Ave**: Famous for homemade flour tortillas, tender lamb curry from their local farm, Maya stewed pork, and ice-cold fresh lime juice.\n` +
        `• **Guava Limb Restaurant & Cafe**: Elegant farm-to-table dining perched above the Macal River park. Amazing artisan pizzas, passionfruit salads, and lemongrass iced teas.\n` +
        `• **Erva's**: Down-home comfort cooking with slow-simmered Belizean stew chicken, habanero-onion onion dip, and coconut rice.\n` +
        `• **Saturday Morning Farmers Market**: Visit the riverside for fresh tropical papaya, coconut water chopped straight from the nut, and handmade Salvadoran pupusas!`,
      recommendedTours: [],
      suggestedFollowUps: [
        "What is the local currency and do they take US Dollars?",
        "What are the best tours in San Ignacio?",
        "How do we get to San Ignacio from Belize City?"
      ]
    };
  }

  // 5. Caracol & Mountain Pine Ridge
  if (query.includes('caracol') || query.includes('waterfall') || query.includes('pine ridge') || query.includes('big rock')) {
    const caracolTour = TOURS_DATA.find(t => t.id === 'caracol-pine-ridge');
    return {
      text: `**Caracol Maya City & Mountain Pine Ridge Expedition:**\n\n` +
        `• **Caracol**: The most expansive Maya metropolis in Belize, sprawling across 75 square miles in the Chiquibul Forest. The iconic **Caana ("Sky Palace")** rises 143 feet into the clouds and remains one of the tallest human-made structures in the nation.\n` +
        `• **Mountain Pine Ridge Scenic Stop**: On the return journey through the granite hills, we stop at **Big Rock Falls**, a thunderous 150-foot waterfall cascading into a crystal turquoise swimming pool where you can cliff-jump or swim in brisk mountain water.\n` +
        `• **Vehicle**: Conducted in rugged 4x4 expedition vehicles equipped with high-clearance suspension for the scenic rainforest backroads.`,
      recommendedTours: caracolTour ? [caracolTour] : [],
      suggestedFollowUps: [
        "How long is the drive to Caracol?",
        "Can we swim at Big Rock Falls?",
        "What is the difference between Caracol and Xunantunich?"
      ]
    };
  }

  // 6. Currency, Logistics, General
  if (query.includes('dollar') || query.includes('currency') || query.includes('money') || query.includes('cash') || query.includes('pay') || query.includes('atlantic')) {
    return {
      text: `**Belize Money & Payment Essentials:**\n\n` +
        `• **Fixed Exchange Rate**: The Belize Dollar is permanently pegged to the US Dollar at **2 BZD = 1 USD**.\n` +
        `• **US Dollars Accepted Everywhere**: You can pay with clean, un-torn US cash notes everywhere in Cayo. Change is commonly given in Belize Dollars.\n` +
        `• **Atlantic Bank Transfers**: For online bookings with Cayo Eco-Tours, we accept local Atlantic Bank direct wires/transfers with zero international surcharge.\n` +
        `• **ATM Cash Access**: San Ignacio Town has multiple Atlantic Bank and Belize Bank ATMs on Burns Avenue that accept foreign Visa and Mastercard.`,
      suggestedFollowUps: [
        "How do I book a tour with Atlantic Bank?",
        "What is the cancellation policy?",
        "Can I speak with a live booking agent?"
      ]
    };
  }

  // 7. Airport Shuttles & Transport from Belize City
  if (query.includes('shuttle') || query.includes('airport') || query.includes('bze') || query.includes('transfer') || query.includes('belize city') || query.includes('how to get')) {
    return {
      text: `**Getting to San Ignacio & Cayo District Transfers:**\n\n` +
        `• **From BZE International Airport**: San Ignacio is roughly 70 miles (112 km) west of Philip Goldson Airport (BZE), taking about 1.5 to 2 hours along the paved George Price Highway.\n` +
        `• **Private Hotel Shuttles**: We provide door-to-door air-conditioned 4x4 van transfers directly to all San Ignacio resorts (Chaa Creek, Ka'ana, San Ignacio Resort Hotel, Blancaneaux, etc.).\n` +
        `• **Add to Booking**: You can add our Private Shuttle Add-on ($45 USD) directly in your Custom Itinerary Builder!\n` +
        `• **Water Taxi Connections**: If you're coming from San Pedro or Caye Caulker, we can pick you up directly at the Belize City Water Taxi terminal.`,
      suggestedFollowUps: [
        "How much is the private shuttle add-on?",
        "Can I add Xunantunich on my transfer day?",
        "Where are the best fry jacks in San Ignacio?"
      ]
    };
  }

  // 8. Weather, Rain & Best Time to Visit
  if (query.includes('weather') || query.includes('rain') || query.includes('season') || query.includes('when to visit') || query.includes('month')) {
    return {
      text: `**Cayo Weather & Seasonal Guide:**\n\n` +
        `• **Dry Season (December – May)**: Ideal sunny jungle trekking weather with lower humidity. Rivers run jade-clear and water levels in ATM Cave and Barton Creek are optimal.\n` +
        `• **Green/Rainy Season (June – November)**: Lush, vibrant canopy with thunderous waterfalls like Big Rock Falls and Thousand Foot Falls at peak splendor. Rains usually come in short afternoon tropical showers that rarely cancel tours.\n` +
        `• **Cave Safety Monitoring**: We receive direct morning water-level telemetry from the Belize Institute of Archaeology before launching any cave expedition. If water levels rise, guest safety is paramount and we provide free rebooking or alternative excursions.`,
      suggestedFollowUps: [
        "What happens if it rains on tour day?",
        "What should I wear to ATM Cave?",
        "Best tours for families in Cayo?"
      ]
    };
  }

  // 9. Safety, Certifications & BTB License
  if (query.includes('safe') || query.includes('license') || query.includes('btb') || query.includes('guide') || query.includes('insurance')) {
    return {
      text: `**Safety Standards & Licensing:**\n\n` +
        `• **Belize Tourism Board Licensed**: We are fully certified under **License #BTB-2024-CYO-0482** with full commercial expedition insurance.\n` +
        `• **Small Group Ratios**: Strict maximum of 8 guests per licensed guide for intimate attention and heightened safety inside cave systems.\n` +
        `• **Guide Qualifications**: Every expedition leader is born and raised in Cayo, certified in Wilderness First Responder (WFR), swiftwater navigation, and vetted by the Institute of Archaeology (NICH).\n` +
        `• **Premium Gear**: High-lumen waterproof headlamps, Petzl climbing helmets, and U.S. Coast Guard-approved life vests provided.`,
      suggestedFollowUps: [
        "What is included in the tour price?",
        "Can kids do the ATM Cave?",
        "Can I speak with a live booking agent?"
      ]
    };
  }

  // 10. Dynamic Tour Matching
  const matchedTours = TOURS_DATA.filter(t => 
    query.split(' ').some(word => word.length > 3 && (
      t.title.toLowerCase().includes(word) ||
      t.category.toLowerCase().includes(word) ||
      t.location.toLowerCase().includes(word) ||
      t.shortDescription.toLowerCase().includes(word)
    ))
  );

  if (matchedTours.length > 0) {
    const primary = matchedTours[0];
    return {
      text: `**${primary.title} (${primary.badge})**\n\n` +
        `• **Location**: ${primary.location}\n` +
        `• **Duration**: ${primary.duration} · **Rating**: ${primary.physicalRating}\n` +
        `• **Price**: $${primary.priceUsd} USD / $${primary.priceUsd * 2} BZD per explorer (All permits, lunch & transport included)\n\n` +
        `${primary.fullDescription}\n\n` +
        `*Tip: You can tap "Quick Add to Itinerary" below to include this tour in your personalized Belize trip!*`,
      recommendedTours: matchedTours.slice(0, 2),
      suggestedFollowUps: [
        `What should I wear for ${primary.title}?`,
        "Can I add private shuttle pickup?",
        "What is the cancellation policy?"
      ]
    };
  }

  // Fallback intelligent summary with highlights
  return {
    text: `Hello! I'm your **Cayo Travel Buddy**, powered by local San Ignacio expedition guides. Here is what makes Cayo District world-famous:\n\n` +
      `• **Sacred Caves**: Actun Tunichil Muknal (ATM) & Barton Creek canoeing.\n` +
      `• **Maya Temples**: Xunantunich overlooking Guatemala & Caracol's towering Caana pyramid.\n` +
      `• **River Thrills**: Cave tubing at Nohoch Che'en and Macal River kayaking.\n\n` +
      `Ask me anything about gear, physical ratings, tour combos, or local San Ignacio food! Or toggle over to **Live Travel Agent** to speak directly with our San Ignacio expedition office.`,
    recommendedTours: TOURS_DATA.slice(0, 2),
    suggestedFollowUps: [
      "What should I wear to ATM Cave?",
      "Can I do Xunantunich & Cave Tubing in one day?",
      "Where are the best fry jacks in San Ignacio?"
    ]
  };
}
