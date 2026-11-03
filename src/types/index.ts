export * from './auth';
export * from './customer';

export type StationType = 'ps5' | 'simulator';

export interface Station {
  id: string;
  name: 'ALPHA' | 'BETA' | 'GAMMA' | 'DELTA' | 'RS1' | 'RS2';
  type: StationType;
  displayName: string;
  tagline: string;
  description: string;
  maxPlayers: number;
  hourlyRate1p: number;
  hourlyRate2p: number | null;
  specs: string[];
  popularGames: string[];
  imageUrl: string;
  badge: string;
  isActive: boolean;
}

export interface GameTitle {
  id: string;
  title: string;
  category: 'sports' | 'action' | 'racing' | 'fighting' | 'adventure';
  coverUrl: string;
  badge?: string;
  isFeatured?: boolean;
}

export interface ValueProposition {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: 'zap' | 'gauge' | 'calendar-check' | 'armchair' | 'trophy' | 'shield-check';
  badge: string;
  highlightStat: string;
  highlightLabel: string;
}

export interface BookingStep {
  step: number;
  title: string;
  tagline: string;
  description: string;
  badgeText: string;
  highlight: string;
}

export interface PricingRule {
  stationType: StationType;
  label: string;
  playerCount: number;
  rates: {
    duration60: number;
    duration90: number;
    duration120: number;
  };
}
