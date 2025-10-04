import headerImage from '@/assets/header-bg.jpg';
import logoImage from '@/assets/logo.png';
import passaBolaImage from '@/assets/news/passa_bola.png';
import NewsCard from '@/components/cards/news/NewsCard';
import SearchFilter from '@/components/filter/searchFilter/SearchFilter';
import { NewsCategoryType } from '@/model/enum/newsCategoryType';
import { UserRole } from '@/model/enum/userRole';
import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { NewsDocument, newsService } from '@/services/news/newsService';
import { COLORS } from '@/theme/colors';
import { UserSession } from '@/utils/session/session';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, RefreshControl, ScrollView, StatusBar } from 'react-native';
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
import { seedNewsToFirestore } from '@/services/seedData';

const News = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  const [news, setNews] = useState<NewsDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [eventFilterType, setEventFilterType] = useState<
    NewsCategoryType | undefined
  >(undefined);
  const [filterSearch, setFilterSearch] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const userSession = await UserSession.get();
          setIsAdmin(userSession?.role === UserRole.ADMIN);

          const newsList = await newsService.getAllNews();
          setNews(newsList);
        } catch (error) {
          console.error('Failed to fetch news:', error);
          Alert.alert('Erro', 'Não foi possível carregar as notícias.');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [])
  );

  const handleDelete = useCallback((docId: string) => {
    Alert.alert(
      'Remover Notícia',
      'Tem certeza que deseja remover esta notícia?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              await newsService.deleteNews(docId);
              setNews(curr => curr.filter(item => item.docId !== docId));
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível remover a notícia.');
            }
          },
        },
      ]
    );
  }, []);

  const filteredData = useMemo(() => {
    const base = news.filter(item =>
      item.title.toLowerCase().includes(filterSearch.toLowerCase())
    );

    if (eventFilterType) {
      return base.filter(n => n.category === eventFilterType);
    }
    return base.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );;
  }, [news, eventFilterType, filterSearch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    const fetchedNews = await newsService.getAllNews();
    setNews(fetchedNews);

    setRefreshing(false);
  }, []);

  return (
    <Screen>
      <StatusBar barStyle="light-content" />
      <HeaderGrad
        source={headerImage}
        resizeMode="cover"
        alt="Gradient Background"
      >
        {isAdmin && (
          <BackButton onPress={() => navigation.navigate('AdminHome')}>
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

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.blue} style={{ marginTop: 50 }} />
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.blue]}
              tintColor={COLORS.blue}
            />
          }
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
              key={newsItem.docId}
              newsItem={newsItem}
              isAdmin={isAdmin}
              onClick={() =>
                navigation.navigate('NewsDetails', { newsId: newsItem.docId })
              }
              onEdit={() =>
                navigation.navigate('AdminCreateNews', {
                  newsId: newsItem.docId,
                })
              }
              onDelete={() => handleDelete(newsItem.docId)}
            />
          ))}
        </ScrollView>
      )}

      {isAdmin && (
        <FloatingButton
          activeOpacity={0.85}
          onPress={() =>
            // navigation.navigate('AdminCreateNews', {
            //   newsId: null,
            // })
            seedNewsToFirestore()
          }
        >
          <FontAwesome name="plus" size={25} color={COLORS.white} />
        </FloatingButton>
      )}
    </Screen>
  );
};

export default News;