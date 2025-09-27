import { BRACKET_EVENTS_DATA } from '@/data/brackEventData';
import { Match } from '@/model/match';
import { COLORS } from '@/theme/colors';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import {
  BackButton,
  BackIcon,
  Badge,
  BadgeText,
  HeaderCard,
  HeaderContent,
  HeaderGradient,
  HeaderTitle,
  MatchCard,
  MatchRow,
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
  Score,
  Screen,
  Side,
  SummaryContainer,
  SummaryTitle,
  SummaryTitleRow,
  TeamCircle,
  TeamLogo,
  TeamName,
  VsImage,
  WinnerAvatar,
  WinnerBadge,
  WinnerBadgeText,
  WinnerCard,
  WinnerContent,
  WinnerLogo,
  WinnerName,
} from './styles';

const MatchStatistics = () => {
  const router = useRouter();

  const route = useRoute();
  const { matchId } = route.params as { matchId: number };

  const refId = useMemo(() => matchId, [matchId]);

  const matchItem: Match | undefined = useMemo(
    () => BRACKET_EVENTS_DATA.find(match => match.id === refId),
    [refId]
  );

  const matchWinner =
    (matchItem?.home?.score ?? 0) > (matchItem?.away?.score ?? 0)
      ? matchItem?.home
      : matchItem?.away;

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
        <HeaderTitle>DETALHES</HeaderTitle>

        <MatchCard key={matchItem?.id} onPress={() => console.log('cliquei')}>
          <Badge>
            <BadgeText>{matchItem?.label}</BadgeText>
          </Badge>

          <MatchRow>
            <Side>
              <TeamCircle>
                <TeamLogo
                  source={matchItem?.home?.logo}
                  resizeMode="contain"
                  alt="Team logo image"
                />
              </TeamCircle>
              <TeamName numberOfLines={1}>{matchItem?.home.name}</TeamName>
              <Score>{matchItem?.home.score ?? '-'}</Score>
            </Side>

            <VsImage
              source={require('@/assets/icons/vs_icon.png')}
              resizeMode="contain"
              alt="Vs icon"
            />

            <Side>
              <TeamCircle>
                <TeamLogo
                  source={matchItem?.away.logo}
                  resizeMode="contain"
                  alt="Team logo image"
                />
              </TeamCircle>
              <TeamName numberOfLines={1}>{matchItem?.away.name}</TeamName>
              <Score>{matchItem?.away.score ?? '-'}</Score>
            </Side>
          </MatchRow>
        </MatchCard>
        <WinnerCard
          colors={[`${COLORS.grad1}`, `${COLORS.grad2}`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <WinnerBadge>
            <WinnerBadgeText>VENCEDORAS</WinnerBadgeText>
          </WinnerBadge>
          <WinnerContent>
            <WinnerAvatar>
              <WinnerLogo
                source={matchWinner?.logo}
                resizeMode="contain"
                alt="Winner logo team"
              />
            </WinnerAvatar>

            <WinnerName numberOfLines={1}>{matchWinner?.name}</WinnerName>
          </WinnerContent>
        </WinnerCard>
      </HeaderCard>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <SummaryContainer>
          <SummaryTitleRow>
            <SummaryTitle>RESUMO</SummaryTitle>
          </SummaryTitleRow>

          {matchItem?.away?.scorers &&
            matchItem.away.scorers
              .sort((a, b) => b.goals - a.goals)
              .map(player => (
                <PlayerRow key={player.id}>
                  <PlayerPhoto source={player.photo} resizeMode="cover" />
                  <PlayerContainer>
                    <PlayerDetail>
                      <PlayerTeamLogo
                        source={matchItem?.away.logo}
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
                          {player.goals ?? 0}
                        </PlayerStatisticsValue>
                      </PlayerStatistics>
                      <PlayerStatistics>
                        <PlayerStatisticsIcon
                          source={require('@/assets/players/statistics/assists.png')}
                          resizeMode="contain"
                          alt="Assists icon"
                        />
                        <PlayerStatisticsValue>
                          {player.assists ?? 0}
                        </PlayerStatisticsValue>
                      </PlayerStatistics>
                      <PlayerStatistics>
                        <PlayerStatisticsIcon
                          source={require('@/assets/players/statistics/yellow_card.png')}
                          resizeMode="contain"
                          alt="Yellow card icon"
                        />
                        <PlayerStatisticsValue>
                          {player.yellowCards ?? 0}
                        </PlayerStatisticsValue>
                      </PlayerStatistics>
                      <PlayerStatistics>
                        <PlayerStatisticsIcon
                          source={require('@/assets/players/statistics/red_card.png')}
                          resizeMode="contain"
                          alt="Red card icon"
                        />
                        <PlayerStatisticsValue>
                          {player.redCards ?? 0}
                        </PlayerStatisticsValue>
                      </PlayerStatistics>
                    </PlayerStatisticsContainer>
                  </PlayerContainer>
                </PlayerRow>
              ))}
          {matchItem?.home?.scorers &&
            matchItem.home.scorers
              .sort((a, b) => b.goals - a.goals)
              .map(player => (
                <PlayerRow key={player.id}>
                  <PlayerPhoto source={player.photo} resizeMode="cover" />
                  <PlayerContainer>
                    <PlayerDetail>
                      <PlayerTeamLogo
                        source={matchItem?.home.logo}
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
                          {player.goals ?? 0}
                        </PlayerStatisticsValue>
                      </PlayerStatistics>
                      <PlayerStatistics>
                        <PlayerStatisticsIcon
                          source={require('@/assets/players/statistics/assists.png')}
                          resizeMode="contain"
                          alt="Assists icon"
                        />
                        <PlayerStatisticsValue>
                          {player.assists ?? 0}
                        </PlayerStatisticsValue>
                      </PlayerStatistics>
                      <PlayerStatistics>
                        <PlayerStatisticsIcon
                          source={require('@/assets/players/statistics/yellow_card.png')}
                          resizeMode="contain"
                          alt="Yellow card icon"
                        />
                        <PlayerStatisticsValue>
                          {player.yellowCards ?? 0}
                        </PlayerStatisticsValue>
                      </PlayerStatistics>
                      <PlayerStatistics>
                        <PlayerStatisticsIcon
                          source={require('@/assets/players/statistics/red_card.png')}
                          resizeMode="contain"
                          alt="Red card icon"
                        />
                        <PlayerStatisticsValue>
                          {player.redCards ?? 0}
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

export default MatchStatistics;
