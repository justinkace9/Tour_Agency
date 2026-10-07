import { CustomerProfile } from '../types/tour';

export const INITIAL_CUSTOMERS: CustomerProfile[] = [
  {
    id: 'cust-1',
    fullName: 'Marcus Vance',
    email: 'm.vance@adventuretraveller.com',
    phone: '+1 (512) 883-2940',
    totalBookings: 2,
    totalSpentBzd: 1180,
    dietaryRestrictions: ['Traditional Belizean Rice & Beans', 'No peanuts'],
    pastTours: ['Actun Tunichil Muknal (ATM) Cave Expedition', 'Caracol Maya Ruins & Big Rock Falls'],
    pickupHotel: 'Ka’ana Resort, San Ignacio',
    notes: 'Experienced caver. Requested lead guide Carlos if possible.',
    joinedAt: '2026-08-12'
  },
  {
    id: 'cust-2',
    fullName: 'Elena Rostova',
    email: 'elena.rostova@nomadguide.org',
    phone: '+44 7911 123456',
    totalBookings: 1,
    totalSpentBzd: 920,
    dietaryRestrictions: ['Vegetarian', 'Gluten-Free'],
    pastTours: ['Xunantunich & Cave Tubing Combo'],
    pickupHotel: 'Chaa Creek Eco-Lodge, Cayo',
    notes: 'Traveling with 9-year-old daughter. Loved the hand-crank ferry.',
    joinedAt: '2026-09-02'
  },
  {
    id: 'cust-3',
    fullName: 'David K. Chen',
    email: 'david.chen@pacifictech.io',
    phone: '+1 (415) 902-8319',
    totalBookings: 1,
    totalSpentBzd: 570,
    dietaryRestrictions: ['Vegan'],
    pastTours: ['Barton Creek Cave Canoeing'],
    pickupHotel: 'San Ignacio Resort Hotel',
    notes: 'Avid nature photographer. Bringing low-light camera equipment.',
    joinedAt: '2026-09-18'
  },
  {
    id: 'cust-4',
    fullName: 'Sarah & Liam Jenkins',
    email: 'sarah.jenkins@ecotrails.net',
    phone: '+1 (617) 555-0192',
    totalBookings: 3,
    totalSpentBzd: 2450,
    dietaryRestrictions: ['Traditional Belizean Rice & Beans'],
    pastTours: ['ATM Cave', 'Caracol & Big Rock Falls', 'Barton Creek Cave Canoeing'],
    pickupHotel: 'Mystic River Resort, Cayo',
    notes: 'VIP Repeat Guests. Always tips guides generously in cash.',
    joinedAt: '2026-07-28'
  }
];
