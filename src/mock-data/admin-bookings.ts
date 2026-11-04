import { AdminBooking } from '../types/adminBooking';

// The primary reference records (Exactly matching reference image rows 1 to 8)
const PRIMARY_REFERENCE_BOOKINGS: AdminBooking[] = [
  {
    id: 'BK-1001',
    bookingCode: 'OLV-261105-ALPHA',
    customer: {
      fullName: 'R Varshan',
      initials: 'RV',
      email: 'varshan@gmail.com',
      phone: '+91 98765 43210',
      avatarColor: 'from-purple-700 to-indigo-600',
    },
    stationName: 'ALPHA',
    stationCategory: 'ps5',
    stationCategoryLabel: 'PS5',
    bookingDate: 'Nov 05, 2026',
    dateIso: '2026-11-05',
    startTime: '06:00 PM',
    endTime: '07:00 PM',
    timeSlotFormatted: '06:00 PM – 07:00 PM',
    durationMinutes: 60,
    durationFormatted: '60 mins',
    playerCount: 1,
    amount: 150,
    status: 'ongoing',
    bookingType: 'online',
    paymentGateway: 'Razorpay',
    paymentStatus: 'Paid & Confirmed',
    transactionId: 'pay_OZ812948X8',
    createdAt: 'Nov 05, 2026, 05:45 PM IST',
  },
  {
    id: 'BK-1000',
    bookingCode: 'OLV-261105-BETA',
    customer: {
      fullName: 'Aakash S',
      initials: 'AS',
      email: 'aakash.s@gmail.com',
      phone: '+91 98451 22334',
      avatarColor: 'from-purple-700 to-indigo-600',
    },
    stationName: 'BETA',
    stationCategory: 'ps5',
    stationCategoryLabel: 'PS5',
    bookingDate: 'Nov 05, 2026',
    dateIso: '2026-11-05',
    startTime: '07:30 PM',
    endTime: '09:30 PM',
    timeSlotFormatted: '07:30 PM – 09:30 PM',
    durationMinutes: 120,
    durationFormatted: '120 mins',
    playerCount: 2,
    amount: 300,
    status: 'upcoming',
    bookingType: 'online',
    paymentGateway: 'Razorpay',
    paymentStatus: 'Paid & Confirmed',
    transactionId: 'pay_OZ793821K2',
    createdAt: 'Nov 05, 2026, 04:15 PM IST',
  },
  {
    id: 'BK-0999',
    bookingCode: 'OLV-261105-RS1',
    customer: {
      fullName: 'Karthik P',
      initials: 'KP',
      email: 'karthik.p@gmail.com',
      phone: '+91 97123 45678',
      avatarColor: 'from-purple-700 to-indigo-600',
    },
    stationName: 'RS1',
    stationCategory: 'simulator',
    stationCategoryLabel: 'Racing',
    bookingDate: 'Nov 05, 2026',
    dateIso: '2026-11-05',
    startTime: '08:00 PM',
    endTime: '09:00 PM',
    timeSlotFormatted: '08:00 PM – 09:00 PM',
    durationMinutes: 60,
    durationFormatted: '60 mins',
    playerCount: 1,
    amount: 200,
    status: 'upcoming',
    bookingType: 'online',
    paymentGateway: 'Razorpay',
    paymentStatus: 'Paid & Confirmed',
    transactionId: 'pay_OZ661029M1',
    createdAt: 'Nov 05, 2026, 03:30 PM IST',
  },
  {
    id: 'BK-0998',
    bookingCode: 'OLV-261105-DELTA',
    customer: {
      fullName: 'Dharun H',
      initials: 'DH',
      email: 'dharun.h@gmail.com',
      phone: '+91 96543 21876',
      avatarColor: 'from-purple-700 to-indigo-600',
    },
    stationName: 'DELTA',
    stationCategory: 'ps5',
    stationCategoryLabel: 'PS5',
    bookingDate: 'Nov 05, 2026',
    dateIso: '2026-11-05',
    startTime: '09:00 PM',
    endTime: '11:00 PM',
    timeSlotFormatted: '09:00 PM – 11:00 PM',
    durationMinutes: 120,
    durationFormatted: '120 mins',
    playerCount: 2,
    amount: 300,
    status: 'upcoming',
    bookingType: 'online',
    paymentGateway: 'Razorpay',
    paymentStatus: 'Paid & Confirmed',
    transactionId: 'pay_OZ554910N4',
    createdAt: 'Nov 05, 2026, 02:40 PM IST',
  },
  {
    id: 'BK-0997',
    bookingCode: 'OLV-261104-GAMMA',
    customer: {
      fullName: 'Sanjay G',
      initials: 'SG',
      email: 'sanjay.g@gmail.com',
      phone: '+91 95432 10987',
      avatarColor: 'from-purple-700 to-indigo-600',
    },
    stationName: 'GAMMA',
    stationCategory: 'ps5',
    stationCategoryLabel: 'PS5',
    bookingDate: 'Nov 04, 2026',
    dateIso: '2026-11-04',
    startTime: '05:00 PM',
    endTime: '07:00 PM',
    timeSlotFormatted: '05:00 PM – 07:00 PM',
    durationMinutes: 120,
    durationFormatted: '120 mins',
    playerCount: 2,
    amount: 300,
    status: 'completed',
    bookingType: 'online',
    paymentGateway: 'Razorpay',
    paymentStatus: 'Paid & Confirmed',
    transactionId: 'pay_OY991204P9',
    createdAt: 'Nov 04, 2026, 03:00 PM IST',
  },
  {
    id: 'BK-0996',
    bookingCode: 'OLV-261104-RS2',
    customer: {
      fullName: 'Nithin M',
      initials: 'NM',
      email: 'nithin.m@gmail.com',
      phone: '+91 94321 09876',
      avatarColor: 'from-purple-700 to-indigo-600',
    },
    stationName: 'RS2',
    stationCategory: 'simulator',
    stationCategoryLabel: 'Racing',
    bookingDate: 'Nov 04, 2026',
    dateIso: '2026-11-04',
    startTime: '03:00 PM',
    endTime: '04:00 PM',
    timeSlotFormatted: '03:00 PM – 04:00 PM',
    durationMinutes: 60,
    durationFormatted: '60 mins',
    playerCount: 1,
    amount: 200,
    status: 'completed',
    bookingType: 'online',
    paymentGateway: 'Razorpay',
    paymentStatus: 'Paid & Confirmed',
    transactionId: 'pay_OY882741Q7',
    createdAt: 'Nov 04, 2026, 01:20 PM IST',
  },
  {
    id: 'BK-0995',
    bookingCode: 'OLV-261104-ALPHA',
    customer: {
      fullName: 'Vignesh K',
      initials: 'VK',
      email: 'vignesh.k@gmail.com',
      phone: '+91 93210 98765',
      avatarColor: 'from-purple-700 to-indigo-600',
    },
    stationName: 'ALPHA',
    stationCategory: 'ps5',
    stationCategoryLabel: 'PS5',
    bookingDate: 'Nov 04, 2026',
    dateIso: '2026-11-04',
    startTime: '01:00 PM',
    endTime: '02:00 PM',
    timeSlotFormatted: '01:00 PM – 02:00 PM',
    durationMinutes: 60,
    durationFormatted: '60 mins',
    playerCount: 1,
    amount: 150,
    status: 'completed',
    bookingType: 'online',
    paymentGateway: 'Razorpay',
    paymentStatus: 'Paid & Confirmed',
    transactionId: 'pay_OY773650R5',
    createdAt: 'Nov 04, 2026, 11:30 AM IST',
  },
  {
    id: 'BK-0994',
    bookingCode: 'OLV-261104-BETA',
    customer: {
      fullName: 'Praveen R',
      initials: 'PR',
      email: 'praveen.r@gmail.com',
      phone: '+91 92109 87654',
      avatarColor: 'from-purple-700 to-indigo-600',
    },
    stationName: 'BETA',
    stationCategory: 'ps5',
    stationCategoryLabel: 'PS5',
    bookingDate: 'Nov 04, 2026',
    dateIso: '2026-11-04',
    startTime: '11:00 AM',
    endTime: '01:00 PM',
    timeSlotFormatted: '11:00 AM – 01:00 PM',
    durationMinutes: 120,
    durationFormatted: '120 mins',
    playerCount: 2,
    amount: 300,
    status: 'completed',
    bookingType: 'online',
    paymentGateway: 'Razorpay',
    paymentStatus: 'Paid & Confirmed',
    transactionId: 'pay_OY664539S3',
    createdAt: 'Nov 04, 2026, 09:15 AM IST',
  },
];

