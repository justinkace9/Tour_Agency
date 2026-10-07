import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Tour, 
  ItineraryItem, 
  BookingInquiry, 
  UserProfile, 
  CompanionMember, 
  AddOnItem, 
  BookingDetails, 
  BlogPost, 
  BlogComment,
  GroupTrip,
  GroupMember,
  GroupActivity,
  SectionVisibility,
  ChatThread, 
  ChatMessage, 
  CustomerProfile,
  SiteContent
} from '../types/tour';
import { TOURS_DATA } from '../data/toursData';
import { INITIAL_BLOG_POSTS } from '../data/blogData';
import { INITIAL_CHAT_THREADS } from '../data/chatData';
import { INITIAL_CUSTOMERS } from '../data/customerData';
import { INITIAL_BOOKINGS } from '../data/bookingsData';
import { INITIAL_SITE_CONTENT } from '../data/siteContentData';
import { 
  auth, 
  db, 
  doc, 
  setDoc, 
  collection, 
  signInWithPopup, 
  googleProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  uploadReceiptFile
} from '../firebase.config';

const INITIAL_ADDONS: AddOnItem[] = [
  {
    id: 'addon-shuttle',
    name: 'Private Shuttle Pickup in Cayo District',
    priceUsd: 45,
    description: 'Direct door-to-door transfer from remote jungle lodges (Chaa Creek, Blancaneaux, Ka’ana, Black Rock) in a 4x4 A/C van.',
    selected: false
  },
  {
    id: 'addon-gopro',
    name: 'GoPro Underwater 4K Action Cam Rental',
    priceUsd: 35,
    description: 'Rugged waterproof action camera with chest-mount and 64GB micro-SD card included (keep your footage!).',
    selected: false
  },
  {
    id: 'addon-hydration',
    name: 'Extra Hydration & Electrolyte CamelBak Pack',
    priceUsd: 15,
    description: 'Pre-filled 2L insulated hydration bladder with tropical lime electrolytes and waterproof phone pouch.',
    selected: false
  }
];

const INITIAL_COMPANIONS: CompanionMember[] = [
  {
    id: 'comp-1',
    fullName: 'Alex Morgan',
    ageGroup: 'Adult',
    dietaryRestrictions: ['Traditional Belizean Rice & Beans'],
    notes: 'Likes spicy habanero salsa'
  }
];

interface AppContextType {
  currentUser: UserProfile | null;
  tours: Tour[];
  favorites: string[];
  itinerary: ItineraryItem[];
  selectedTour: Tour | null;
  activeView: 'home' | 'tours' | 'guide' | 'itinerary' | 'blog' | 'contact' | 'admin';
  isSearchOpen: boolean;
  isAuthModalOpen: boolean;
  isItineraryOpen: boolean;
  isFavoritesOpen: boolean;
  isCheckoutOpen: boolean;
  isVoucherOpen: boolean;
  isChatOpen: boolean;
  chatActiveTab: 'ai' | 'agent';
  adminAuthenticated: boolean;
  searchPreferences: { date: string; guests: number };
  setSearchPreferences: (prefs: { date: string; guests: number }) => void;
  bookingInquiries: BookingInquiry[];
  searchQuery: string;
  selectedCategory: string;
  currency: 'USD' | 'BZD';
  companions: CompanionMember[];
  addOns: AddOnItem[];
  currentBooking: BookingDetails | null;
  userChatThreadId: string;
  
  // Phase 3 CRM & Admin State
  blogPosts: BlogPost[];
  chatThreads: ChatThread[];
  customers: CustomerProfile[];
  allBookings: BookingDetails[];
  siteContent: SiteContent;
  updateSiteContent: (newContent: Partial<SiteContent>) => void;
  updateGuideProfile: (newProfile: Partial<SiteContent['guideProfile']>) => void;
  updateBannerAnnouncement: (newBanner: Partial<SiteContent['bannerAnnouncement']>) => void;

