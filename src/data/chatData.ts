import { ChatThread } from '../types/tour';

export const INITIAL_CHAT_THREADS: ChatThread[] = [
  {
    id: 'chat-101',
    customerName: 'Marcus Vance',
    customerEmail: 'm.vance@adventuretraveller.com',
    customerPhone: '+1 (512) 883-2940',
    bookingRef: 'BET-84920',
    unreadCount: 1,
    lastMessage: 'I just uploaded our Atlantic Bank deposit slip for the ATM Cave expedition. Can you confirm receipt?',
    lastTimestamp: '10:42 AM',
    messages: [
      {
        id: 'msg-1',
        sender: 'customer',
        text: 'Good morning! We are staying at Ka’ana Resort and looking forward to our ATM Cave trek on Thursday.',
        timestamp: '10:35 AM'
      },
      {
        id: 'msg-2',
        sender: 'agent',
        text: 'Good morning Marcus! Welcome to Cayo. Yes, our 4x4 van is scheduled to pick you up directly from Ka’ana lobby at 7:30 AM.',
        timestamp: '10:38 AM'
      },
      {
        id: 'msg-3',
        sender: 'customer',
        text: 'I just uploaded our Atlantic Bank deposit slip for the ATM Cave expedition. Can you confirm receipt?',
        timestamp: '10:42 AM'
      }
    ]
  },
  {
    id: 'chat-102',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@nomadguide.org',
    customerPhone: '+44 7911 123456',
    bookingRef: 'BET-39104',
    unreadCount: 0,
    lastMessage: 'Thank you for the quick confirmation! We have our water shoes ready.',
    lastTimestamp: 'Yesterday',
    messages: [
      {
        id: 'msg-201',
        sender: 'customer',
        text: 'Hi there, do you recommend Xunantunich or Caracol for a family with a 9 year old?',
        timestamp: 'Yesterday 2:15 PM'
      },
      {
        id: 'msg-202',
        sender: 'agent',
        text: 'Hello Elena! Both are fantastic, but Xunantunich is closer to town (15 mins) and includes the fun Mopan hand-crank ferry crossing, which kids adore. Here is the combo tour card:',
        timestamp: 'Yesterday 2:18 PM',
        tourCard: {
          id: 'xunantunich-tubing',
          title: 'Xunantunich & Cave Tubing Combo',
          priceUsd: 115,
          image: '/src/assets/images/tour_xunantunich_1790779725322.jpg'
        }
      },
      {
        id: 'msg-203',
        sender: 'customer',
        text: 'Thank you for the quick confirmation! We have our water shoes ready.',
        timestamp: 'Yesterday 2:40 PM'
      }
    ]
  },
  {
    id: 'chat-103',
    customerName: 'David K. Chen',
    customerEmail: 'david.chen@pacifictech.io',
    customerPhone: '+1 (415) 902-8319',
    bookingRef: 'BET-91823',
    unreadCount: 2,
    lastMessage: 'Are GoPros allowed inside Barton Creek cave? I know ATM prohibits them.',
    lastTimestamp: '08:15 AM',
    messages: [
      {
        id: 'msg-301',
        sender: 'customer',
        text: 'Hello! We are interested in Barton Creek canoeing tomorrow afternoon.',
        timestamp: '08:10 AM'
      },
      {
        id: 'msg-302',
        sender: 'customer',
        text: 'Are GoPros allowed inside Barton Creek cave? I know ATM prohibits them.',
        timestamp: '08:15 AM'
      }
    ]
  }
];

export const QUICK_AGENT_RESPONSES = [
  {
    title: 'Payment Received & Verified',
    text: 'We have received and verified your Atlantic Bank transfer screenshot. Your reservation is now officially confirmed, and your voucher is active!'
  },
  {
    title: 'Pickup Time Confirmation',
    text: 'Our licensed driver and guide will arrive in an air-conditioned 4x4 expedition van at your hotel lobby at 7:30 AM sharp.'
  },
  {
    title: 'ATM Footwear & Sock Rule',
    text: 'Friendly reminder: Please bring a clean pair of dry socks for the sacred upper dry chambers inside ATM Cave. Closed-toe water shoes are required for the river hike.'
  },
  {
    title: 'Lunch Dietary Confirmation',
    text: 'We have noted your party’s dietary preferences with our local kitchen. Your organic Belizean stew chicken, vegetarian, and allergy-safe portions will be packed fresh this morning.'
  }
];
