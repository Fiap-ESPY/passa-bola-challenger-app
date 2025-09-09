import headerImage from '@/assets/header-bg.jpg';
import { ImageSourcePropType } from 'react-native';
import {
  NewsExcerpt,
  NewsInfo,
  NewsItem,
  NewsMetaDivider,
  NewsMetaRow,
  NewsPill,
  NewsThumb,
  NewsTitle,
} from './styles';

type NewsCardProps = {
  title: string;
  description: string;
  image: ImageSourcePropType;
  onClick: () => void;
};

const NewsCard = ({ title, description, image, onClick }: NewsCardProps) => {
  return (
    <NewsItem activeOpacity={0.8} onPress={onClick}>
      <NewsThumb source={image} />

      <NewsInfo>
        <NewsMetaRow>
          <NewsPill>Novidades</NewsPill>
          <NewsMetaDivider />
        </NewsMetaRow>

        <NewsTitle numberOfLines={2}>{title.toUpperCase()}</NewsTitle>

        <NewsExcerpt numberOfLines={2}>{description}</NewsExcerpt>
      </NewsInfo>
    </NewsItem>
  );
};

export default NewsCard;
