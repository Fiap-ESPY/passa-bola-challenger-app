import { Match } from '@/model/championship';
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
    WinnerName
} from './styles';

const MatchStatistics = () => {
    const router = useRouter();

    const route = useRoute();
    const { matchId, championshipId } = route.params as { matchId: string, championshipId: string };

    const [championship, setChampionship] = useState<ChampionshipDocument | null>(null);
    const [session, setSession] = useState<UserSessionData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const matchItem: Match | undefined = useMemo(
        () => championship?.matches?.find(match => String(match.id) === String(matchId)),
        [championship?.matches]
    );

    const matchWinner =
        (matchItem?.home?.score ?? 0) > (matchItem?.away?.score ?? 0)
            ? matchItem?.home
            : matchItem?.away;

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
                                {matchItem?.home?.logo && (
                                    <TeamLogo
                                        source={{ uri: matchItem?.home.logo }}
                                        resizeMode="contain"
                                        alt="Team logo image"
                                    />
                                )}
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
                                {matchItem?.away?.logo && (
                                    <TeamLogo
                                        source={{ uri: matchItem?.away.logo }}
                                        resizeMode="contain"
                                        alt="Team logo image"
                                    />
                                )}
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
                            {matchWinner?.logo && (
                                <TeamLogo
                                    source={{ uri: matchWinner?.logo }}
                                    resizeMode="contain"
                                    alt="Team logo image"
                                />
                            )}
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
                            .sort((a, b) => (b?.goals ?? 0) - (a?.goals ?? 0))
                            .map(player => (
                                <PlayerRow key={player.id}>
                                    {player.photo && (
                                        <PlayerPhoto source={{ uri: player.photo }} resizeMode="cover" />
                                    )}
                                    <PlayerContainer>
                                        <PlayerDetail>
                                            {matchItem?.away.logo && (
                                                <PlayerTeamLogo
                                                    source={{ uri: matchItem?.away.logo }}
                                                    resizeMode="contain"
                                                    alt="Team logo image"
                                                />
                                            )}
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
                            .sort((a, b) => (b?.goals ?? 0) - (a?.goals ?? 0))
                            .map(player => (
                                <PlayerRow key={player.id}>
                                    {player.photo && <PlayerPhoto source={{ uri: player.photo }} resizeMode="cover" />}
                                    <PlayerContainer>
                                        <PlayerDetail>
                                            {matchItem?.home.logo && (
                                                <PlayerTeamLogo
                                                    source={{ uri: matchItem?.home.logo }}
                                                    resizeMode="contain"
                                                    alt="Team logo image"
                                                />
                                            )}
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
