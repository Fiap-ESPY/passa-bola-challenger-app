import headerImage from '@/assets/header-bg.jpg';
import logoImage from '@/assets/logo.png';
import MatchEventCard from '@/components/cards/matchevent/MatchEventCard';
import SearchFilter from '@/components/filter/searchFilter/SearchFilter';
import { MATCH_EVENTS_DATA } from '@/data/matchEventData';
import React, { useMemo, useState } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import {
  CardWrapper,
  HeaderCard,
  HeaderGrad,
  HeaderTitle,
  Logo,
  Screen,
  TabPill,
  Tabs,
  TabText,
} from './styles';
import { useNavigation } from 'expo-router';
import { RootStackNavigationProps } from '@/navigation/navigationTypes';

enum EventFilterType {
  ALL_EVENTS,
  NEXT_EVENTS,
  PAST_EVENTS,
}

const Home = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  const [eventFilterType, setEventFilterType] = useState<EventFilterType>(
    EventFilterType.ALL_EVENTS
  );
  const [filterSearch, setFilterSearch] = useState<string>('');

  const filteredData = useMemo(() => {
    const filteredEvents = MATCH_EVENTS_DATA.filter(event =>
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
            <MatchEventCard
              matchEvent={match}
              onClick={() =>
                navigation.navigate('MatchDetails', { matchId: match.id })
              }
            />
          </CardWrapper>
        ))}
      </ScrollView>
    </Screen>
  );
};

export default Home;
