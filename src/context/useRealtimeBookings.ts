/**
 * useRealtimeBookings Hook
 * Provides bidirectional real-time synchronization between Client Drawers and Admin CRM
 * Gracefully integrates Firebase Firestore onSnapshot when connected, or responsive local reactive state
 */
import { useEffect, useState } from 'react';
import { useApp } from './AppContext';
import { BookingDetails } from '../types/tour';
import { db, collection, query, where, orderBy } from '../firebase.config';
import { onSnapshot } from 'firebase/firestore';

export function useRealtimeBookings(userEmail?: string | null) {
  const { allBookings, currentBooking, updateBookingPaymentStatus } = useApp();
  const [realtimeBookings, setRealtimeBookings] = useState<BookingDetails[]>(allBookings);
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  useEffect(() => {
    // Keep local synchronized
    setRealtimeBookings(allBookings);

    // If Firestore is available and online, attach onSnapshot listener
    let unsubscribe: (() => void) | undefined;

    try {
      if (db) {
        const bookingsCol = collection(db, 'bookings');
        const q = userEmail 
          ? query(bookingsCol, where('leadTraveler.email', '==', userEmail))
          : bookingsCol;

        unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            if (!snapshot.empty) {
              const liveData: BookingDetails[] = [];
              snapshot.forEach((doc) => {
                liveData.push(doc.data() as BookingDetails);
              });
              setRealtimeBookings(liveData);
              setIsLiveConnected(true);
            }
          },
          (err) => {
            // Handle offline / fallback silently
            setIsLiveConnected(false);
          }
        );
      }
    } catch {
      setIsLiveConnected(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [allBookings, userEmail]);

  return {
    bookings: realtimeBookings,
    currentBooking,
    isLiveConnected,
    updateBookingPaymentStatus
  };
}
