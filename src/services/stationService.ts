import { Station, StationType } from '../types';
import { MOCK_STATIONS } from '../mock-data/stations';

/**
 * Station service abstraction.
 * Currently backed by centralized mock records, designed to seamlessly swap
 * to Supabase client API calls in future stages.
 */
export async function getStations(): Promise<Station[]> {
  // Simulate network latency if desired, or return directly
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...MOCK_STATIONS]);
    }, 40);
  });
}

export async function getStationById(id: string): Promise<Station | null> {
  const station = MOCK_STATIONS.find((s) => s.id === id || s.name.toLowerCase() === id.toLowerCase());
  return station ? { ...station } : null;
}

export async function getStationsByType(type: StationType): Promise<Station[]> {
  const stations = MOCK_STATIONS.filter((s) => s.type === type);
  return [...stations];
}