// Seed additional realistic historical and upcoming bookings to achieve exactly 128 bookings
// 128 Total = 102 Completed + 16 Upcoming + 10 Ongoing
const NAMES_POOL = [
  { name: 'Arjun Menon', initials: 'AM', email: 'arjun.menon@gmail.com', phone: '+91 98231 44556' },
  { name: 'Siddharth Rao', initials: 'SR', email: 'sid.rao@gmail.com', phone: '+91 97342 55667' },
  { name: 'Rahul Krishnan', initials: 'RK', email: 'rahul.k@gmail.com', phone: '+91 96453 66778' },
  { name: 'Deepak Sharma', initials: 'DS', email: 'deepak.s@gmail.com', phone: '+91 95564 77889' },
  { name: 'Aditya Varma', initials: 'AV', email: 'aditya.v@gmail.com', phone: '+91 94675 88990' },
  { name: 'Rohit Balaji', initials: 'RB', email: 'rohit.b@gmail.com', phone: '+91 93786 99001' },
  { name: 'Manish Kumar', initials: 'MK', email: 'manish.k@gmail.com', phone: '+91 92897 10112' },
  { name: 'Gautam Ramesh', initials: 'GR', email: 'gautam.r@gmail.com', phone: '+91 91908 21223' },
  { name: 'Harish Sundaram', initials: 'HS', email: 'harish.s@gmail.com', phone: '+91 90019 32334' },
  { name: 'Kishore Venkat', initials: 'KV', email: 'kishore.v@gmail.com', phone: '+91 89120 43445' },
  { name: 'Abhishek Nair', initials: 'AN', email: 'abhi.nair@gmail.com', phone: '+91 88231 54556' },
  { name: 'Suresh Babu', initials: 'SB', email: 'suresh.b@gmail.com', phone: '+91 87342 65667' },
  { name: 'Vijay Anand', initials: 'VA', email: 'vijay.anand@gmail.com', phone: '+91 86453 76778' },
  { name: 'Dinesh Karthik', initials: 'DK', email: 'dinesh.k@gmail.com', phone: '+91 85564 87889' },
  { name: 'Manoj Prabhakar', initials: 'MP', email: 'manoj.p@gmail.com', phone: '+91 84675 98990' },
  { name: 'Rohan Sethi', initials: 'RS', email: 'rohan.sethi@gmail.com', phone: '+91 83786 09101' },
  { name: 'Tarun Joshi', initials: 'TJ', email: 'tarun.joshi@gmail.com', phone: '+91 82897 11212' },
  { name: 'Kunal Kapoor', initials: 'KK', email: 'kunal.kapoor@gmail.com', phone: '+91 81908 22323' },
  { name: 'Ashwin Raman', initials: 'AR', email: 'ashwin.raman@gmail.com', phone: '+91 80019 33434' },
  { name: 'Pranav Murthy', initials: 'PM', email: 'pranav.m@gmail.com', phone: '+91 79120 44545' },
];

