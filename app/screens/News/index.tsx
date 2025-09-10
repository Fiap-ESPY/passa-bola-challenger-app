import headerImage from '@/assets/header-bg.jpg';
import logoImage from '@/assets/logo.png';
import passaBolaImage from '@/assets/news/passa_bola.png';
import NewsCard from '@/components/cards/news/NewsCard';
import SearchFilter from '@/components/filter/searchFilter/SearchFilter';
import { NEWS_DATA } from '@/data/newsData';
import { NewsCategoryType } from '@/model/enum/newsCategoryType';
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

const News = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  const [eventFilterType, setEventFilterType] = useState<
    NewsCategoryType | undefined
  >(undefined);
  const [filterSearch, setFilterSearch] = useState<string>('');

  const filteredData = useMemo(() => {
    const filteredEvents = NEWS_DATA.filter(news =>
      news.title.toLowerCase().includes(filterSearch.toLowerCase())
    );

    if (eventFilterType === NewsCategoryType.BRASILEIRAO_NEWS) {
      return filteredEvents.filter(
        event => event.category === NewsCategoryType.BRASILEIRAO_NEWS
      );
    }

    if (eventFilterType === NewsCategoryType.PASSA_BOLA_NEWS) {
      return filteredEvents.filter(
        event => event.category === NewsCategoryType.PASSA_BOLA_NEWS
      );
    }

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
            date={"2025-05-10"}
            source={news.source}
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
