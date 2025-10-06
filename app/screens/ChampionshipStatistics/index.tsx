import { UserSessionData } from '@/services/auth/authService';
import { ChampionshipDocument, championshipService } from '@/services/championship/championshipService';
import { COLORS } from '@/theme/colors';
import { UserSession } from '@/utils/session/session';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StatusBar, Text } from 'react-native';
import { Container } from '../ChampionshipDetails/styles';
import {
  BackButton,
  BackIcon,
  ContainerPhoto,
  EmptyChampionshipSVG,
  EmptyContainer,
  EmptyText,
  HeaderCard,
  HeaderContent,
  HeaderGradient,
  HeaderTitle,
  PlayerContainer,
  PlayerDetail,
  PlayerName,
  PlayerPhoto,
  PlayerRank,
  PlayerRow,
  PlayerStatistics,
  PlayerStatisticsContainer,
  PlayerStatisticsIcon,
  PlayerStatisticsValue,
  PlayerTeamContainer,
  PlayerTeamLogo,
  PlayerTeamName,
  PodiumColumn,
  PodiumContainer,
  PodiumGoalsContainer,
  PodiumGoalsIcon,
  PodiumGoalsValue,
  PodiumItem,
  PodiumName,
  PodiumPhoto,
  PodiumRank,
  Screen,
  SummaryContainer
} from './styles';
import { calculateTopScorers } from './utils';

const ChampioshipStatistics = () => {
  const router = useRouter();

  const route = useRoute();
  const { championshipId } = route.params as { championshipId: string };

  const [championship, setChampionship] = useState<ChampionshipDocument | null>(null);
  const [session, setSession] = useState<UserSessionData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const topScorers = calculateTopScorers(championship?.matches ?? []);

  const sortedTopScorers = useMemo(
    () => [...topScorers].sort((a, b) => b.totalGoals - a.totalGoals),
    [topScorers]
  );

  const podiumPlayers = sortedTopScorers.slice(0, 3);
  const remainingPlayers = sortedTopScorers.slice(3);

  useEffect(() => {
    const fetchData = async () => {
      if (!championshipId) {
        Alert.alert("Erro", "ID do campeonato não encontrado.");
        router.back();
        return;
      }
      setIsLoading(true);
      try {
        const [fetchedChampionship, userSession] = await Promise.all([
          championshipService.getChampionshipByDocId(championshipId),
          UserSession.get()
        ]);

        setChampionship(fetchedChampionship);
        setSession(userSession);

      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os detalhes do campeonato.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [championshipId]);

  if (isLoading) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.blue} />
      </Container>
    );
  }

  if (!championship) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Campeonato não encontrado!</Text>
      </Container>
    );
  }

  const renderPodiumPlayer = (
    player: any,
    position: '1st' | '2nd' | '3rd',
    rank: number
  ) => (
    <PodiumItem key={player.id} position={position}>
      <ContainerPhoto>
        <PodiumPhoto source={{ uri: player.photo }} position={position} />
      </ContainerPhoto>
      <PodiumColumn position={position}>
        <PodiumRank>{rank}</PodiumRank>
        <PodiumName numberOfLines={2}>{player.name}</PodiumName>
        <PodiumGoalsContainer>
          <PodiumGoalsIcon
            source={require('@/assets/players/statistics/soccer_ball.png')}
          />
          <PodiumGoalsValue>{player.totalGoals}</PodiumGoalsValue>
        </PodiumGoalsContainer>
      </PodiumColumn>
    </PodiumItem>
  );

  return (
    <Screen>
      <StatusBar barStyle="light-content" />

      <HeaderGradient
        colors={[`${COLORS.grad1}`, `${COLORS.grad2}`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <HeaderContent>
          <BackButton onPress={() => router.back()}>
            <BackIcon name="arrow-left" />
          </BackButton>
        </HeaderContent>
      </HeaderGradient>

      <HeaderCard>
        <HeaderTitle>ESTATÍSTICAS CAMPEONATO</HeaderTitle>

        {podiumPlayers.length > 0 ? (
          <PodiumContainer>
            {podiumPlayers[1] && renderPodiumPlayer(podiumPlayers[1], '2nd', 2)}
            {podiumPlayers[0] && renderPodiumPlayer(podiumPlayers[0], '1st', 1)}
            {podiumPlayers[2] && renderPodiumPlayer(podiumPlayers[2], '3rd', 3)}
          </PodiumContainer>
        ) :
          <EmptyContainer>
            <EmptyChampionshipSVG source={require('@/assets/championship/empty_championship.png')} />
            <EmptyText>Nenhuma estatística encontrada</EmptyText>
          </EmptyContainer>
        }
      </HeaderCard>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <SummaryContainer>
          {remainingPlayers
            .sort((a, b) => b.totalGoals - a.totalGoals)
            .map((player, index) => (
              <PlayerRow key={player.id}>
                {player.photo && (
                  <PlayerPhoto source={{ uri: player.photo }} resizeMode="cover" />
                )}
                <PlayerContainer>
                  <PlayerDetail>
                    <PlayerName>{player.name}</PlayerName>
                    <PlayerRank>{index + 1}°</PlayerRank>
                  </PlayerDetail>

                  <PlayerStatisticsContainer>
                    <PlayerTeamContainer>
                      {player.teamLogo && (
                        <PlayerTeamLogo source={{ uri: player.teamLogo }} resizeMode="contain" />
                      )}
                      <PlayerTeamName>{player.teamName}</PlayerTeamName>
                    </PlayerTeamContainer>

                    <PlayerStatistics>
                      <PlayerStatisticsIcon
                        source={require('@/assets/players/statistics/soccer_ball.png')}
                        resizeMode="contain"
                      />
                      <PlayerStatisticsValue>{player.totalGoals ?? 0}</PlayerStatisticsValue>
                    </PlayerStatistics>

                  </PlayerStatisticsContainer>
                </PlayerContainer>
              </PlayerRow>
            ))
          }
        </SummaryContainer>
      </ScrollView>
    </Screen>
  );
};

export default ChampioshipStatistics;

