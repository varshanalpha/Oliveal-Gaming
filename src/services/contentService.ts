import { ValueProposition, BookingStep } from '../types';
import { MOCK_VALUE_PROPOSITIONS } from '../mock-data/features';
import { MOCK_BOOKING_STEPS } from '../mock-data/steps';

export async function getValuePropositions(): Promise<ValueProposition[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...MOCK_VALUE_PROPOSITIONS]);
    }, 40);
  });
}

export async function getBookingSteps(): Promise<BookingStep[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...MOCK_BOOKING_STEPS]);
    }, 40);
  });
}

