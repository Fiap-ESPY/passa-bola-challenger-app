import { NEWS_DATA } from '@/data/newsData';
import { News } from '@/model/news';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import {
  BackButton,
  BackIcon,
  Container,
  Divider,
  HeaderContent,
  HeaderImage,
  Section,
  SectionSubtitle,
  SectionText,
  SectionTitle,
  SourceText,
} from './styles';

const NewsDetails = () => {
  const route = useRoute();
  const { newsId } = route.params as { newsId: number };

  const refId = useMemo(() => newsId, [newsId]);

  const newsItem: News | undefined = useMemo(
    () => NEWS_DATA.find(news => news.id === refId),
    [refId]
  );

  return (
    <Container>
      <HeaderImage
        source={newsItem?.image}
        resizeMode="cover"
        alt="Detail header image"
      >
        <HeaderContent>
          <BackButton onPress={() => router.back()}>
            <BackIcon name="arrow-left" />
          </BackButton>
        </HeaderContent>
      </HeaderImage>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
        <Section>
          <SectionTitle>{newsItem?.title.toLocaleUpperCase()}</SectionTitle>
          <SectionSubtitle>{newsItem?.description}</SectionSubtitle>
          <Divider />
          <SectionText>{newsItem?.content}</SectionText>

          <SourceText>Fonte: {newsItem?.source}</SourceText>
        </Section>
      </ScrollView>
    </Container>
  );
};

export default NewsDetails;
