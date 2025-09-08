import headerImage from '@/assets/header-bg.jpg';
import logoImage from '@/assets/logo.png';
import { MATCH_EVENTS } from '@/data/matchEvents';
import { COLORS } from '@/theme/colors';
import React, { useMemo, useState } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import {
  FeaturedAvatar,
  FeaturedAvatarText,
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
  NewsExcerpt,
  NewsInfo,
  NewsItem,
  NewsMetaDivider,
  NewsMetaRow,
  NewsPill,
  NewsThumb,
  NewsTitle,
  Screen,
  SearchBar,
  SearchIcon,
  SearchInput,
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
  const [eventFilterType, setEventFilterType] = useState<EventFilterType>(
    EventFilterType.ALL_EVENTS
  );
  const [filterSearch, setFilterSearch] = useState<string>('');

  const filteredData = useMemo(() => {
    const filteredEvents = MATCH_EVENTS.filter(event =>
      event.title.toLowerCase().includes(filterSearch.toLowerCase())
    );

    if (eventFilterType === EventFilterType.NEXT_EVENTS) {
      return filteredEvents.filter(event => event.isAvailable);
    }

    if (eventFilterType === EventFilterType.PAST_EVENTS) {
      return filteredEvents.filter(event => !event.isAvailable);
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
        <HeaderTitle>JOGOS</HeaderTitle>

        <SearchBar>
          <SearchIcon name="search" size={18} />
          <SearchInput
            placeholder="Pesquisar"
            placeholderTextColor={COLORS.grayMedium}
            value={filterSearch}
            onChangeText={setFilterSearch}
            returnKeyType="search"
          />
        </SearchBar>

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
              Próximos
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
        {/* CARD DESTAQUE */}
        {filteredData.length > 0 && (
          <FeaturedCard activeOpacity={0.8}>
            <FeaturedImage source={headerImage} resizeMode="cover">
              <FeaturedOverlay
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.55)']}
              />
              <FeaturedBadge>
                <FeaturedBadgeText>Novidades</FeaturedBadgeText>
              </FeaturedBadge>

              <FeaturedAvatar>
                <FeaturedAvatarText>B</FeaturedAvatarText>
              </FeaturedAvatar>

              <FeaturedTitle numberOfLines={2}>
                {filteredData[0].title.toUpperCase()}
              </FeaturedTitle>
            </FeaturedImage>
          </FeaturedCard>
        )}

        {filteredData.slice(1).map(item => (
          <NewsItem key={item.id} activeOpacity={0.8}>
            <NewsThumb source={headerImage} />

            <NewsInfo>
              <NewsMetaRow>
                <NewsPill>Novidades</NewsPill>
                <NewsMetaDivider />
              </NewsMetaRow>

              <NewsTitle numberOfLines={2}>
                {item.title.toUpperCase()}
              </NewsTitle>

              <NewsExcerpt numberOfLines={2}>
                Oito jogos da 15ª rodada aconteceram simultaneamente nesta
                quarta-feira (...)
              </NewsExcerpt>
            </NewsInfo>
          </NewsItem>
        ))}
      </ScrollView>
    </Screen>
  );
};

export default News;
