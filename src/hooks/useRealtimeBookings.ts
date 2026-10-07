/**
 * Real-Time Booking & Chat Synchronization Hook
 * Syncs Firestore `/bookings` and `/chats/{userId}` with live snapshot listeners,
 * triggers global toast notifications on approval/rejection/receipt events,
 * and maintains seamless offline fallback.
 */

import { useState, useEffect, useRef } from 'react';
import { 
  onSnapshot, 
  collection, 
  doc, 
  query, 
  where, 
  orderBy,
  updateDoc 
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { BookingDetails, ChatThread, ChatMessage } from '../types/tour';

interface UseRealtimeBookingsOptions {
  bookingId?: string;
  enableChatSync?: boolean;
}

export function useRealtimeBookings(options: UseRealtimeBookingsOptions = {}) {
  const { 
    currentUser, 
    adminAuthenticated, 
    allBookings, 
    currentBooking, 
    setCurrentBooking,
    chatThreads,
    userChatThreadId
  } = useApp();

  const { showToast, notifyBookingStatusChange, notifyReceiptUpload } = useToast();

  const [bookings, setBookings] = useState<BookingDetails[]>(allBookings);
  const [activeBooking, setActiveBooking] = useState<BookingDetails | null>(currentBooking);
  const [activeThread, setActiveThread] = useState<ChatThread | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Store previous booking statuses to detect transitions without initial spam
  const previousStatusMap = useRef<Record<string, string>>({});
  const initialLoadDone = useRef<boolean>(false);

  // 1. REAL-TIME BOOKINGS LISTENER
  useEffect(() => {
    let unsubscribe = () => {};

    try {
      const bookingsCol = collection(db, 'bookings');
      
      // If admin, listen to all bookings. If regular user, listen to their bookings
      let bookingsQuery = query(bookingsCol, orderBy('createdAt', 'desc'));
      if (!adminAuthenticated && currentUser?.uid) {
        bookingsQuery = query(
          bookingsCol, 
          where('userId', '==', currentUser.uid),
          orderBy('createdAt', 'desc')
        );
      }

      unsubscribe = onSnapshot(
        bookingsQuery,
        (snapshot) => {
          setIsLoading(false);
          setError(null);

          if (!snapshot.empty) {
            const fetchedBookings: BookingDetails[] = [];

            snapshot.forEach((docSnap) => {
              const data = docSnap.data() as BookingDetails;
              const bRef = data.bookingReference || docSnap.id;
              fetchedBookings.push({ ...data, bookingReference: bRef });

              // Status change detection
              const prevStatus = previousStatusMap.current[bRef];
              if (initialLoadDone.current && prevStatus && prevStatus !== data.paymentStatus) {
                notifyBookingStatusChange(bRef, data.paymentStatus);
              }
              previousStatusMap.current[bRef] = data.paymentStatus;
            });

            setBookings(fetchedBookings);

            // Update active booking if present
            if (options.bookingId) {
              const match = fetchedBookings.find(b => b.bookingReference === options.bookingId);
              if (match) setActiveBooking(match);
            } else if (currentBooking) {
              const match = fetchedBookings.find(b => b.bookingReference === currentBooking.bookingReference);
              if (match) setActiveBooking(match);
            }
          } else {
            // Keep local fallback if Firestore empty
            setBookings(allBookings);
            setActiveBooking(currentBooking);
          }

          initialLoadDone.current = true;
        },
        (err) => {
          console.warn("Firestore bookings listener notice (offline fallback active):", err.message);
          setIsLoading(false);
          // Fall back gracefully to local state
          setBookings(allBookings);
          setActiveBooking(currentBooking);
        }
      );
    } catch (e: any) {
      console.warn("Failed to attach Firestore snapshot listener:", e);
      setIsLoading(false);
      setBookings(allBookings);
      setActiveBooking(currentBooking);
    }

    return () => unsubscribe();
  }, [adminAuthenticated, currentUser?.uid, options.bookingId]);

  // 2. REAL-TIME CHAT THREAD LISTENER
  useEffect(() => {
    if (!options.enableChatSync) return;

    let unsubscribe = () => {};
    const threadId = userChatThreadId || 'chat-101';

    try {
      const threadRef = doc(db, 'chats', threadId);
      unsubscribe = onSnapshot(
        threadRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const threadData = docSnap.data() as ChatThread;
            setActiveThread(threadData);
          } else {
            // Fallback from local chatThreads
            const localThread = chatThreads.find(t => t.id === threadId);
            if (localThread) setActiveThread(localThread);
          }
        },
        (err) => {
          console.warn("Firestore chat listener notice (offline fallback):", err.message);
          const localThread = chatThreads.find(t => t.id === threadId);
          if (localThread) setActiveThread(localThread);
        }
      );
    } catch (e) {
      console.warn("Failed to subscribe to chat thread:", e);
    }

    return () => unsubscribe();
  }, [options.enableChatSync, userChatThreadId, chatThreads]);

  // 3. ACTION DISPATCHERS WITH IMMEDIATE FEEDBACK
  const updateStatus = async (
    bookingRef: string, 
    newStatus: 'unpaid' | 'under_review' | 'verified' | 'rejected',
    notes?: string
  ) => {
    try {
      const bookingDocRef = doc(db, 'bookings', bookingRef);
      await updateDoc(bookingDocRef, {
        paymentStatus: newStatus,
        adminNotes: notes || '',
        updatedAt: new Date().toISOString()
      });
      notifyBookingStatusChange(bookingRef, newStatus);
    } catch (err: any) {
      console.warn("Could not update remote Firestore booking status, updating local state:", err.message);
      // Local fallback
      setBookings(prev => prev.map(b => b.bookingReference === bookingRef ? { ...b, paymentStatus: newStatus } : b));
      if (activeBooking?.bookingReference === bookingRef) {
        setActiveBooking(prev => prev ? { ...prev, paymentStatus: newStatus } : null);
      }
      notifyBookingStatusChange(bookingRef, newStatus);
    }
  };

  return {
    bookings,
    activeBooking,
    activeThread,
    isLoading,
    error,
    updateStatus,
    refreshBookings: () => setBookings([...allBookings])
  };
}

export default useRealtimeBookings;
