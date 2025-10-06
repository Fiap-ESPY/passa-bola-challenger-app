import { Player } from './player';

export type Team = {
  id: number;
  name: string;
  logo?: string | null;
  players?: Player[];
  scorers?: Player[];
};
