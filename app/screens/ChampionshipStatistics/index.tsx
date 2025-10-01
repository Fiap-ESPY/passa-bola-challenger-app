import { CHAMPIONSHIP_DATA } from '@/data/championshipData';
import { Championship } from '@/model/championship';
import { COLORS } from '@/theme/colors';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import {
  BackButton,
  BackIcon,
  HeaderCard,
  HeaderContent,
  HeaderGradient,
  HeaderTitle,
  PlayerContainer,
  PlayerDetail,
  PlayerName,
  PlayerPhoto,
  PlayerRow,
  PlayerStatistics,
  PlayerStatisticsContainer,
  PlayerStatisticsIcon,
  PlayerStatisticsValue,
  PlayerTeamLogo,
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
  SummaryContainer,
} from './styles';
import { calculateTopScorers } from './utils';

const ChampioshipStatistics = () => {
  const router = useRouter();

  const route = useRoute();
  const { championshipId } = route.params as { championshipId: number };

  const refId = useMemo(() => championshipId, [championshipId]);

  const championship: Championship | undefined = useMemo(
    () => CHAMPIONSHIP_DATA.find(championship => championship.id === refId),
    [refId]
  );

  const topScorers = calculateTopScorers(championship?.brackEvents ?? []);

  const sortedTopScorers = useMemo(
    () => [...topScorers].sort((a, b) => b.totalGoals - a.totalGoals),
    [topScorers]
  );

  const podiumPlayers = sortedTopScorers.slice(0, 3);
  const remainingPlayers = sortedTopScorers.slice(3);

  const renderPodiumPlayer = (
    player: any,
    position: '1st' | '2nd' | '3rd',
    rank: number
  ) => (
    <PodiumItem key={player.id} position={position}>
      <PodiumPhoto source={player.photo} position={position} />
      <PodiumColumn position={position}>
        <PodiumRank>{rank}º</PodiumRank>
        <PodiumName numberOfLines={1}>{player.name}</PodiumName>
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

        {podiumPlayers.length > 0 && (
          <PodiumContainer>
            {podiumPlayers[1] && renderPodiumPlayer(podiumPlayers[1], '2nd', 2)}
            {podiumPlayers[0] && renderPodiumPlayer(podiumPlayers[0], '1st', 1)}
            {podiumPlayers[2] && renderPodiumPlayer(podiumPlayers[2], '3rd', 3)}
          </PodiumContainer>
        )}
      </HeaderCard>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <SummaryContainer>
          {remainingPlayers
            .sort((a, b) => b.totalGoals - a.totalGoals)
            .map(player => (
              <PlayerRow key={player.id}>
                <PlayerPhoto source={player.photo} resizeMode="cover" />
                <PlayerContainer>
                  <PlayerDetail>
                    <PlayerTeamLogo
                      source={player.teamLogo}
                      resizeMode="contain"
                      alt="Team logo image"
                    />
                    <PlayerName>{player.name}</PlayerName>
                  </PlayerDetail>
                  <PlayerStatisticsContainer>
                    <PlayerStatistics>
                      <PlayerStatisticsIcon
                        source={require('@/assets/players/statistics/soccer_ball.png')}
                        resizeMode="contain"
                        alt="Soccer ball icon"
                      />
                      <PlayerStatisticsValue>
                        {player.totalGoals ?? 0}
                      </PlayerStatisticsValue>
                    </PlayerStatistics>
                  </PlayerStatisticsContainer>
                </PlayerContainer>
              </PlayerRow>
            ))}
        </SummaryContainer>
      </ScrollView>
    </Screen>
  );
};

export default ChampioshipStatistics;
