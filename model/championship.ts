import { RoundType } from './enum/roundType';
import { Team } from './team';

export type Match = {
  id: string;
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
  image?: string | null;
  address: string;
  dateAndHour: string;
  isAvailable: boolean;
  isPublished: boolean;
  maxTeams?: number;
  registeredTeams?: number;
  matches?: Match[];
  tournamentWinner?: Team | null;
  description?: string;
  rules?: RuleSection[] | undefined;
}
