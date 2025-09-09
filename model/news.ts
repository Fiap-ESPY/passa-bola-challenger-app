import { ImageSourcePropType } from 'react-native';

export interface News {
  id: number;
  title: string;
  description: string;
  image: ImageSourcePropType;
  date: Date;
}
