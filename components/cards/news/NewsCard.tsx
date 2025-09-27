import ActionButton from '@/components/buttons/actionbutton/ActionButton';
import { COLORS } from '@/theme/colors';
import { FontAwesome } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
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

type NewsCardProps = {
  title: string;
  description: string;
  pill: string;
  image: ImageSourcePropType;
  source: string;
  date: string;
  onClick: () => void;
  isAdmin?: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

const NewsCard = ({
  title,
  description,
  image,
  source,
  onClick,
  date,
  pill,
  isAdmin = false,
  onEdit,
  onDelete,
}: NewsCardProps) => {
  const formattedDate = format(parseISO(date), 'dd/MM/yyyy', {
    locale: ptBR,
  });

  return (
    <NewsItem activeOpacity={0.8} onPress={onClick}>
      <NewsThumb source={image} alt="News thumb image" />

      <NewsInfo>
        <NewsMetaRow>
          <NewsPill>{pill?.toLocaleUpperCase()}</NewsPill>
          <NewsMetaDivider />
        </NewsMetaRow>

        <NewsTitle numberOfLines={2}>{title?.toLocaleUpperCase()}</NewsTitle>

        <NewsExcerpt numberOfLines={2}>{description}</NewsExcerpt>
        <NewsDate>{formattedDate}</NewsDate>
        <NewsText>Fonte: {source}</NewsText>
        {isAdmin && (
          <>
            <ActionButton
              backgroundColor={COLORS.grayMedium}
              label="Editar notícia"
              onPress={onEdit}
              icon={<FontAwesome name="edit" size={18} color={COLORS.white} />}
            />
            <ActionButton
              backgroundColor={COLORS.red}
              label="Remover notícia"
              onPress={onDelete}
              icon={<FontAwesome name="trash" size={18} color={COLORS.white} />}
            />
          </>
        )}
      </NewsInfo>
    </NewsItem>
  );
};

export default NewsCard;
