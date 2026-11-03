import { useState, useEffect } from 'react';
import { Station, StationType } from '../types';
import { getStations } from '../services/stationService';

export function useStations() {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | StationType>('all');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getStations()
      .then((data) => {
        if (isMounted) {
          setStations(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err?.message || 'Failed to load gaming stations');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredStations = stations.filter((station) => {
    if (filter === 'all') return true;
    return station.type === filter;
  });

  return {
    stations,
    filteredStations,
    filter,
    setFilter,
    loading,
    error,
  };
}
