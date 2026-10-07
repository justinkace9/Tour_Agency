export interface Tour {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  badge: string;
  category: 'caves' | 'ruins' | 'tubing' | 'waterfalls' | 'extreme' | 'nature' | 'all';
  priceUsd: number;
  duration: string;
  physicalRating: string; // e.g. "Strenuous (Challenging)", "Moderate", etc.
  rating: number;
  reviewsCount: number;
  image: string;
  location: string;
  minAge: number;
  included: string[];
  whatToBring: string[];
  departureTime: string;
  isAvailable: boolean;
}

export interface ItineraryItem {
  id: string;
  tourId: string;
  tourTitle: string;
  priceUsd: number;
  selectedDate: string;
  guestsCount: number;
  pickupLocation: string;
  specialRequests?: string;
  dietaryPreferences?: string[];
  packedLunchRequest?: string;
  addedAt: string;
}

export interface CompanionMember {
  id: string;
  fullName: string;
  ageGroup: 'Adult' | 'Child';
  dietaryRestrictions: string[];
  notes?: string;
}

export interface AddOnItem {
  id: string;
  name: string;
  priceUsd: number;
  description: string;
  selected: boolean;
}

export interface BookingDetails {
  bookingReference: string; // e.g. "BET-84920"
  leadTraveler: {
    fullName: string;
    email: string;
    phone: string;
  };
  pickupLocation: string;
  tours: ItineraryItem[];
  companions: CompanionMember[];
  addOns: AddOnItem[];
  currency: 'USD' | 'BZD';
  subtotalUsd: number;
  taxesUsd: number;
  totalUsd: number;
  totalBzd: number;
  paymentStatus: 'unpaid' | 'under_review' | 'verified' | 'rejected';
  receiptFileName?: string;
  receiptFileUrl?: string;
  uploadedAt?: string;
  createdAt: string;
  adminNotes?: string;
  rejectionReason?: string;
  // BTB Compliance & Digital Liability Waiver
  liabilityWaiver?: {
    signedName: string;
    agreedAt: string;
    atmAdvisoryAcknowledged: boolean;
    medicalConditions: {
      hasCondition: boolean;
      details?: string;
      asthma: boolean;
      heartCondition: boolean;
      pregnancy: boolean;
    };
    emergencyContact: {
      name: string;
      phone: string;
      relationship: string;
    };
  };
}

export interface BookingInquiry {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  tourId: string;
  tourTitle: string;
  date: string;
  guests: number;
  totalUsd: number;
  status: 'Pending' | 'Approved' | 'Completed' | 'Canceled';
  timestamp: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  isAnonymous?: boolean;
}

export interface BlogComment {
  id: string;
  authorName: string;
  authorAvatar?: string;
  text: string;
  createdAt: string;
  likes?: number;
  replies?: BlogComment[];
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  authorTag?: string;
  status: 'published' | 'draft' | 'featured';
  readTime: string;
  publishedAt: string;
  upvotes: number;
  comments: BlogComment[];
  embeddedTourId?: string;
  embeddedTour?: {
    id: string;
    title: string;
    priceUsd: number;
    priceBzd: number;
    duration: string;
    image: string;
    rating: number;
    category: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'agent';
  text: string;
  timestamp: string;
  tourCard?: {
    id: string;
    title: string;
    priceUsd: number;
    image: string;
  };
}

export interface ChatThread {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingRef?: string;
  unreadCount: number;
  lastMessage: string;
  lastTimestamp: string;
  messages: ChatMessage[];
}

export interface CustomerProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  totalBookings: number;
  totalSpentBzd: number;
  dietaryRestrictions: string[];
  pastTours: string[];
  pickupHotel: string;
  notes: string;
  joinedAt: string;
}

export interface BannerItem {
  id: string;
  badge: string;
  text: string;
  actionText?: string;
  actionUrl?: string;
  urgency: 'info' | 'alert' | 'highlight';
}

export interface SectionVisibility {
  showTopRibbonBanner: boolean;
  showGuideSpotlight: boolean;
  showHorizontalTours: boolean;
  showTrustBadges: boolean;
  showCommunityBlog: boolean;
  showContactSection: boolean;
  showGroupPlanner: boolean;
}

export interface GroupMember {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'companion';
  avatar?: string;
  status: 'confirmed' | 'invited' | 'active';
  paidStatus: 'paid' | 'pending' | 'receipt_submitted';
  amountDueBzd: number;
  receiptUrl?: string;
  votes: Record<string, 'up' | 'down'>;
}

export interface GroupActivity {
  id: string;
  userName: string;
  action: string;
  timestamp: string;
  iconType?: 'add' | 'vote' | 'payment' | 'note' | 'invite';
}

export interface GroupTrip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  inviteCode: string;
  members: GroupMember[];
  tourIds: string[];
  notes: { id: string; author: string; text: string; createdAt: string }[];
  activities: GroupActivity[];
}

export interface SiteContent {
  businessName: string;
  phone: string;
  whatsapp: string;
  email: string;
  officeLocation: string;
  officeHours: string;
  btbLicense: string;
  bannerAnnouncement: {
    enabled: boolean;
    text: string;
    urgency: 'info' | 'alert' | 'highlight';
    actionText?: string;
    actionUrl?: string;
    items: BannerItem[];
    slideInterval: number;
    autoSlide?: boolean;
  };
  guideProfile: {
    name: string;
    title: string;
    license: string;
    yearsExperience: string;
    photoUrl: string;
    bio: string;
    specialties: string[];
    phone: string;
    safeTreksCount: string;
  };
  sectionVisibility?: SectionVisibility;
}
