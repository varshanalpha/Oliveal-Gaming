import { useState, useEffect } from 'react';
import { GameTitle } from '../types';
import { getFeaturedGames } from '../services/gameService';

export function useGames() {
  const [games, setGames] = useState<GameTitle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    getFeaturedGames().then((data) => {
      if (isMounted) {
        setGames(data);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { games, loading };
}
