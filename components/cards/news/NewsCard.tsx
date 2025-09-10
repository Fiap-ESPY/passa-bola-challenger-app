import { ImageSourcePropType } from 'react-native';
import {
  NewsDate,
  NewsExcerpt,
  NewsInfo,
  NewsItem,
  NewsMetaDivider,
  NewsMetaRow,
  NewsPill,
  NewsText,
  NewsThumb,
  NewsTitle,
} from './styles';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type NewsCardProps = {
  title: string;
  description: string;
  image: ImageSourcePropType;
  source: string;
  date: string;
  onClick: () => void;
};

const NewsCard = ({
  title,
  description,
  image,
  source,
  onClick,
  date,
}: NewsCardProps) => {
  const formattedDate = format(parseISO(date), 'dd/MM/yyyy', {
    locale: ptBR,
  });

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
        <NewsDate>{formattedDate}</NewsDate>
        <NewsText>Fonte: {source}</NewsText>
      </NewsInfo>
    </NewsItem>
  );
};

export default NewsCard;
