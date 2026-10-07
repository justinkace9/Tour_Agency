import { BookingDetails } from '../types/tour';

export const INITIAL_BOOKINGS: BookingDetails[] = [
  {
    bookingReference: 'BET-84920',
    leadTraveler: {
      fullName: 'Marcus Vance',
      email: 'm.vance@adventuretraveller.com',
      phone: '+1 (512) 883-2940'
    },
    pickupLocation: 'Ka’ana Resort, San Ignacio Town',
    tours: [
      {
        id: 'itin-101',
        tourId: 'atm-cave',
        tourTitle: 'Actun Tunichil Muknal (ATM) Cave Expedition',
        priceUsd: 135,
        selectedDate: '2026-10-14',
        guestsCount: 2,
        pickupLocation: 'Ka’ana Resort, San Ignacio Town',
        dietaryPreferences: ['Traditional Belizean Rice & Beans'],
        packedLunchRequest: 'Extra fresh roasted plantains and lime habanero sauce',
        addedAt: '10:30 AM'
      }
    ],
    companions: [
      {
        id: 'comp-101',
        fullName: 'Claire Vance',
        ageGroup: 'Adult',
        dietaryRestrictions: ['Vegetarian'],
        notes: 'Shoe size 8 women, first time cave swimmer'
      }
    ],
    addOns: [
      {
        id: 'addon-gopro',
        name: 'GoPro Underwater 4K Action Cam Rental',
        priceUsd: 35,
        description: 'Rugged waterproof action camera with chest-mount',
        selected: true
      }
    ],
    currency: 'USD',
    subtotalUsd: 305,
    taxesUsd: 27.45,
    totalUsd: 332.45,
    totalBzd: 664.90,
    paymentStatus: 'under_review',
    receiptFileName: 'atlantic_bank_transfer_slip_BET-84920.png',
    receiptFileUrl: '/src/assets/images/atlantic_bank_receipt_1790780769075.jpg',
    uploadedAt: '2026-09-30 10:42 AM',
    createdAt: '2026-09-30 10:30 AM'
  },
  {
    bookingReference: 'BET-39104',
    leadTraveler: {
      fullName: 'Elena Rostova',
      email: 'elena.rostova@nomadguide.org',
      phone: '+44 7911 123456'
    },
    pickupLocation: 'Chaa Creek Eco-Lodge, Cayo',
    tours: [
      {
        id: 'itin-102',
        tourId: 'xunantunich-tubing',
        tourTitle: 'Xunantunich & Cave Tubing Combo',
        priceUsd: 115,
        selectedDate: '2026-10-18',
        guestsCount: 3,
        pickupLocation: 'Chaa Creek Eco-Lodge, Cayo',
        dietaryPreferences: ['Gluten-Free', 'Vegetarian'],
        packedLunchRequest: 'Fresh tropical fruit salad',
        addedAt: 'Yesterday'
      }
    ],
    companions: [
      {
        id: 'comp-102',
        fullName: 'Misha Rostova',
        ageGroup: 'Child',
        dietaryRestrictions: ['Gluten-Free'],
        notes: '9 years old, loves swimming'
      }
    ],
    addOns: [],
    currency: 'BZD',
    subtotalUsd: 345,
    taxesUsd: 31.05,
    totalUsd: 376.05,
    totalBzd: 752.10,
    paymentStatus: 'verified',
    receiptFileName: 'online_banking_wire_BET-39104.jpg',
    receiptFileUrl: '/src/assets/images/tour_xunantunich_1790779725322.jpg',
    uploadedAt: '2026-09-29 02:40 PM',
    createdAt: '2026-09-29 02:15 PM'
  },
  {
    bookingReference: 'BET-91823',
    leadTraveler: {
      fullName: 'David K. Chen',
      email: 'david.chen@pacifictech.io',
      phone: '+1 (415) 902-8319'
    },
    pickupLocation: 'San Ignacio Resort Hotel',
    tours: [
      {
        id: 'itin-103',
        tourId: 'barton-creek',
        tourTitle: 'Barton Creek Cave Canoeing',
        priceUsd: 95,
        selectedDate: '2026-10-21',
        guestsCount: 2,
        pickupLocation: 'San Ignacio Resort Hotel',
        dietaryPreferences: ['Vegan'],
        packedLunchRequest: 'Fresh seasonal fruit and coconut rice',
        addedAt: '08:10 AM'
      }
    ],
    companions: [],
    addOns: [
      {
        id: 'addon-shuttle',
        name: 'Private Shuttle Pickup in Cayo District',
        priceUsd: 45,
        description: 'Direct door-to-door transfer in a 4x4 A/C van',
        selected: true
      }
    ],
    currency: 'USD',
    subtotalUsd: 235,
    taxesUsd: 21.15,
    totalUsd: 256.15,
    totalBzd: 512.30,
    paymentStatus: 'under_review',
    receiptFileName: 'mobile_transfer_slip_BET-91823.png',
    receiptFileUrl: '/src/assets/images/tour_barton_creek_1790779744942.jpg',
    uploadedAt: '2026-09-30 08:15 AM',
    createdAt: '2026-09-30 08:10 AM'
  }
];
