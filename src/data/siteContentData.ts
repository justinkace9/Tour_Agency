import { SiteContent } from '../types/tour';

export const INITIAL_SITE_CONTENT: SiteContent = {
  businessName: 'Cayo Eco-Tours',
  phone: '+501 824-2199',
  whatsapp: '+501 610-8687',
  email: 'expeditions@cayoecotoursbelize.com',
  officeLocation: '#18 Burns Avenue, San Ignacio Town, Cayo District, Belize, C.A.',
  officeHours: 'Daily: 6:00 AM – 9:00 PM CST (Central Time)',
  btbLicense: 'BTB-2024-CYO-0482',
  bannerAnnouncement: {
    enabled: true,
    text: 'ATM Cave is open daily — advance booking strongly recommended due to strictly enforced BTB daily park quotas!',
    urgency: 'highlight',
    actionText: 'Check ATM Availability',
    actionUrl: 'tours',
    slideInterval: 10, // seconds
    autoSlide: false, // relaxed by default as requested: "not always sliding, just the ability to slide to display the next highlight or website offer in the queue"
    items: [
      {
        id: 'banner-atm',
        badge: '🏛️ Daily Park Quota',
        text: 'ATM Sacred Cave is open daily — advance booking strongly recommended to guarantee certified spelunking permits.',
        actionText: 'Check ATM Slots',
        actionUrl: 'tours',
        urgency: 'highlight'
      },
      {
        id: 'banner-combo',
        badge: '🎁 Special Offer',
        text: 'Save 15% on Xunantunich Maya Ruins & Cave Tubing combo when booking 2+ explorers with Atlantic Bank transfer!',
        actionText: 'Build Custom Itinerary',
        actionUrl: 'itinerary',
        urgency: 'info'
      },
      {
        id: 'banner-water',
        badge: '🌊 River Report',
        text: 'Optimal river flow today! Macal & Mopan river levels crystal clear for Barton Creek Cave canoeing & Cave Tubing.',
        actionText: 'Explore Water Expeditions',
        actionUrl: 'tours',
        urgency: 'highlight'
      },
      {
        id: 'banner-guide',
        badge: '🌿 Lead Operator',
        text: 'Small-group guarantee (strict 8:1 ratio) led by Miss Gissell Rodriguez (BTB License #2024-C7).',
        actionText: 'Meet Lead Guide Gissell',
        actionUrl: 'guide',
        urgency: 'info'
      },
      {
        id: 'banner-atlantic',
        badge: '💳 Bank Wire Transfer',
        text: 'Atlantic Bank local BZD transfer accepted with zero card processing fees & instant WhatsApp receipt confirmation.',
        actionText: 'Payment Info',
        actionUrl: 'contact',
        urgency: 'alert'
      }
    ]
  },
  guideProfile: {
    name: 'Miss Gissell Rodriguez',
    title: 'Independent Licensed Tour Guide & Local Operator',
    license: 'BTB #2024-C7',
    yearsExperience: '12+ Years',
    photoUrl: '/src/assets/images/guide_gissell_rodriguez_1791165132468.jpg',
    bio: 'Born and raised along the Macal River valley in San Ignacio, Cayo. Certified by the Belize Tourism Board (BTB) and Institute of Archaeology (NICH) with specialized cave rescue and swiftwater training. Led over 850+ safe ATM cave expeditions.',
    specialties: [
      'ATM Cave Sacred Expedition',
      'Crystal Cave Challenge',
      'Maya Archaeology & Ceramics',
      'River Navigation & Spelunking',
      'Wilderness First Responder (WFR)'
    ],
    phone: '+501 610-8687',
    safeTreksCount: '850+ Safe Expeditions'
  },
  sectionVisibility: {
    showTopRibbonBanner: true,
    showGuideSpotlight: true,
    showHorizontalTours: true,
    showTrustBadges: true,
    showCommunityBlog: true,
    showContactSection: true,
    showGroupPlanner: true,
  }
};
