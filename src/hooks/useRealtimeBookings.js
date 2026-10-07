/**
 * Real-Time Booking & Chat Synchronization Hook (JavaScript / JSX Compatible)
 * Connects Firestore onSnapshot listeners for /bookings and /chats/{userId}
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

export function useRealtimeBookings(options = {}) {
  const { 
    currentUser, 
    adminAuthenticated, 
    allBookings, 
    currentBooking, 
    chatThreads,
    userChatThreadId 
  } = useApp();

  const { notifyBookingStatusChange } = useToast();

  const [bookings, setBookings] = useState(allBookings || []);
  const [activeBooking, setActiveBooking] = useState(currentBooking || null);
  const [activeThread, setActiveThread] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const previousStatusMap = useRef({});
  const initialLoadDone = useRef(false);

  useEffect(() => {
    let unsubscribe = () => {};

    try {
      const bookingsCol = collection(db, 'bookings');
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
            const fetched = [];
            snapshot.forEach((docSnap) => {
              const data = docSnap.data();
              const bRef = data.bookingReference || docSnap.id;
              fetched.push({ ...data, bookingReference: bRef });

              const prevStatus = previousStatusMap.current[bRef];
              if (initialLoadDone.current && prevStatus && prevStatus !== data.paymentStatus) {
                notifyBookingStatusChange(bRef, data.paymentStatus);
              }
              previousStatusMap.current[bRef] = data.paymentStatus;
            });

            setBookings(fetched);
            if (options.bookingId) {
              const found = fetched.find(b => b.bookingReference === options.bookingId);
              if (found) setActiveBooking(found);
            } else if (currentBooking) {
              const found = fetched.find(b => b.bookingReference === currentBooking.bookingReference);
              if (found) setActiveBooking(found);
            }
          } else {
            setBookings(allBookings);
            setActiveBooking(currentBooking);
          }

          initialLoadDone.current = true;
        },
        (err) => {
          console.warn("Firestore bookings listener notice (offline fallback):", err.message);
          setIsLoading(false);
          setBookings(allBookings);
          setActiveBooking(currentBooking);
        }
      );
    } catch (e) {
      console.warn("Failed to attach Firestore snapshot listener:", e);
      setIsLoading(false);
      setBookings(allBookings);
    }

    return () => unsubscribe();
  }, [adminAuthenticated, currentUser?.uid, options.bookingId]);

  return {
    bookings,
    activeBooking,
    activeThread,
    isLoading,
    error,
    refreshBookings: () => setBookings([...allBookings])
  };
}

export default useRealtimeBookings;
