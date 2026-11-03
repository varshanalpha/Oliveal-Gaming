import { useState, useEffect } from 'react';
import { ValueProposition, BookingStep } from '../types';
import { getValuePropositions, getBookingSteps } from '../services/contentService';

export function useContent() {
  const [valuePropositions, setValuePropositions] = useState<ValueProposition[]>([]);
  const [bookingSteps, setBookingSteps] = useState<BookingStep[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([getValuePropositions(), getBookingSteps()]).then(([values, steps]) => {
      if (isMounted) {
        setValuePropositions(values);
        setBookingSteps(steps);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { valuePropositions, bookingSteps, loading };
}
