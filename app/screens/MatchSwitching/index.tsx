import SearchFilter from '@/components/filter/searchFilter/SearchFilter';
import { MATCH_EVENTS_DATA } from '@/data/matchEventData';
import { RoundType } from '@/model/enum/roundType';
import { Match, MatchEvent } from '@/model/match';
import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { COLORS } from '@/theme/colors';
import { useRoute } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
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
  const { matchId } = route.params as { matchId: number };

  const refId = useMemo(() => matchId, [matchId]);

  const [selectedRound, setSelectedRound] = useState<RoundType | undefined>(
    undefined
  );
  const [filterSearch, setFilterSearch] = useState<string>('');

  const matchItem: MatchEvent | undefined = useMemo(
    () => MATCH_EVENTS_DATA.find(match => match.id === refId),
    [refId]
  );

  const filtered = useMemo(() => {
    const searchText = filterSearch.trim().toLowerCase();

    let base = matchItem?.brackEvents?.filter(
      match =>
        !searchText ||
        match.home.name.toLowerCase().includes(searchText) ||
        match.away.name.toLowerCase().includes(searchText)
    );

    if (selectedRound) {
      base = base?.filter(match => match.round === selectedRound);
    }

    return base;
  }, [selectedRound, filterSearch]);

  const groupedByRound = useMemo(() => {
    const groups: Record<RoundType, Match[]> = {
      R16: [],
      QF: [],
      SF: [],
      F: [],
    };

    filtered?.forEach(match => groups[match.round].push(match));

    return groups;
  }, [filtered]);

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
        {/* Confrontos das Oitavas de Final */}
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
                        matchId: match.id,
                      })
                    }
                  >
                    <Badge>
                      <BadgeText>{match.label}</BadgeText>
                    </Badge>

                    <MatchRow>
                      <Side>
                        <TeamCircle>
                          <TeamLogo
                            source={match.home.logo}
                            resizeMode="contain"
                            alt="Team logo image"
                          />
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
                          <TeamLogo
                            source={match.away.logo}
                            resizeMode="contain"
                            alt="Team logo image"
                          />
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
                        matchId: match.id,
                      })
                    }
                  >
                    <Badge>
                      <BadgeText>{match.label}</BadgeText>
                    </Badge>
                    <MatchRow>
                      <Side>
                        <TeamCircle>
                          <TeamLogo
                            source={match.home.logo}
                            alt="Team logo image"
                          />
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
                          <TeamLogo
                            source={match.away.logo}
                            alt="Team logo image"
                          />
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
                        matchId: match.id,
                      })
                    }
                  >
                    <Badge>
                      <BadgeText>{match.label}</BadgeText>
                    </Badge>
                    <MatchRow>
                      <Side>
                        <TeamCircle>
                          <TeamLogo
                            source={match.home.logo}
                            alt="Team logo image"
                          />
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
                          <TeamLogo
                            source={match.away.logo}
                            alt="Team logo image"
                          />
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
                        matchId: match.id,
                      })
                    }
                  >
                    <Badge>
                      <BadgeText>{match.label}</BadgeText>
                    </Badge>
                    <MatchRow>
                      <Side>
                        <TeamCircle>
                          <TeamLogo
                            source={match.home.logo}
                            alt="Team logo image"
                          />
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
                          <TeamLogo
                            source={match.away.logo}
                            alt="Team logo image"
                          />
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
        {matchItem?.tournamentWinner && (
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
                  <WinnerLogo
                    source={matchItem?.tournamentWinner.logo}
                    resizeMode="contain"
                    alt="Winner logo team"
                  />
                </WinnerAvatar>

                <WinnerName numberOfLines={1}>
                  {matchItem?.tournamentWinner.name}
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
