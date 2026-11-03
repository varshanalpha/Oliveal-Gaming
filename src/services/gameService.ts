import { GameTitle } from '../types';
import { MOCK_FEATURED_GAMES } from '../mock-data/games';

export async function getFeaturedGames(): Promise<GameTitle[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...MOCK_FEATURED_GAMES]);
    }, 40);
  });
}

