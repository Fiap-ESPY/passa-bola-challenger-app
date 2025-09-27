import { Match } from '@/model/championship';
import { Player } from '@/model/player';
import { ImageSourcePropType } from 'react-native';

export interface ArtilheiraStats {
  id: number;
  name: string;
  teamName: string;
  teamLogo?: ImageSourcePropType;
  photo?: ImageSourcePropType;
  totalGoals: number;
}

const processScorers = (
  playerStats: Map<number, ArtilheiraStats>,
  scorers: Player[],
  teamName: string,
  teamLogo?: ImageSourcePropType
) => {
  if (!scorers) return;

  scorers.forEach(scorer => {
    if (playerStats.has(scorer.id)) {
      const existingPlayer = playerStats.get(scorer.id)!;
      existingPlayer.totalGoals += scorer.goals;
    } else {
      playerStats.set(scorer.id, {
        id: scorer.id,
        name: scorer.name,
        teamName: teamName,
        photo: scorer.photo,
        totalGoals: scorer.goals,
        teamLogo: teamLogo,
      });
    }
  });
};

export const calculateTopScorers = (matches: Match[]): ArtilheiraStats[] => {
  const playerStats = new Map<number, ArtilheiraStats>();

  matches.forEach(match => {
    console.log(match);

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
