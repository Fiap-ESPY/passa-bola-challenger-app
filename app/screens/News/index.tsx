import headerImage from '@/assets/header-bg.jpg';
import logoImage from '@/assets/logo.png';
import passaBolaImage from '@/assets/news/passa_bola.png';
import NewsCard from '@/components/cards/news/NewsCard';
import SearchFilter from '@/components/filter/searchFilter/SearchFilter';
import { NEWS_DATA } from '@/data/newsData';
import { NewsCategoryType } from '@/model/enum/newsCategoryType';
import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { listenAuth } from '@/services/auth';
import { COLORS } from '@/theme/colors';
import { loadNews, saveNews } from '@/utils/news/newsStore';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, StatusBar } from 'react-native';
import {
  BackButton,
  BackIcon,
  FeaturedBadge,
  FeaturedBadgeText,
  FeaturedCard,
  FeaturedImage,
  FeaturedOverlay,
  FeaturedTitle,
  FloatingButton,
  HeaderCard,
  HeaderGrad,
  HeaderTitle,
  Logo,
  Screen,
  TabPill,
  Tabs,
  TabText,
} from './styles';

type NewsItem = (typeof NEWS_DATA)[number];

const News = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  const [news, setNews] = useState<NewsItem[]>(NEWS_DATA);
  const [hydrated, setHydrated] = useState(false);

  const [eventFilterType, setEventFilterType] = useState<
    NewsCategoryType | undefined
  >(undefined);
  const [filterSearch, setFilterSearch] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const unsubAuth = listenAuth(user => setIsAdmin(!!user));

      (async () => {
        const stored = await loadNews();
        if (active && stored && Array.isArray(stored)) {
          setNews(stored);
          setHydrated(true);
        }
      })();

      return () => {
        active = false;
        unsubAuth();
      };
    }, [])
  );

  useEffect(() => {
    (async () => {
      const stored = await loadNews();
      if (stored && Array.isArray(stored)) {
        setNews(stored);
      } else {
        await setNews(NEWS_DATA);
      }
      setHydrated(true);
    })();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    (async () => {
      await saveNews(news);
    })();
  }, [news, hydrated]);

  const handleDelete = useCallback((id: number | string) => {
    Alert.alert(
      'Remover notícia',
      'Tem certeza que deseja remover essa notícia?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => setNews(curr => curr.filter(e => e.id !== id)),
        },
      ]
    );
  }, []);

  const filteredData = useMemo(() => {
    const base = news.filter(item =>
      item.title.toLowerCase().includes(filterSearch.toLowerCase())
    );

    if (eventFilterType === NewsCategoryType.BRASILEIRAO_NEWS) {
      return base.filter(n => n.category === NewsCategoryType.BRASILEIRAO_NEWS);
    }
    if (eventFilterType === NewsCategoryType.PASSA_BOLA_NEWS) {
      return base.filter(n => n.category === NewsCategoryType.PASSA_BOLA_NEWS);
    }
    return base;
  }, [news, eventFilterType, filterSearch]);

  return (
    <Screen>
      <StatusBar barStyle="light-content" />
      <HeaderGrad
        source={headerImage}
        resizeMode="cover"
        alt="Gradient Background"
      >
        {isAdmin && (
          <BackButton onPress={() => router.back()}>
            <BackIcon name="arrow-left" />
          </BackButton>
        )}
        <Logo source={logoImage} resizeMode="contain" alt="Passa bola Logo" />
      </HeaderGrad>

      <HeaderCard>
        <HeaderTitle>NOTÍCIAS</HeaderTitle>

        <SearchFilter
          searchValue={filterSearch}
          onChangeText={setFilterSearch}
        />

        <Tabs>
          <TabPill
            onPress={() => setEventFilterType(undefined)}
            $active={!eventFilterType}
          >
            <TabText $active={!eventFilterType}>Todos</TabText>
          </TabPill>
          <TabPill
            onPress={() => setEventFilterType(NewsCategoryType.PASSA_BOLA_NEWS)}
            $active={eventFilterType === NewsCategoryType.PASSA_BOLA_NEWS}
          >
            <TabText
              $active={eventFilterType === NewsCategoryType.PASSA_BOLA_NEWS}
            >
              Passa Bola
            </TabText>
          </TabPill>
          <TabPill
            onPress={() =>
              setEventFilterType(NewsCategoryType.BRASILEIRAO_NEWS)
            }
            $active={eventFilterType === NewsCategoryType.BRASILEIRAO_NEWS}
          >
            <TabText
              $active={eventFilterType === NewsCategoryType.BRASILEIRAO_NEWS}
            >
              Brasileirão
            </TabText>
          </TabPill>
        </Tabs>
      </HeaderCard>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <FeaturedCard activeOpacity={0.8}>
          <FeaturedImage
            source={passaBolaImage}
            resizeMode="cover"
            alt="Passa bola image"
          >
            <FeaturedOverlay
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={['rgba(0,0,0,0.30)', 'rgba(0,0,0,0.2)']}
            />
            <FeaturedBadge>
              <FeaturedBadgeText>Fique atualizado!</FeaturedBadgeText>
            </FeaturedBadge>
            <FeaturedTitle numberOfLines={2}>
              NOVIDADES DO NOSSO INSTAGRAM AQUI
            </FeaturedTitle>
          </FeaturedImage>
        </FeaturedCard>

        {filteredData.map(newsItem => (
          <NewsCard
            key={newsItem.id}
            title={newsItem.title}
            description={newsItem.description}
            image={newsItem.image}
            date={newsItem.date}
            source={newsItem.source}
            pill={newsItem.pill}
            isAdmin={isAdmin}
            onClick={() =>
              navigation.navigate('NewsDetails', { newsId: newsItem.id })
            }
            onEdit={() =>
              navigation.navigate('AdminCreateNews', {
                newsId: newsItem.id,
              })
            }
            onDelete={() => handleDelete(newsItem.id)}
          />
        ))}
      </ScrollView>
      {isAdmin && (
        <FloatingButton
          activeOpacity={0.85}
          onPress={() =>
            navigation.navigate('AdminCreateNews', {
              newsId: null,
            })
          }
        >
          <FontAwesome name="plus" size={25} color={COLORS.white} />
        </FloatingButton>
      )}
    </Screen>
  );
};

export default News;
