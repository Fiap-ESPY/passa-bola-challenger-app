import { ImageSourcePropType } from 'react-native';
import { NewsCategoryType } from './enum/newsCategoryType';

export interface News {
  id: number;
  title: string;
  description: string;
  pill: string;
  category: NewsCategoryType;
  image: ImageSourcePropType;
  date: string;
  content: string;
  source: string;
}
