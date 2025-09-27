import headerImage from '@/assets/header-bg.jpg';
import logoImage from '@/assets/logo.png';
import ChampionshipCard from '@/components/cards/championship/ChampionshipCard';
import SearchFilter from '@/components/filter/searchFilter/SearchFilter';
import { CHAMPIONSHIP_DATA } from '@/data/championshipData';
import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { listenAuth } from '@/services/auth';
import { COLORS } from '@/theme/colors';
import { loadEvents, saveEvents } from '@/utils/events/eventsStore';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, ScrollView, StatusBar } from 'react-native';
import {
  BackButton,
  BackIcon,
  CardWrapper,
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

enum EventFilterType {
  ALL_EVENTS,
  NEXT_EVENTS,
  PAST_EVENTS,
}

const Home = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  const [events, setEvents] = useState(CHAMPIONSHIP_DATA);
  const [hydrated, setHydrated] = useState(false);

  const [eventFilterType, setEventFilterType] = useState<EventFilterType>(
    EventFilterType.ALL_EVENTS
  );
  const [filterSearch, setFilterSearch] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const unsubAuth = listenAuth(user => setIsAdmin(!!user));

      const stored = loadEvents();
      if (active && stored && Array.isArray(stored)) {
        setEvents(stored);
        setHydrated(true);
      }

      return () => {
        active = false;
        unsubAuth();
      };
    }, [])
  );

  useEffect(() => {
    const stored = loadEvents();
    if (stored && Array.isArray(stored)) {
      setEvents(stored);
    } else {
      saveEvents(CHAMPIONSHIP_DATA);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveEvents(events);
  }, [events, hydrated]);

  const handleDelete = useCallback((id: number | string) => {
    Alert.alert(
      'Remover evento',
      'Tem certeza que deseja remover este evento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => setEvents(curr => curr.filter(e => e.id !== id)),
        },
      ]
    );
  }, []);

  const filteredData = useMemo(() => {
    const base = events.filter(event =>
      event.title.toLowerCase().includes(filterSearch.toLowerCase())
    );
    if (eventFilterType === EventFilterType.NEXT_EVENTS)
      return base.filter(e => e.isAvailable);
    if (eventFilterType === EventFilterType.PAST_EVENTS)
      return base.filter(e => !e.isAvailable);
    return base;
  }, [events, eventFilterType, filterSearch]);

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
        {filteredData.map(championship => (
          <CardWrapper key={championship.id}>
            <ChampionshipCard
              championship={championship}
              onClick={() =>
                navigation.navigate('ChampionshipDetails', {
                  championshipId: championship.id,
                })
              }
              onDelete={() => handleDelete(championship.id)}
              onEdit={() => Alert.alert('Página em desenvolvimento...')}
              isAdmin={isAdmin}
            />
          </CardWrapper>
        ))}
      </ScrollView>
      {isAdmin && (
        <FloatingButton
          activeOpacity={0.85}
          onPress={() => navigation.navigate('AdminCreateEvent')}
        >
          <FontAwesome name="plus" size={25} color={COLORS.white} />
        </FloatingButton>
      )}
    </Screen>
  );
};

export default Home;
