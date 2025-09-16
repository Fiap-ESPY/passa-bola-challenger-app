import { ImageSourcePropType } from 'react-native';
import { RoundType } from './enum/roundType';
import { Team } from './team';

export type Match = {
  id: string;
  round: RoundType;
  label: string;
  home: Team & { score?: number };
  away: Team & { score?: number };
};

export interface MatchEvent {
  id: number;
  title: string;
  type: string;
  image?: ImageSourcePropType;
  address: string;
  dateAndHour: string;
  isAvailable: boolean;
  brackEvents?: Match[];
  tournamentWinner?: Team | null;
}
