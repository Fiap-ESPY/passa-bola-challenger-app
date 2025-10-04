import headerImage from '@/assets/header-bg.jpg';
import logoImage from '@/assets/logo.png';
import ChampionshipCard from '@/components/cards/championship/ChampionshipCard';
import SearchFilter from '@/components/filter/searchFilter/SearchFilter';
import { UserRole } from '@/model/enum/userRole';
import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { authService, UserSessionData } from '@/services/auth/authService';
import { ChampionshipDocument, championshipService } from '@/services/championship/championshipService';
import { seedChampionshipsToFirestore } from '@/services/seedData';
import { COLORS } from '@/theme/colors';
import { UserSession } from '@/utils/session/session';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, RefreshControl, ScrollView, StatusBar } from 'react-native';
import {
  BackButton,
  BackIcon,
  CardWrapper,
  EmptyChampionshipSVG,
  EmptyContainer,
  EmptyText,
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
import { Container } from '../ChampionshipDetails/styles';

enum EventFilterType {
  ALL_EVENTS,
  NEXT_EVENTS,
  PAST_EVENTS,
}

const Home = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  const [championships, setChampionships] = useState<ChampionshipDocument[]>([]);
  const [isLoading, setisLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  const [session, setSession] = useState<UserSessionData | null>(null);

  const [eventFilterType, setEventFilterType] = useState<EventFilterType>(
    EventFilterType.ALL_EVENTS
  );
  const [filterSearch, setFilterSearch] = useState<string>('');

  const isAdmin = useMemo(() => session?.role === UserRole.ADMIN, [session]);
  const isOrganization = useMemo(() => session?.role === UserRole.ORGANIZATION, [session]);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setisLoading(true);
        try {
          const userSession = await UserSession.get();
          setSession(userSession);

          const fetchedChampionships = await championshipService.getAllChampionships();
          setChampionships(fetchedChampionships);
        } catch (error) {
          console.error("Failed to fetch data:", error);
          Alert.alert("Erro", "Não foi possível carregar os campeonatos.");
        } finally {
          setisLoading(false);
        }
      };

      fetchData();
    }, [])
  );

  useEffect(() => {
    const unsubscribe = authService.onAuthChange(async (session: UserSessionData | null) => {

      if (!session) {
        await UserSession.clear();
        Alert.alert('Sessão expirada', 'Faça login novamente.');
        navigation.navigate('BottomTabs', { screen: 'login' });
      }
      setIsChecking(false);
    });

    return () => unsubscribe();
  }, []);


  const handleDelete = useCallback((docId: string) => {
    Alert.alert(
      'Remover Campeonato',
      'Tem certeza que deseja remover este campeonato?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              await championshipService.deleteChampionship(docId);
              setChampionships(curr => curr.filter(c => c.docId !== docId));
              Alert.alert('Sucesso', 'Campeonato removido.');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível remover o campeonato.');
            }
          },
        },
      ]
    );
  }, []);

  const filteredData = useMemo(() => {
    const base = championships.filter(event =>
      event.title.toLowerCase().includes(filterSearch.toLowerCase())
    );
    if (eventFilterType === EventFilterType.NEXT_EVENTS)
      return base.filter(e => e.isAvailable);
    if (eventFilterType === EventFilterType.PAST_EVENTS)
      return base.filter(e => !e.isAvailable);

    return base.sort(
      (a, b) => new Date(b.dateAndHour).getTime() - new Date(a.dateAndHour).getTime()
    );
  }, [championships, eventFilterType, filterSearch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    const fetchedChampionships = await championshipService.getAllChampionships();
    setChampionships(fetchedChampionships);

    setRefreshing(false);
  }, []);

  if (isLoading || isChecking) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.blue} />
      </Container>
    );
  }

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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.blue]}
            tintColor={COLORS.blue}
          />
        }
      >
        {isLoading ? (
          <EmptyContainer>
            <ActivityIndicator size="large" color={COLORS.blue} />
          </EmptyContainer>
        ) : filteredData.length > 0 ? (

          filteredData.map(championship => (
            <CardWrapper key={championship.docId}>
              <ChampionshipCard
                championship={championship}
                onClick={() =>
                  navigation.navigate('ChampionshipDetails', {
                    championshipId: championship.docId
                  })
                }
                onDelete={() => handleDelete(championship.docId)}
                onEdit={() => {
                  navigation.navigate('AdminCreateEvent', {
                    championshipId: championship.docId,
                  });
                }}
                isAdmin={!!isAdmin}
                isOrganization={!!isOrganization}
              />
            </CardWrapper>
          ))
        ) : (
          <EmptyContainer>
            <EmptyChampionshipSVG source={require('@/assets/championship/empty_championship.png')} />
            <EmptyText>Nenhum campeonato ativo encontrado</EmptyText>
          </EmptyContainer>
        )}
      </ScrollView>

      {isAdmin && (
        <FloatingButton
          onPress={() =>
            // navigation.navigate('AdminCreateEvent', {
            //   championshipId: null,
            // })
            seedChampionshipsToFirestore()
          }
        >
          <FontAwesome name="plus" size={25} color={COLORS.white} />
        </FloatingButton>
      )}
    </Screen>
  );
};

export default Home;
