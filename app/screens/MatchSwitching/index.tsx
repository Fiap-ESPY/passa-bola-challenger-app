import SearchFilter from '@/components/filter/searchFilter/SearchFilter';
import { Match } from '@/model/championship';
import { RoundType } from '@/model/enum/roundType';
import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { UserSessionData } from '@/services/auth/authService';
import { ChampionshipDocument, championshipService } from '@/services/championship/championshipService';
import { COLORS } from '@/theme/colors';
import { UserSession } from '@/utils/session/session';
import { useRoute } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
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
    Score,
    Screen,
    Section,
    SectionTitle,
    Side,
    TabPill,
    Tabs,
    TabText,
    TeamCircle,
    TeamLogo,
    TeamName,
    VsImage,
    WinnerAvatar,
    WinnerCard,
    WinnerContent,
    WinnerLogo,
    WinnerName,
    WinnerTitle,
} from './styles';

const ROUNDS_LABEL: Record<RoundType, string> = {
    [RoundType.R16]: 'Oitavas de Final',
    [RoundType.QF]: 'Quartas de Final',
    [RoundType.SF]: 'Semifinal',
    [RoundType.F]: 'Final',
};

const MatchSwitching = () => {
    const router = useRouter();
    const navigation = useNavigation<RootStackNavigationProps>();

    const route = useRoute();
    const { championshipId } = route.params as { championshipId: string };

    const [selectedRound, setSelectedRound] = useState<RoundType | undefined>(
        undefined
    );
    const [filterSearch, setFilterSearch] = useState<string>('');
    const [championship, setChampionship] = useState<ChampionshipDocument | null>(null);
    const [session, setSession] = useState<UserSessionData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const filteredMatches = useMemo(() => {
        if (!championship?.matches) return [];

        const searchText = filterSearch.trim().toLowerCase();

        return championship.matches.filter(match => {
            const matchesSearch =
                !searchText ||
                match.home.name.toLowerCase().includes(searchText) ||
                match.away.name.toLowerCase().includes(searchText);

            const matchesRound = !selectedRound || match.round === selectedRound;

            return matchesSearch && matchesRound;
        });
    }, [championship?.matches, selectedRound, filterSearch]);

    const groupedByRound = useMemo(() => {
        const groups: Record<RoundType, Match[]> = {
            R16: [],
            QF: [],
            SF: [],
            F: [],
        };

        filteredMatches.forEach(match => {
            groups[match.round].push(match);
        });

        return groups;
    }, [filteredMatches]);

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
                <HeaderTitle>CHAVEAMENTO</HeaderTitle>

                <SearchFilter
                    searchValue={filterSearch}
                    onChangeText={setFilterSearch}
                />

                <Tabs>
                    <TabPill
                        onPress={() => setSelectedRound(undefined)}
                        $active={!selectedRound}
                    >
                        <TabText $active={!selectedRound}>Todos</TabText>
                    </TabPill>
                    <TabPill
                        onPress={() => setSelectedRound(RoundType.SF)}
                        $active={selectedRound === RoundType.SF}
                    >
                        <TabText $active={selectedRound === RoundType.SF}>
                            Semi-Final
                        </TabText>
                    </TabPill>
                    <TabPill
                        onPress={() => setSelectedRound(RoundType.F)}
                        $active={selectedRound === RoundType.F}
                    >
                        <TabText $active={selectedRound === RoundType.F}>Final</TabText>
                    </TabPill>
                </Tabs>
            </HeaderCard>

            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
            >
                {(!selectedRound || selectedRound === 'R16') &&
                    groupedByRound.R16.length > 0 && (
                        <>
                            <SectionTitle>{ROUNDS_LABEL.R16}</SectionTitle>
                            <Section>
                                {groupedByRound.R16.map(match => (
                                    <MatchCard
                                        key={match.id}
                                        onPress={() =>
                                            navigation.navigate('MatchStatistics', {
                                                matchId: String(match.id),
                                                championshipId: String(championship.docId),
                                            })
                                        }
                                    >
                                        <Badge>
                                            <BadgeText>{match.label}</BadgeText>
                                        </Badge>

                                        <MatchRow>
                                            <Side>
                                                <TeamCircle>
                                                    {match.home.logo && (
                                                        <TeamLogo
                                                            source={{ uri: match.home.logo }}
                                                            resizeMode="contain"
                                                            alt="Team logo image"
                                                        />)
                                                    }
                                                </TeamCircle>
                                                <TeamName numberOfLines={1}>{match.home.name}</TeamName>
                                                <Score>{match.home.score ?? '-'}</Score>
                                            </Side>

                                            <VsImage
                                                source={require('@/assets/icons/vs_icon.png')}
                                                resizeMode="contain"
                                                alt="Vs icon"
                                            />

                                            <Side>
                                                <TeamCircle>
                                                    {match.away.logo && (
                                                        <TeamLogo
                                                            source={{ uri: match.away.logo }}
                                                            resizeMode="contain"
                                                            alt="Team logo image"
                                                        />)
                                                    }
                                                </TeamCircle>
                                                <TeamName numberOfLines={1}>{match.away.name}</TeamName>
                                                <Score>{match.away.score ?? '-'}</Score>
                                            </Side>
                                        </MatchRow>
                                    </MatchCard>
                                ))}
                            </Section>
                        </>
                    )}

                {/* Confrontos das Quartas de Final */}
                {(!selectedRound || selectedRound === 'QF') &&
                    groupedByRound.QF.length > 0 && (
                        <>
                            <SectionTitle>{ROUNDS_LABEL.QF}</SectionTitle>
                            <Section>
                                {groupedByRound.QF.map(match => (
                                    <MatchCard
                                        key={match.id}
                                        onPress={() =>
                                            navigation.navigate('MatchStatistics', {
                                                matchId: String(match.id),
                                                championshipId: String(championship.docId),
                                            })
                                        }
                                    >
                                        <Badge>
                                            <BadgeText>{match.label}</BadgeText>
                                        </Badge>
                                        <MatchRow>
                                            <Side>
                                                <TeamCircle>
                                                    {match.home.logo && (
                                                        <TeamLogo
                                                            source={{ uri: match.home.logo }}
                                                            resizeMode="contain"
                                                            alt="Team logo image"
                                                        />)
                                                    }
                                                </TeamCircle>
                                                <TeamName numberOfLines={1}>{match.home.name}</TeamName>
                                                <Score>{match.home.score ?? '-'}</Score>
                                            </Side>
                                            <VsImage
                                                source={require('@/assets/icons/vs_icon.png')}
                                                resizeMode="contain"
                                                alt="Vs icon"
                                            />
                                            <Side>
                                                <TeamCircle>
                                                    {match.away.logo && (
                                                        <TeamLogo
                                                            source={{ uri: match.away.logo }}
                                                            resizeMode="contain"
                                                            alt="Team logo image"
                                                        />)
                                                    }
                                                </TeamCircle>
                                                <TeamName numberOfLines={1}>{match.away.name}</TeamName>
                                                <Score>{match.away.score ?? '-'}</Score>
                                            </Side>
                                        </MatchRow>
                                    </MatchCard>
                                ))}
                            </Section>
                        </>
                    )}

                {/* Confrontos da Semifinal */}
                {(!selectedRound || selectedRound === 'SF') &&
                    groupedByRound.SF.length > 0 && (
                        <>
                            <SectionTitle>{ROUNDS_LABEL.SF}</SectionTitle>
                            <Section>
                                {groupedByRound.SF.map(match => (
                                    <MatchCard
                                        key={match.id}
                                        onPress={() =>
                                            navigation.navigate('MatchStatistics', {
                                                matchId: String(match.id),
                                                championshipId: String(championship.docId),
                                            })
                                        }
                                    >
                                        <Badge>
                                            <BadgeText>{match.label}</BadgeText>
                                        </Badge>
                                        <MatchRow>
                                            <Side>
                                                <TeamCircle>
                                                    {match.away.logo && (
                                                        <TeamLogo
                                                            source={{ uri: match.away.logo }}
                                                            resizeMode="contain"
                                                            alt="Team logo image"
                                                        />)
                                                    }
                                                </TeamCircle>
                                                <TeamName numberOfLines={1}>{match.home.name}</TeamName>
                                                <Score>{match.home.score ?? '-'}</Score>
                                            </Side>
                                            <VsImage
                                                source={require('@/assets/icons/vs_icon.png')}
                                                resizeMode="contain"
                                                alt="Vs icon"
                                            />
                                            <Side>
                                                <TeamCircle>
                                                    {match.away.logo && (
                                                        <TeamLogo
                                                            source={{ uri: match.away.logo }}
                                                            resizeMode="contain"
                                                            alt="Team logo image"
                                                        />)
                                                    }
                                                </TeamCircle>
                                                <TeamName numberOfLines={1}>{match.away.name}</TeamName>
                                                <Score>{match.away.score ?? '-'}</Score>
                                            </Side>
                                        </MatchRow>
                                    </MatchCard>
                                ))}
                            </Section>
                        </>
                    )}

                {/* Final */}
                {(!selectedRound || selectedRound === 'F') &&
                    groupedByRound.F.length > 0 && (
                        <>
                            <SectionTitle>{ROUNDS_LABEL.F}</SectionTitle>
                            <Section>
                                {groupedByRound.F.map(match => (
                                    <MatchCard
                                        key={match.id}
                                        onPress={() =>
                                            navigation.navigate('MatchStatistics', {
                                                matchId: String(match.id),
                                                championshipId: String(championship.docId),
                                            })
                                        }
                                    >
                                        <Badge>
                                            <BadgeText>{match.label}</BadgeText>
                                        </Badge>
                                        <MatchRow>
                                            <Side>
                                                <TeamCircle>
                                                    {match.home.logo && (
                                                        <TeamLogo
                                                            source={{ uri: match.home.logo }}
                                                            resizeMode="contain"
                                                            alt="Team logo image"
                                                        />)
                                                    }
                                                </TeamCircle>
                                                <TeamName numberOfLines={1}>{match.home.name}</TeamName>
                                                <Score>{match.home.score ?? '-'}</Score>
                                            </Side>
                                            <VsImage
                                                source={require('@/assets/icons/vs_icon.png')}
                                                resizeMode="contain"
                                                alt="Vs icon"
                                            />
                                            <Side>
                                                <TeamCircle>
                                                    {match.away.logo && (
                                                        <TeamLogo
                                                            source={{ uri: match.away.logo }}
                                                            resizeMode="contain"
                                                            alt="Team logo image"
                                                        />)
                                                    }
                                                </TeamCircle>
                                                <TeamName numberOfLines={1}>{match.away.name}</TeamName>
                                                <Score>{match.away.score ?? '-'}</Score>
                                            </Side>
                                        </MatchRow>
                                    </MatchCard>
                                ))}
                            </Section>
                        </>
                    )}
                {championship?.tournamentWinner && (
                    <>
                        <SectionTitle />
                        <WinnerTitle>Vencedor!</WinnerTitle>
                        <WinnerCard
                            colors={[`${COLORS.grad1}`, `${COLORS.grad2}`]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <WinnerContent>
                                <WinnerAvatar>
                                    {championship?.tournamentWinner.logo &&
                                        <WinnerLogo
                                        source={{ uri: championship?.tournamentWinner.logo }}
                                            resizeMode="contain"
                                            alt="Winner logo team"
                                        />
                                    }
                                   
                                </WinnerAvatar>

                                <WinnerName numberOfLines={1}>
                                    {championship?.tournamentWinner.name}
                                </WinnerName>
                            </WinnerContent>
                        </WinnerCard>
                    </>
                )}
            </ScrollView>
        </Screen>
    );
};

export default MatchSwitching;
