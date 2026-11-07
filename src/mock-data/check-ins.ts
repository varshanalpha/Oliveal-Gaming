import { CheckInRecord } from '../types/checkIn';

// Initial Recent Check-ins strictly matching the approved reference design
export const INITIAL_RECENT_CHECK_INS: CheckInRecord[] = [
  {
    id: 'CI-1001',
    serialNumber: 1,
    bookingId: 'BK-1001',
    customerName: 'Arjun K',
    customerInitials: 'AK',
    customerAvatarColor: 'from-purple-600 to-indigo-600',
    stationName: 'ALPHA',
    checkInTime: 'Nov 05, 11:29 AM',
    status: 'checked_in',
  },
  {
    id: 'CI-0999',
    serialNumber: 2,
    bookingId: 'BK-0999',
    customerName: 'Manoj S',
    customerInitials: 'MS',
    customerAvatarColor: 'from-fuchsia-600 to-purple-600',
    stationName: 'RS1',
    checkInTime: 'Nov 05, 01:00 PM',
    status: 'checked_in',
  },
  {
    id: 'CI-0998',
    serialNumber: 3,
    bookingId: 'BK-0998',
    customerName: 'Hari P',
    customerInitials: 'HP',
    customerAvatarColor: 'from-violet-600 to-purple-800',
    stationName: 'GAMMA',
    checkInTime: 'Nov 05, 03:10 PM',
    status: 'checked_in',
  },
  {
    id: 'CI-0997',
    serialNumber: 4,
    bookingId: 'BK-0997',
    customerName: 'Vikram R',
    customerInitials: 'VR',
    customerAvatarColor: 'from-purple-500 to-pink-600',
    stationName: 'BETA',
    checkInTime: 'Nov 05, 06:15 PM',
    status: 'checked_in',
  },
];