const STATIONS_POOL: Array<{ name: 'ALPHA' | 'BETA' | 'GAMMA' | 'DELTA' | 'RS1' | 'RS2'; cat: 'ps5' | 'simulator'; label: 'PS5' | 'Racing' }> = [
  { name: 'ALPHA', cat: 'ps5', label: 'PS5' },
  { name: 'BETA', cat: 'ps5', label: 'PS5' },
  { name: 'GAMMA', cat: 'ps5', label: 'PS5' },
  { name: 'DELTA', cat: 'ps5', label: 'PS5' },
  { name: 'RS1', cat: 'simulator', label: 'Racing' },
  { name: 'RS2', cat: 'simulator', label: 'Racing' },
];

const TIME_SLOTS_POOL = [
  { start: '10:00 AM', end: '11:00 AM', dur: 60 as const, durFmt: '60 mins' },
  { start: '11:30 AM', end: '01:00 PM', dur: 90 as const, durFmt: '90 mins' },
  { start: '01:30 PM', end: '03:30 PM', dur: 120 as const, durFmt: '120 mins' },
  { start: '04:00 PM', end: '05:00 PM', dur: 60 as const, durFmt: '60 mins' },
  { start: '05:30 PM', end: '07:00 PM', dur: 90 as const, durFmt: '90 mins' },
  { start: '07:30 PM', end: '09:30 PM', dur: 120 as const, durFmt: '120 mins' },
  { start: '10:00 PM', end: '11:00 PM', dur: 60 as const, durFmt: '60 mins' },
  { start: '11:30 PM', end: '01:30 AM', dur: 120 as const, durFmt: '120 mins' },
];

