import { ImageSourcePropType } from 'react-native';
import { Player } from './player';

export type Team = {
  id: number;
  name: string;
  logo?: ImageSourcePropType;
  scorers?: Player[];
};
