import ActionButton from '@/components/buttons/actionbutton/ActionButton';
import { NewsDocument } from '@/services/news/newsService';
import { COLORS } from '@/theme/colors';
import { FontAwesome } from '@expo/vector-icons';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useMemo } from 'react';
import {
  ActionsContainer,
  NewsDate,
  NewsExcerpt,
  NewsFooter,
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
  newsItem: NewsDocument;
  onClick: () => void;
  isAdmin?: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

const NewsCard = ({
  newsItem,
  onClick,
  isAdmin = false,
  onEdit,
  onDelete,
}: NewsCardProps) => {

  const formattedDate = useMemo(() => {
    if (!newsItem.date) {
      return '';
    }

    const dateObject = parse(newsItem.date, 'yyyy-MM-dd', new Date());

    return format(dateObject, "dd/MM/yyyy", {
      locale: ptBR,
    });
  }, [newsItem.date]);

  return (
    <NewsItem activeOpacity={0.8} onPress={onClick}>
      {newsItem.image && <NewsThumb source={{ uri: newsItem.image }} alt="News thumb image" />}

      <NewsInfo>
        <NewsMetaRow>
          <NewsPill>{newsItem.pill?.toLocaleUpperCase()}</NewsPill>
          <NewsMetaDivider />
        </NewsMetaRow>

        <NewsTitle numberOfLines={2}>{newsItem.title?.toLocaleUpperCase()}</NewsTitle>

        <NewsExcerpt numberOfLines={2}>{newsItem.description}</NewsExcerpt>
        <NewsFooter>
          <NewsDate>{formattedDate}</NewsDate>
          <NewsText>{newsItem.source}</NewsText>
        </NewsFooter>

        {isAdmin && (
          <>
            <ActionsContainer>
              <ActionButton
                backgroundColor={COLORS.grayMedium}
                label="Editar"
                onPress={onEdit}
                icon={<FontAwesome name="edit" size={18} color={COLORS.white} />}
              />
              <ActionButton
                backgroundColor={COLORS.red}
                label="Remover"
                onPress={onDelete}
                icon={<FontAwesome name="trash" size={18} color={COLORS.white} />}
              />
            </ActionsContainer>
          </>
        )}
      </NewsInfo>
    </NewsItem>
  );
};

export default NewsCard;
