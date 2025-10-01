import { ImageSourcePropType } from 'react-native';
import { RoundType } from './enum/roundType';
import { Team } from './team';

export type Match = {
  id: number;
  round: RoundType;
  label: string;
  home: Team & { score?: number };
  away: Team & { score?: number };
};

export interface RuleSection {
  title: string;
  items: string[];
}

export interface Championship {
  id: number;
  title: string;
  type: 'racha' | 'campeonato';
  image?: ImageSourcePropType | null;
  address: string;
  dateAndHour: string;
  isAvailable: boolean;
  brackEvents?: Match[];
  tournamentWinner?: Team | null;
  description?: string;
  rules?: RuleSection[];
}
