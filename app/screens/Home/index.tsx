import headerImage from '@/assets/header-bg.jpg';
import logoImage from '@/assets/logo.png';
import MatchEventCard from '@/components/cards/matchevent/MatchEventCard';
import { MATCH_EVENTS } from '@/data/matchEvents';
import { COLORS } from '@/theme/colors';
import React, { useMemo, useState } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import {
  CardWrapper,
  HeaderCard,
  HeaderGrad,
  HeaderTitle,
  Logo,
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

const Home = () => {
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
      >
        {filteredData.map(match => (
          <CardWrapper key={match.id}>
            <MatchEventCard matchEvent={match} onClick={() => {}} />
          </CardWrapper>
        ))}
      </ScrollView>
    </Screen>
  );
};

export default Home;