function generateRemainingBookings(): AdminBooking[] {
  const result: AdminBooking[] = [];
  let currentIdNum = 993; // counting downwards from BK-0993

  // We need remaining:
  // 9 Ongoing (total 10: 1 in primary + 9 here)
  // 13 Upcoming (total 16: 3 in primary + 13 here)
  // 98 Completed (total 102: 4 in primary + 98 here)
  // Total = 120 records

  const statusesToGenerate: Array<'ongoing' | 'upcoming' | 'completed'> = [
    ...Array(9).fill('ongoing'),
    ...Array(13).fill('upcoming'),
    ...Array(98).fill('completed'),
  ];

  statusesToGenerate.forEach((status, idx) => {
    const id = `BK-${String(currentIdNum).padStart(4, '0')}`;
    currentIdNum--;

    const person = NAMES_POOL[idx % NAMES_POOL.length];
    const station = STATIONS_POOL[(idx * 3) % STATIONS_POOL.length];
    const timeSlot = TIME_SLOTS_POOL[(idx * 5) % TIME_SLOTS_POOL.length];

    // Determine date relative to Nov 05, 2026
    let bookingDate = 'Nov 05, 2026';
    let dateIso = '2026-11-05';
    let createdAt = 'Nov 05, 2026, 02:00 PM IST';

    if (status === 'upcoming') {
      // Today later or tomorrow
      if (idx % 2 === 0) {
        bookingDate = 'Nov 05, 2026';
        dateIso = '2026-11-05';
        createdAt = 'Nov 05, 2026, 11:30 AM IST';
      } else {
        bookingDate = 'Nov 06, 2026';
        dateIso = '2026-11-06';
        createdAt = 'Nov 05, 2026, 01:45 PM IST';
      }
    } else if (status === 'ongoing') {
      bookingDate = 'Nov 05, 2026';
      dateIso = '2026-11-05';
      createdAt = 'Nov 05, 2026, 05:30 PM IST';
    } else {
      // Completed in the past (between Oct 30 and Nov 04, within last 7 days)
      const daysAgo = (idx % 6) + 1; // 1 to 6 days ago
      const dayNum = 5 - daysAgo;
      let month = 'Nov';
      let dayDisplay = dayNum;

      if (dayNum <= 0) {
        month = 'Oct';
        dayDisplay = 31 + dayNum;
      }

      bookingDate = `${month} ${String(dayDisplay).padStart(2, '0')}, 2026`;
      const monthNum = month === 'Nov' ? '11' : '10';
      dateIso = `2026-${monthNum}-${String(dayDisplay).padStart(2, '0')}`;
      createdAt = `${bookingDate}, 10:00 AM IST`;
    }

    // Pricing
    const isPs5 = station.cat === 'ps5';
    const playerCount: 1 | 2 = (idx % 2 === 0 && isPs5) ? 2 : 1;
    let amount = 150;

    if (isPs5) {
      if (playerCount === 1) {
        amount = timeSlot.dur === 60 ? 150 : timeSlot.dur === 90 ? 225 : 300;
      } else {
        amount = timeSlot.dur === 60 ? 200 : timeSlot.dur === 90 ? 300 : 400;
      }
    } else {
      amount = timeSlot.dur === 60 ? 200 : timeSlot.dur === 90 ? 300 : 400;
    }

    result.push({
      id,
      bookingCode: `OLV-${dateIso.replace(/-/g, '').slice(2)}-${station.name}`,
      customer: {
        fullName: person.name,
        initials: person.initials,
        email: person.email,
        phone: person.phone,
        avatarColor: 'from-purple-700 to-indigo-600',
      },
      stationName: station.name,
      stationCategory: station.cat,
      stationCategoryLabel: station.label,
      bookingDate,
      dateIso,
      startTime: timeSlot.start,
      endTime: timeSlot.end,
      timeSlotFormatted: `${timeSlot.start} – ${timeSlot.end}`,
      durationMinutes: timeSlot.dur,
      durationFormatted: timeSlot.durFmt,
      playerCount,
      amount,
      status,
      bookingType: 'online',
      paymentGateway: 'Razorpay',
      paymentStatus: 'Paid & Confirmed',
      transactionId: `pay_H${String(idx + 1000).padStart(7, '0')}`,
      createdAt,
    });
  });

  return result;
}

// Complete 128 bookings list
export const MOCK_ADMIN_BOOKINGS: AdminBooking[] = [
  ...PRIMARY_REFERENCE_BOOKINGS,
  ...generateRemainingBookings(),
];