  // Navigation & Modal triggers
  setActiveView: (view: 'home' | 'tours' | 'guide' | 'itinerary' | 'blog' | 'contact' | 'admin') => void;
  setSelectedTour: (tour: Tour | null) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsItineraryOpen: (open: boolean) => void;
  setIsFavoritesOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsVoucherOpen: (open: boolean) => void;
  setIsChatOpen: (open: boolean) => void;
  setChatActiveTab: (tab: 'ai' | 'agent') => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string) => void;
  setCurrency: (c: 'USD' | 'BZD') => void;
  toggleFavorite: (tourId: string) => void;
  
  // Itinerary Cart
  addToItinerary: (
    tour: Tour, 
    date: string, 
    guests: number, 
    pickupLocation: string, 
    specialRequests?: string,
    dietaryPreferences?: string[],
    packedLunchRequest?: string
  ) => void;
  removeFromItinerary: (itemId: string) => void;
  updateItineraryItem: (itemId: string, updates: Partial<ItineraryItem>) => void;
  clearItinerary: () => void;
  
  // Companions
  addCompanion: (companion: Omit<CompanionMember, 'id'>) => void;
  removeCompanion: (id: string) => void;
  updateCompanion: (id: string, updates: Partial<CompanionMember>) => void;
  
  // Add-ons
  toggleAddOn: (id: string) => void;

  // Checkout & Booking
  setCurrentBooking: (b: BookingDetails | null) => void;
  createBookingFromCart: (leadTraveler: { fullName: string; email: string; phone: string }, pickupLocation: string) => BookingDetails;
  submitAtlanticBankReceipt: (bookingRef: string, file: File) => Promise<BookingDetails>;
  updateBookingPaymentStatus: (bookingRef: string, status: 'verified' | 'rejected' | 'under_review', adminNotes?: string, rejectionReason?: string) => void;

  // Tour CMS
  addTour: (tour: Tour) => void;
  updateTour: (tourId: string, updates: Partial<Tour>) => void;
  deleteTour: (tourId: string) => void;
  updateTourPrice: (tourId: string, newPrice: number) => void;
  toggleTourAvailability: (tourId: string) => void;

  // Blog CMS & Community
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (postId: string, updates: Partial<BlogPost>) => void;
  deleteBlogPost: (postId: string) => void;
  upvoteBlogPost: (postId: string) => void;
  addBlogComment: (postId: string, comment: Omit<BlogComment, 'id' | 'createdAt'>, parentCommentId?: string) => void;

  // Master Phase 8 Collaborative Social Trip Planner
  groupTrip: GroupTrip;
  updateGroupTrip: (updates: Partial<GroupTrip>) => void;
  inviteGroupMember: (name: string, email: string) => void;
  updateMemberPaymentStatus: (memberId: string, status: GroupMember['paidStatus'], receiptUrl?: string) => void;
  voteOnTour: (memberId: string, tourId: string, vote: 'up' | 'down') => void;
  addGroupNote: (author: string, text: string) => void;

  // Master Phase 8 Section Visibility CMS
  updateSectionVisibility: (updates: Partial<SectionVisibility>) => void;

  // Chat Support Console
  sendAgentMessage: (threadId: string, text: string, tourCard?: Tour) => void;
  sendCustomerMessage: (threadId: string, text: string) => void;
  markThreadAsRead: (threadId: string) => void;

  // Customer CRM
  updateCustomerNotes: (customerId: string, notes: string) => void;

  // Auth
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signupWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  
  // Admin general
  setAdminAuthenticated: (val: boolean) => void;
  updateInquiryStatus: (inquiryId: string, status: 'Pending' | 'Approved' | 'Completed' | 'Canceled') => void;
  createBookingInquiry: (tour: Tour, name: string, email: string, phone: string, date: string, guests: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  
  const [tours, setTours] = useState<Tour[]>(() => {
    try {
      const CURRENT_DATA_VERSION = 'cayo_v3_10_tours';
      const savedVersion = localStorage.getItem('cayo_version_key');
      const saved = localStorage.getItem('cayo_tours_data');

      if (savedVersion !== CURRENT_DATA_VERSION || !saved) {
        localStorage.setItem('cayo_version_key', CURRENT_DATA_VERSION);
        localStorage.setItem('cayo_tours_data', JSON.stringify(TOURS_DATA));
        return TOURS_DATA;
      }

      const parsed = JSON.parse(saved) as Tour[];
      // If cached data has fewer tours than TOURS_DATA (e.g. old 4-tour cache), merge immediately
      const parsedMap = new Map(parsed.map(t => [t.id, t]));
      const merged: Tour[] = TOURS_DATA.map(t => {
        const found = parsedMap.get(t.id);
        return found ? { ...t, ...found, image: t.image } : t;
      });
      parsed.forEach(t => {
        if (!merged.some(m => m.id === t.id)) {
          merged.push(t);
        }
      });
      localStorage.setItem('cayo_tours_data', JSON.stringify(merged));
      return merged;
    } catch (e) {
      console.error("Error loading tours from localStorage:", e);
      return TOURS_DATA;
    }
  });
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('cayo_favorites');
    return saved ? JSON.parse(saved) : ['atm-cave'];
  });

  const [itinerary, setItinerary] = useState<ItineraryItem[]>(() => {
    const saved = localStorage.getItem('cayo_itinerary');
    return saved ? JSON.parse(saved) : [
      {
        id: 'itin-sample-1',
        tourId: 'atm-cave',
        tourTitle: 'Actun Tunichil Muknal (ATM) Cave Expedition',
        priceUsd: 135,
        selectedDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        guestsCount: 2,
        pickupLocation: 'Ka’ana Resort, San Ignacio Town',
        dietaryPreferences: ['Traditional Belizean Rice & Beans'],
        packedLunchRequest: 'Extra fresh fruit & roasted plantains',
        addedAt: '10:00 AM'
      }
    ];
  });

  const [companions, setCompanions] = useState<CompanionMember[]>(() => {
    const saved = localStorage.getItem('cayo_companions');
    return saved ? JSON.parse(saved) : INITIAL_COMPANIONS;
  });

  const [addOns, setAddOns] = useState<AddOnItem[]>(() => {
    const saved = localStorage.getItem('cayo_addons');
    return saved ? JSON.parse(saved) : INITIAL_ADDONS;
  });

  const [currency, setCurrency] = useState<'USD' | 'BZD'>('USD');
  
  const [allBookings, setAllBookings] = useState<BookingDetails[]>(() => {
    const saved = localStorage.getItem('cayo_all_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [currentBooking, setCurrentBooking] = useState<BookingDetails | null>(() => {
    const saved = localStorage.getItem('cayo_current_booking');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS[0];
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('cayo_blog_posts');
    return saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
  });

  const [chatThreads, setChatThreads] = useState<ChatThread[]>(() => {
    const saved = localStorage.getItem('cayo_chat_threads');
    return saved ? JSON.parse(saved) : INITIAL_CHAT_THREADS;
  });

  const [customers, setCustomers] = useState<CustomerProfile[]>(() => {
    const saved = localStorage.getItem('cayo_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const INITIAL_GROUP_TRIP: GroupTrip = {
    id: 'trip-cayo-2026',
    title: 'Belize Backcountry Adventure 2026',
    destination: 'San Ignacio Town, Cayo District',
    startDate: '2026-11-12',
    endDate: '2026-11-16',
    inviteCode: 'CYO-7729',
    members: [
      {
        id: 'member-1',
        name: 'Alex Rivera (You)',
        email: 'alex.rivera@gmail.com',
        role: 'owner',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        status: 'confirmed',
        paidStatus: 'paid',
        amountDueBzd: 320,
        votes: { 'tour-atm-cave': 'up', 'tour-xunantunich': 'up', 'tour-barton-creek': 'up' }
      },
      {
        id: 'member-2',
        name: 'Sarah Chen',
        email: 'sarah.c@adventures.com',
        role: 'companion',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        status: 'confirmed',
        paidStatus: 'receipt_submitted',
        amountDueBzd: 320,
        receiptUrl: '/src/assets/images/atlantic_bank_receipt_sample.jpg',
        votes: { 'tour-atm-cave': 'up', 'tour-xunantunich': 'up' }
      },
      {
        id: 'member-3',
        name: 'Marcus Brody',
        email: 'marcus.brody@gmail.com',
        role: 'companion',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        status: 'confirmed',
        paidStatus: 'pending',
        amountDueBzd: 320,
        votes: { 'tour-atm-cave': 'up', 'tour-barton-creek': 'down' }
      },
      {
        id: 'member-4',
        name: 'Elena Rostova',
        email: 'elena.rostova@travel.org',
        role: 'companion',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        status: 'invited',
        paidStatus: 'pending',
        amountDueBzd: 320,
        votes: {}
      }
    ],
    tourIds: ['tour-atm-cave', 'tour-xunantunich', 'tour-barton-creek'],
    notes: [
      {
        id: 'note-1',
        author: 'Alex Rivera',
        text: 'Remember we need high wool socks for the ATM Cave upper chamber! Let’s meet at the Burns Ave office at 7:15 AM.',
        createdAt: 'Yesterday at 4:30 PM'
      },
      {
        id: 'note-2',
        author: 'Sarah Chen',
        text: 'Transferred $320 BZD through Atlantic Bank online banking. Uploaded receipt screenshot for operator verification!',
        createdAt: 'Today at 9:15 AM'
      }
    ],
    activities: [
      {
        id: 'act-1',
        userName: 'Alex Rivera',
        action: 'Created group expedition "Belize Backcountry Adventure 2026"',
        timestamp: '3 days ago',
        iconType: 'invite'
      },
      {
        id: 'act-2',
        userName: 'Sarah Chen',
        action: 'Joined expedition via invite code CYO-7729',
        timestamp: '2 days ago',
        iconType: 'invite'
      },
      {
        id: 'act-3',
        userName: 'Marcus Brody',
        action: 'Voted 👍 on Actun Tunichil Muknal (ATM Cave)',
        timestamp: 'Yesterday',
        iconType: 'vote'
      },
      {
        id: 'act-4',
        userName: 'Sarah Chen',
        action: 'Uploaded Atlantic Bank transfer receipt screenshot',
        timestamp: '4 hours ago',
        iconType: 'payment'
      }
    ]
  };

  const [groupTrip, setGroupTrip] = useState<GroupTrip>(() => {
    try {
      const saved = localStorage.getItem('cayo_group_trip');
      return saved ? JSON.parse(saved) : INITIAL_GROUP_TRIP;
    } catch {
      return INITIAL_GROUP_TRIP;
    }
  });

  useEffect(() => {
    localStorage.setItem('cayo_group_trip', JSON.stringify(groupTrip));
  }, [groupTrip]);

  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem('cayo_site_content');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_SITE_CONTENT,
          ...parsed,
          bannerAnnouncement: {
            ...INITIAL_SITE_CONTENT.bannerAnnouncement,
            ...(parsed.bannerAnnouncement || {}),
            items: (parsed.bannerAnnouncement?.items && parsed.bannerAnnouncement.items.length > 0)
              ? parsed.bannerAnnouncement.items
              : INITIAL_SITE_CONTENT.bannerAnnouncement.items
          },
          guideProfile: {
            ...INITIAL_SITE_CONTENT.guideProfile,
            ...(parsed.guideProfile || {})
          },
          sectionVisibility: {
            ...INITIAL_SITE_CONTENT.sectionVisibility,
            ...(parsed.sectionVisibility || {})
          }
        };
      }
    } catch (e) {
      console.warn("Error reading cayo_site_content:", e);
    }
    return INITIAL_SITE_CONTENT;
  });

  const [bookingInquiries, setBookingInquiries] = useState<BookingInquiry[]>(() => {
    const saved = localStorage.getItem('cayo_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [activeView, setActiveView] = useState<'home' | 'tours' | 'guide' | 'itinerary' | 'blog' | 'contact' | 'admin'>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatActiveTab, setChatActiveTab] = useState<'ai' | 'agent'>('ai');
  const [userChatThreadId] = useState<string>(() => {
    const saved = localStorage.getItem('cayo_user_chat_thread_id');
    if (saved) return saved;
    const newId = 'chat-101'; // Default linked to Marcus Vance / current session
    localStorage.setItem('cayo_user_chat_thread_id', newId);
    return newId;
  });
  
  const [adminAuthenticated, setAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('cayo_admin_auth') === 'true';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchPreferences, setSearchPreferences] = useState<{ date: string; guests: number }>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return {
      date: d.toISOString().split('T')[0],
      guests: 2
    };
  });

  // Persistence Sync
  useEffect(() => {
    localStorage.setItem('cayo_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cayo_itinerary', JSON.stringify(itinerary));
  }, [itinerary]);

  useEffect(() => {
    localStorage.setItem('cayo_companions', JSON.stringify(companions));
  }, [companions]);

  useEffect(() => {
    localStorage.setItem('cayo_addons', JSON.stringify(addOns));
  }, [addOns]);

  useEffect(() => {
    localStorage.setItem('cayo_all_bookings', JSON.stringify(allBookings));
  }, [allBookings]);

  useEffect(() => {
    localStorage.setItem('cayo_current_booking', JSON.stringify(currentBooking));
  }, [currentBooking]);

  useEffect(() => {
    localStorage.setItem('cayo_blog_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('cayo_chat_threads', JSON.stringify(chatThreads));
  }, [chatThreads]);

  useEffect(() => {
    localStorage.setItem('cayo_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('cayo_tours_data', JSON.stringify(tours));
  }, [tours]);

  useEffect(() => {
    localStorage.setItem('cayo_site_content', JSON.stringify(siteContent));
  }, [siteContent]);

  const updateSiteContent = (newContent: Partial<SiteContent>) => {
    setSiteContent(prev => ({
      ...prev,
      ...newContent
    }));
  };

  const updateGuideProfile = (newProfile: Partial<SiteContent['guideProfile']>) => {
    setSiteContent(prev => ({
      ...prev,
      guideProfile: {
        ...prev.guideProfile,
        ...newProfile
      }
    }));
  };

  const updateBannerAnnouncement = (newBanner: Partial<SiteContent['bannerAnnouncement']>) => {
    setSiteContent(prev => ({
      ...prev,
      bannerAnnouncement: {
        ...prev.bannerAnnouncement,
        ...newBanner
      }
    }));
  };

  // Auth observer
  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email?.split('@')[0] || 'Explorer',
            photoURL: user.photoURL,
            isAnonymous: user.isAnonymous
          });
        } else {
          setCurrentUser(null);
        }
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn("Auth listener notice:", e);
    }
  }, []);

  const toggleFavorite = (tourId: string) => {
    setFavorites(prev => 
      prev.includes(tourId) ? prev.filter(id => id !== tourId) : [...prev, tourId]
    );
  };

  const addToItinerary = (
    tour: Tour, 
    date: string, 
    guests: number, 
    pickupLocation: string, 
    specialRequests?: string,
    dietaryPreferences?: string[],
    packedLunchRequest?: string
  ) => {
    const newItem: ItineraryItem = {
      id: `itin-${Date.now()}`,
      tourId: tour.id,
      tourTitle: tour.title,
      priceUsd: tour.priceUsd,
      selectedDate: date || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      guestsCount: guests || 2,
      pickupLocation: pickupLocation || 'San Ignacio Town Center (or Hotel Pickup)',
      specialRequests,
      dietaryPreferences: dietaryPreferences || ['Traditional Belizean Rice & Beans'],
      packedLunchRequest,
      addedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setItinerary(prev => [newItem, ...prev]);
    setIsItineraryOpen(true);
  };

  const removeFromItinerary = (itemId: string) => {
    setItinerary(prev => prev.filter(item => item.id !== itemId));
  };

  const updateItineraryItem = (itemId: string, updates: Partial<ItineraryItem>) => {
    setItinerary(prev => prev.map(item => item.id === itemId ? { ...item, ...updates } : item));
  };

  const clearItinerary = () => {
    setItinerary([]);
  };

  const addCompanion = (comp: Omit<CompanionMember, 'id'>) => {
    const newComp: CompanionMember = {
      ...comp,
      id: `comp-${Date.now()}`
    };
    setCompanions(prev => [...prev, newComp]);
  };

  const removeCompanion = (id: string) => {
    setCompanions(prev => prev.filter(c => c.id !== id));
  };

  const updateCompanion = (id: string, updates: Partial<CompanionMember>) => {
    setCompanions(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const toggleAddOn = (id: string) => {
    setAddOns(prev => prev.map(a => a.id === id ? { ...a, selected: !a.selected } : a));
  };

  const createBookingFromCart = (
    leadTraveler: { fullName: string; email: string; phone: string }, 
    pickupLocation: string
  ): BookingDetails => {
    const toursTotal = itinerary.reduce((acc, item) => acc + item.priceUsd * item.guestsCount, 0);
    const addOnsTotal = addOns.filter(a => a.selected).reduce((acc, a) => acc + a.priceUsd, 0);
    const subtotalUsd = toursTotal + addOnsTotal;
    const taxesUsd = Math.round(subtotalUsd * 0.09 * 100) / 100;
    const totalUsd = Math.round((subtotalUsd + taxesUsd) * 100) / 100;
    const totalBzd = totalUsd * 2;

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const bookingRef = `BET-${randomSuffix}`;

    const newBooking: BookingDetails = {
      bookingReference: bookingRef,
      leadTraveler,
      pickupLocation: pickupLocation || 'San Ignacio Town Base / Hotel',
      tours: [...itinerary],
      companions: [...companions],
      addOns: addOns.filter(a => a.selected),
      currency,
      subtotalUsd,
      taxesUsd,
      totalUsd,
      totalBzd,
      paymentStatus: 'unpaid',
      createdAt: new Date().toISOString()
    };

    setCurrentBooking(newBooking);
    setAllBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const submitAtlanticBankReceipt = async (bookingRef: string, file: File): Promise<BookingDetails> => {
    const fileUrl = await uploadReceiptFile(file, bookingRef);

    const updatedBooking: BookingDetails = {
      ...(currentBooking || allBookings.find(b => b.bookingReference === bookingRef) || {
        bookingReference: bookingRef,
        leadTraveler: { fullName: 'Lead Explorer', email: 'guest@cayo.com', phone: '+501 610-8687' },
        pickupLocation: 'San Ignacio Town Center',
        tours: [...itinerary],
        companions: [...companions],
        addOns: addOns.filter(a => a.selected),
        currency: 'USD',
        subtotalUsd: 270,
        taxesUsd: 24.3,
        totalUsd: 294.3,
        totalBzd: 588.6,
        paymentStatus: 'under_review',
        createdAt: new Date().toISOString()
      }),
      paymentStatus: 'under_review',
      receiptFileName: file.name,
      receiptFileUrl: fileUrl,
      uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toISOString().split('T')[0]
    };

    setCurrentBooking(updatedBooking);
    setAllBookings(prev => {
      const exists = prev.some(b => b.bookingReference === bookingRef);
      if (exists) {
        return prev.map(b => b.bookingReference === bookingRef ? updatedBooking : b);
      }
      return [updatedBooking, ...prev];
    });

    // Save record to Firestore
    try {
      await setDoc(doc(db, 'bookings', bookingRef), {
        ...updatedBooking,
        firestoreUpdatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.warn("Firestore save notice:", err);
    }

    return updatedBooking;
  };

  const updateBookingPaymentStatus = (
    bookingRef: string, 
    status: 'verified' | 'rejected' | 'under_review', 
    adminNotes?: string, 
    rejectionReason?: string
  ) => {
    setAllBookings(prev => prev.map(b => {
      if (b.bookingReference === bookingRef) {
        return {
          ...b,
          paymentStatus: status,
          adminNotes: adminNotes ?? b.adminNotes,
          rejectionReason: rejectionReason ?? b.rejectionReason
        };
      }
      return b;
    }));

    if (currentBooking?.bookingReference === bookingRef) {
      setCurrentBooking(prev => prev ? {
        ...prev,
        paymentStatus: status,
        adminNotes: adminNotes ?? prev.adminNotes,
        rejectionReason: rejectionReason ?? prev.rejectionReason
      } : null);
    }

    // Auto-update Firestore
    try {
      setDoc(doc(db, 'bookings', bookingRef), {
        paymentStatus: status,
        adminNotes,
        rejectionReason,
        statusUpdatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.warn("Firestore status update notice:", err);
    }

    // If verified or rejected, generate automated chat agent message
    setChatThreads(prev => prev.map(th => {
      if (th.bookingRef === bookingRef) {
        const automatedText = status === 'verified'
          ? `Official Operator Alert: Atlantic Bank Wire for booking ${bookingRef} has been verified and confirmed! Your booking voucher is now ready for offline download.`
          : `Operator Update for ${bookingRef}: Receipt under review. Note: ${rejectionReason || 'Please upload a clear screenshot of the bank transfer slip.'}`;
        
        return {
          ...th,
          lastMessage: automatedText,
          lastTimestamp: 'Just now',
          messages: [
            ...th.messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'agent',
              text: automatedText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      }
      return th;
    }));
  };

  // Tour CMS Actions
  const addTour = (newTour: Tour) => {
    setTours(prev => [newTour, ...prev]);
  };

  const updateTour = (tourId: string, updates: Partial<Tour>) => {
    setTours(prev => prev.map(t => t.id === tourId ? { ...t, ...updates } : t));
  };

  const deleteTour = (tourId: string) => {
    setTours(prev => prev.filter(t => t.id !== tourId));
  };

  const updateTourPrice = (tourId: string, newPrice: number) => {
    setTours(prev => prev.map(t => t.id === tourId ? { ...t, priceUsd: newPrice } : t));
  };

  const toggleTourAvailability = (tourId: string) => {
    setTours(prev => prev.map(t => t.id === tourId ? { ...t, isAvailable: !t.isAvailable } : t));
  };

  // Blog CMS Actions
  const addBlogPost = (post: BlogPost) => {
    setBlogPosts(prev => [post, ...prev]);
  };

  const updateBlogPost = (postId: string, updates: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(p => p.id === postId ? { ...p, ...updates } : p));
  };

  const deleteBlogPost = (postId: string) => {
    setBlogPosts(prev => prev.filter(p => p.id !== postId));
  };

  const upvoteBlogPost = (postId: string) => {
    setBlogPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, upvotes: (p.upvotes || 0) + 1 };
      }
      return p;
    }));
  };

  const addBlogComment = (postId: string, commentData: Omit<BlogComment, 'id' | 'createdAt'>, parentCommentId?: string) => {
    const newComment: BlogComment = {
      id: `comm-${Date.now()}`,
      authorName: commentData.authorName,
      authorAvatar: commentData.authorAvatar || (currentUser?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'),
      text: commentData.text,
      createdAt: 'Just now',
      likes: 0,
      replies: []
    };

    setBlogPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      if (!parentCommentId) {
        return {
          ...p,
          comments: [newComment, ...(p.comments || [])]
        };
      }
      const updatedComments = (p.comments || []).map(comm => {
        if (comm.id === parentCommentId) {
          return {
            ...comm,
            replies: [...(comm.replies || []), newComment]
          };
        }
        return comm;
      });
      return { ...p, comments: updatedComments };
    }));
  };

  // Group Trip Planner Actions
  const updateGroupTrip = (updates: Partial<GroupTrip>) => {
    setGroupTrip(prev => ({ ...prev, ...updates }));
  };

  const inviteGroupMember = (name: string, email: string) => {
    const newMember: GroupMember = {
      id: `mem-${Date.now()}`,
      name,
      email,
      role: 'companion',
      status: 'invited',
      paidStatus: 'pending',
      amountDueBzd: 320,
      votes: {}
    };
    const newActivity: GroupActivity = {
      id: `act-${Date.now()}`,
      userName: currentUser?.displayName || 'Alex Rivera',
      action: `Invited ${name} (${email}) to the expedition`,
      timestamp: 'Just now',
      iconType: 'invite'
    };
    setGroupTrip(prev => ({
      ...prev,
      members: [...prev.members, newMember],
      activities: [newActivity, ...prev.activities]
    }));
  };

  const updateMemberPaymentStatus = (memberId: string, status: GroupMember['paidStatus'], receiptUrl?: string) => {
    setGroupTrip(prev => {
      const member = prev.members.find(m => m.id === memberId);
      const newActivity: GroupActivity = {
        id: `act-${Date.now()}`,
        userName: member?.name || 'Group Member',
        action: status === 'paid' 
          ? 'Atlantic Bank payment verified by operator'
          : status === 'receipt_submitted'
          ? 'Submitted Atlantic Bank payment transfer receipt'
          : 'Payment marked as pending',
        timestamp: 'Just now',
        iconType: 'payment'
      };
      return {
        ...prev,
        members: prev.members.map(m => m.id === memberId ? { 
          ...m, 
          paidStatus: status,
          receiptUrl: receiptUrl !== undefined ? receiptUrl : m.receiptUrl
        } : m),
        activities: [newActivity, ...prev.activities]
      };
    });
  };

  const voteOnTour = (memberId: string, tourId: string, vote: 'up' | 'down') => {
    setGroupTrip(prev => {
      const tour = tours.find(t => t.id === tourId);
      const member = prev.members.find(m => m.id === memberId);
      const newActivity: GroupActivity = {
        id: `act-${Date.now()}`,
        userName: member?.name || 'Group Explorer',
        action: `Voted ${vote === 'up' ? '👍' : '👎'} on ${tour?.title || 'Expedition'}`,
        timestamp: 'Just now',
        iconType: 'vote'
      };
      return {
        ...prev,
        members: prev.members.map(m => m.id === memberId ? {
          ...m,
          votes: { ...m.votes, [tourId]: vote }
        } : m),
        activities: [newActivity, ...prev.activities]
      };
    });
  };

  const addGroupNote = (author: string, text: string) => {
    const newNote = {
      id: `note-${Date.now()}`,
      author,
      text,
      createdAt: 'Just now'
    };
    const newActivity: GroupActivity = {
      id: `act-${Date.now()}`,
      userName: author,
      action: `Added note: "${text.slice(0, 35)}..."`,
      timestamp: 'Just now',
      iconType: 'note'
    };
    setGroupTrip(prev => ({
      ...prev,
      notes: [newNote, ...prev.notes],
      activities: [newActivity, ...prev.activities]
    }));
  };

  const updateSectionVisibility = (updates: Partial<SectionVisibility>) => {
    setSiteContent(prev => ({
      ...prev,
      sectionVisibility: {
        ...(prev.sectionVisibility || {
          showTopRibbonBanner: true,
          showGuideSpotlight: true,
          showHorizontalTours: true,
          showTrustBadges: true,
          showCommunityBlog: true,
          showContactSection: true,
          showGroupPlanner: true
        }),
        ...updates
      }
    }));
  };

  // Chat Support Console Actions
  const sendAgentMessage = (threadId: string, text: string, tourCard?: Tour) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'agent',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      tourCard: tourCard ? {
        id: tourCard.id,
        title: tourCard.title,
        priceUsd: tourCard.priceUsd,
        image: tourCard.image
      } : undefined
    };

    setChatThreads(prev => prev.map(th => {
      if (th.id === threadId) {
        return {
          ...th,
          lastMessage: text,
          lastTimestamp: 'Just now',
          messages: [...th.messages, newMsg]
        };
      }
      return th;
    }));
  };

  const sendCustomerMessage = (threadId: string, text: string) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'customer',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatThreads(prev => {
      const exists = prev.some(th => th.id === threadId);
      if (exists) {
        return prev.map(th => {
          if (th.id === threadId) {
            return {
              ...th,
              unreadCount: th.unreadCount + 1,
              lastMessage: text,
              lastTimestamp: 'Just now',
              messages: [...th.messages, newMsg]
            };
          }
          return th;
        });
      } else {
        const newThread: ChatThread = {
          id: threadId,
          customerName: currentUser?.displayName || 'Online Guest',
          customerEmail: currentUser?.email || 'guest@cayoecotours.com',
          customerPhone: '+501 615-8899',
          bookingRef: currentBooking?.bookingReference || 'BET-NEW',
          unreadCount: 1,
          lastMessage: text,
          lastTimestamp: 'Just now',
          messages: [newMsg]
        };
        return [newThread, ...prev];
      }
    });
  };

  const markThreadAsRead = (threadId: string) => {
    setChatThreads(prev => prev.map(th => th.id === threadId ? { ...th, unreadCount: 0 } : th));
  };

  // Customer CRM Actions
  const updateCustomerNotes = (customerId: string, notes: string) => {
    setCustomers(prev => prev.map(c => c.id === customerId ? { ...c, notes } : c));
  };

  // Auth Handlers
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        setCurrentUser({
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL
        });
      }
    } catch (err: any) {
      setCurrentUser({
        uid: 'belize-guest-' + Math.random().toString(36).substring(7),
        email: 'belize.guest@example.com',
        displayName: 'Eco Explorer',
        photoURL: null
      });
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      if (result.user) {
        setCurrentUser({
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName || email.split('@')[0],
          photoURL: result.user.photoURL
        });
      }
    } catch (err: any) {
      setCurrentUser({
        uid: 'user-' + Date.now(),
        email: email,
        displayName: email.split('@')[0],
      });
    }
  };

  const signupWithEmail = async (email: string, pass: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      if (result.user) {
        setCurrentUser({
          uid: result.user.uid,
          email: result.user.email,
          displayName: email.split('@')[0]
        });
      }
    } catch (err: any) {
      setCurrentUser({
        uid: 'user-' + Date.now(),
        email: email,
        displayName: email.split('@')[0]
      });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn("Sign out notice:", err);
    }
    setCurrentUser(null);
  };

  const updateInquiryStatus = (inquiryId: string, status: 'Pending' | 'Approved' | 'Completed' | 'Canceled') => {
    setBookingInquiries(prev => prev.map(inq => inq.id === inquiryId ? { ...inq, status } : inq));
  };

  const createBookingInquiry = (tour: Tour, name: string, email: string, phone: string, date: string, guests: number) => {
    const newInq: BookingInquiry = {
      id: `inq-${Date.now()}`,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      tourId: tour.id,
      tourTitle: tour.title,
      date,
      guests,
      totalUsd: tour.priceUsd * guests,
      status: 'Pending',
      timestamp: 'Just now'
    };
    setBookingInquiries(prev => [newInq, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        tours,
        favorites,
        itinerary,
        selectedTour,
        activeView,
        isSearchOpen,
        isAuthModalOpen,
        isItineraryOpen,
        isFavoritesOpen,
        isCheckoutOpen,
        isVoucherOpen,
        isChatOpen,
        chatActiveTab,
        userChatThreadId,
        adminAuthenticated,
        searchPreferences,
        setSearchPreferences,
        bookingInquiries,
        searchQuery,
        selectedCategory,
        currency,
        companions,
        addOns,
        currentBooking,
        blogPosts,
        chatThreads,
        customers,
        allBookings,
        siteContent,
        updateSiteContent,
        updateGuideProfile,
        updateBannerAnnouncement,
        setActiveView,
        setSelectedTour,
        setIsSearchOpen,
        setIsAuthModalOpen,
        setIsItineraryOpen,
        setIsFavoritesOpen,
        setIsCheckoutOpen,
        setIsVoucherOpen,
        setIsChatOpen,
        setChatActiveTab,
        setSearchQuery,
        setSelectedCategory,
        setCurrency,
        toggleFavorite,
        addToItinerary,
        removeFromItinerary,
        updateItineraryItem,
        clearItinerary,
        addCompanion,
        removeCompanion,
        updateCompanion,
        toggleAddOn,
        setCurrentBooking,
        createBookingFromCart,
        submitAtlanticBankReceipt,
        updateBookingPaymentStatus,
        addTour,
        updateTour,
        deleteTour,
        updateTourPrice,
        toggleTourAvailability,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        upvoteBlogPost,
        addBlogComment,
        groupTrip,
        updateGroupTrip,
        inviteGroupMember,
        updateMemberPaymentStatus,
        voteOnTour,
        addGroupNote,
        updateSectionVisibility,
        sendAgentMessage,
        sendCustomerMessage,
        markThreadAsRead,
        updateCustomerNotes,
        loginWithGoogle,
        loginWithEmail,
        signupWithEmail,
        logout,
        setAdminAuthenticated: (val: boolean) => {
          setAdminAuthenticated(val);
          sessionStorage.setItem('cayo_admin_auth', val ? 'true' : 'false');
        },
        updateInquiryStatus,
        createBookingInquiry
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
