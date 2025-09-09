import headerImage from '@/assets/header-bg.jpg';
import logoImage from '@/assets/logo.png';
import passaBolaImage from '@/assets/news/passa_bola.png';
import NewsCard from '@/components/cards/news/NewsCard';
import SearchFilter from '@/components/filter/searchFilter/SearchFilter';
import { NEWS_DATA } from '@/data/newsData';
import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { useNavigation } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import {
  FeaturedBadge,
  FeaturedBadgeText,
  FeaturedCard,
  FeaturedImage,
  FeaturedOverlay,
  FeaturedTitle,
  HeaderCard,
  HeaderGrad,
  HeaderTitle,
  Logo,
  Screen,
  TabPill,
  Tabs,
  TabText,
} from './styles';

enum EventFilterType {
  ALL_EVENTS,
  NEXT_EVENTS,
  PAST_EVENTS,
}

const News = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  const [eventFilterType, setEventFilterType] = useState<EventFilterType>(
    EventFilterType.ALL_EVENTS
  );
  const [filterSearch, setFilterSearch] = useState<string>('');

  const filteredData = useMemo(() => {
    const filteredEvents = NEWS_DATA.filter(news =>
      news.title.toLowerCase().includes(filterSearch.toLowerCase())
    );

    return filteredEvents;
  }, [eventFilterType, filterSearch]);

  return (
    <Screen>
      <StatusBar barStyle="light-content" />
      <HeaderGrad source={headerImage} resizeMode="cover">
        <Logo source={logoImage} resizeMode="contain" />
      </HeaderGrad>

      <HeaderCard>
        <HeaderTitle>NOTÍCIAS</HeaderTitle>

        <SearchFilter
          searchValue={filterSearch}
          onChangeText={setFilterSearch}
        />

        <Tabs>
          <TabPill
            onPress={() => setEventFilterType(EventFilterType.ALL_EVENTS)}
            $active={eventFilterType === EventFilterType.ALL_EVENTS}
          >
            <TabText $active={eventFilterType === EventFilterType.ALL_EVENTS}>
              Todos
            </TabText>
          </TabPill>
          <TabPill
            onPress={() => setEventFilterType(EventFilterType.NEXT_EVENTS)}
            $active={eventFilterType === EventFilterType.NEXT_EVENTS}
          >
            <TabText $active={eventFilterType === EventFilterType.NEXT_EVENTS}>
              Novidades
            </TabText>
          </TabPill>
          <TabPill
            onPress={() => setEventFilterType(EventFilterType.PAST_EVENTS)}
            $active={eventFilterType === EventFilterType.PAST_EVENTS}
          >
            <TabText $active={eventFilterType === EventFilterType.PAST_EVENTS}>
              Anteriores
            </TabText>
          </TabPill>
        </Tabs>
      </HeaderCard>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <FeaturedCard activeOpacity={0.8}>
          <FeaturedImage source={passaBolaImage} resizeMode="cover">
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

        {filteredData.map(news => (
          <NewsCard
            key={news.id}
            title={news.title}
            description={news.description}
            image={news.image}
            onClick={() =>
              navigation.navigate('NewsDetails', { newsId: news.id })
            }
          />
        ))}
      </ScrollView>
    </Screen>
  );
};

export default News;
