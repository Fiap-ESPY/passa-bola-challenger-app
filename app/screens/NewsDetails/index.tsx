import { NewsDocument, newsService } from '@/services/news/newsService';
import { COLORS } from '@/theme/colors';
import { useRoute } from '@react-navigation/native';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { router } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text } from 'react-native';
import {
  BackButton,
  BackIcon,
  Container,
  DateText,
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
  const { newsId } = route.params as { newsId: string };

  const [newsItem, setNewsItem] = useState<NewsDocument | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!newsId) {
      router.back();
      return;
    }

    const fetchNews = async () => {
      setLoading(true);
      try {
        const fetchedNews = await newsService.getNewsByDocId(newsId);
        setNewsItem(fetchedNews);
      } catch (error) {
        console.error("Failed to fetch news details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [newsId]);

  const formattedDate = useMemo(() => {
    if (!newsItem?.date) {
      return '';
    }

    const dateObject = parse(newsItem.date, 'yyyy-MM-dd', new Date());

    return format(dateObject, "dd/MM/yyyy", {
      locale: ptBR, 
    });
  }, [newsItem?.date]); 


  if (loading) {
    return (
      <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.blue} />
      </Container>
    );
  }

  if (!newsItem) {
    return (
      <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notícia não encontrada.</Text>
      </Container>
    );
  }

  return (
    <Container>
      {newsItem?.image && <HeaderImage
        source={{ uri: newsItem.image as string }}
        resizeMode="cover"
        alt="Detail header image"
      >
        <HeaderContent>
          <BackButton onPress={() => router.back()}>
            <BackIcon name="arrow-left" />
          </BackButton>
        </HeaderContent>
      </HeaderImage>}

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
        <Section>
          <SectionTitle>{newsItem.title.toLocaleUpperCase()}</SectionTitle>
          <SectionSubtitle>{newsItem.description}</SectionSubtitle>
          <DateText>Data: {formattedDate}</DateText>
          <Divider />
          <SectionText>{newsItem.content}</SectionText>
          <SourceText>Fonte: {newsItem.source}</SourceText>
        </Section>
      </ScrollView>
    </Container>
  );
};

export default NewsDetails;