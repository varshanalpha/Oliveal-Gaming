import { ValueProposition } from '../types';

export const MOCK_VALUE_PROPOSITIONS: ValueProposition[] = [
  {
    id: 'feat-hardware',
    title: 'Premium Gaming Equipment',
    subtitle: 'Next-Gen Performance',
    description:
      'Uncapped 4K at 120Hz on low-latency Sony OLED displays, DualSense haptic feedback controllers, and dedicated high-fidelity spatial headsets for tournament-grade responsiveness.',
    iconName: 'zap',
    badge: 'Hardware Excellence',
    highlightStat: '120 FPS',
    highlightLabel: 'Ultra-low latency display',
  },
  {
    id: 'feat-simulators',
    title: 'Immersive Racing Experience',
    subtitle: 'Professional Sim Cockpits',
    description:
      'Direct-drive wheelbases producing true torque telemetry, load-cell hydraulic brake resistance, and 49" panoramic wrap-around curved screens bring track physics to life.',
    iconName: 'gauge',
    badge: 'Sim Cockpit',
    highlightStat: '8 Nm',
    highlightLabel: 'True direct-drive torque',
  },
  {
    id: 'feat-booking',
    title: 'Easy Online Slot Booking',
    subtitle: 'Zero Queues & Instant Holds',
    description:
      'Transparent 24/7 calendar availability with 5-minute atomic checkout holds, UPI/Card payments, and instant digital QR entry passes sent directly to your phone and email.',
    iconName: 'calendar-check',
    badge: 'Frictionless POS',
    highlightStat: '100% Guaranteed',
    highlightLabel: 'Atomic lock prevents double-booking',
  },
  {
    id: 'feat-environment',
    title: 'Comfortable Gaming Environment',
    subtitle: 'Lounge & Chill Amenities',
    description:
      'Climate-controlled chill zone with Secretlab ergonomic seating, high-speed fiber internet, RGB mood lighting, and curated refreshments so you stay in the zone.',
    iconName: 'armchair',
    badge: '24/7 Lounge',
    highlightStat: '24/7',
    highlightLabel: 'Round-the-clock access',
  },
];

