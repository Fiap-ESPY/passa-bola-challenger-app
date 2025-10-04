import { Match } from '@/model/championship';
import { Player } from '@/model/player';
import { ImageSourcePropType } from 'react-native';

export interface ArtilheiraStats {
  id: number;
  name: string;
  teamName: string;
  teamLogo?: string | null;
  photo?: string | null;
  totalGoals: number;
}

const processScorers = (
  playerStats: Map<number, ArtilheiraStats>,
  scorers: Player[],
  teamName: string,
  teamLogo?: string | null
) => {
  if (!scorers) return;

  scorers.forEach(scorer => {
    if (playerStats.has(scorer.id)) {
      const existingPlayer = playerStats.get(scorer.id)!;
      existingPlayer.totalGoals += scorer?.goals ?? 0;
    } else {
      playerStats.set(scorer.id, {
        id: scorer.id,
        name: scorer.name ?? 'Desconhecido',
        teamName: teamName,
        photo: scorer.photo ?? require('@/assets/players/default_player.jpg'),
        totalGoals: scorer.goals ?? 0,
        teamLogo: teamLogo,
      });
    }
  });
};

export const calculateTopScorers = (matches: Match[]): ArtilheiraStats[] => {
  const playerStats = new Map<number, ArtilheiraStats>();

  matches.forEach(match => {
    processScorers(
      playerStats,
      match?.home?.scorers ?? [],
      match.home.name,
      match?.home?.logo
    );
    processScorers(
      playerStats,
      match?.away?.scorers ?? [],
      match.away.name,
      match?.away?.logo
    );
  });

  const artilhariaList = Array.from(playerStats.values());

  artilhariaList.sort((a, b) => b.totalGoals - a.totalGoals);

  return artilhariaList;
};
