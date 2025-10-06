import { useRoute } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  ScrollView,
  Text
} from 'react-native';

import ActionButton from '@/components/buttons/actionbutton/ActionButton';
import { UserRole } from '@/model/enum/userRole';
import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { UserSessionData } from '@/services/auth/authService';
import { ChampionshipDocument, championshipService } from '@/services/championship/championshipService';
import { OrganizationDocument, organizationService } from '@/services/organization/organizationService';
import { TeamDocument, teamService } from '@/services/team/teamService';
import { COLORS } from '@/theme/colors';
import { UserSession } from '@/utils/session/session';
import { FontAwesome } from '@expo/vector-icons';
import {
  BackButton,
  BackIcon,
  Container,
  Footer,
  HeaderContent,
  HeaderGradient,
  RuleItem,
  RuleList,
  Section,
  SectionText,
  SectionTitle,
  TeamName,
  TeamPhotoImage,
  TeamRow
} from './styles';
import { generateBracket } from './utils';

const ChampionshipDetails = () => {
  const router = useRouter();
  const route = useRoute();

  const { championshipId } = route.params as { championshipId: string };

  const [championship, setChampionship] = useState<ChampionshipDocument | null>(null);
  const [session, setSession] = useState<UserSessionData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [organization, setOrganization] = useState<OrganizationDocument | null>(null);
  const [registeredTeams, setRegisteredTeams] = useState<TeamDocument[]>([]);

  const navigation = useNavigation<RootStackNavigationProps>();

  const isAdmin = useMemo(() => session?.role === UserRole.ADMIN, [session]);
  const isOrganization = useMemo(() => session?.role === UserRole.ORGANIZATION, [session]);

  const handleGenerateMatches = async () => {
    if (!championship || !championship.registeredTeams || championship.registeredTeams.length < 2) {
      Alert.alert("Erro", "São necessárias pelo menos 2 equipas inscritas para gerar os confrontos.");
      return;
    }

    try {
      const newMatches = generateBracket(registeredTeams);

      if (newMatches.length === 0) {
        throw new Error("Não foi possível gerar confrontos.");
      }

      await championshipService.startTournament(championship.docId, newMatches);

      setChampionship(prev => prev ? ({
        ...prev,
        matches: newMatches
      }) : null);

      handlePublish()

      Alert.alert("Sucesso!", "Os confrontos foram gerados.");
    } catch (error) {
      Alert.alert("Erro", "Erro ao gerar os confrontos");
    }
  };

  const handlePublish = async () => {
    if (!championship) {
      Alert.alert("Erro", "Não há um campeonato carregado para publicar.");
      return;
    }

    try {
      await championshipService.publishChampionship(championship.docId);

      setChampionship(prev => {
        if (!prev) return null;
        return {
          ...prev,
          isPublished: true,
        };
      });

      Alert.alert("Sucesso", "O campeonato foi publicado e agora está visível para todos.");

    } catch (error) {
      Alert.alert("Erro", "Não foi possível publicar o campeonato.");
    }
  };


  const handleRegisterTeam = async () => {
    if (!championship) {
      Alert.alert("Erro", "Campeonato não carregado.");
      return;
    }

    if (!session?.uid) {
      Alert.alert("Erro", "Organização não encontrada.");
      return;
    }

    try {
      const fetchedOrganization = await organizationService.getOrganizationById(session?.uid);

      if (!fetchedOrganization?.id) {
        Alert.alert("Erro", "Organização não encontrada.");
        return;
      }

      await championshipService.addTeamToChampionship(championship.docId, fetchedOrganization.team.id);

      setChampionship(prev => {
        if (!prev) return null;

        const updatedRegisteredTeams = [...(prev.registeredTeams || []), fetchedOrganization.team.id];

        return {
          ...prev,
          registeredTeams: updatedRegisteredTeams,
        };
      });

      Alert.alert("Sucesso", "Inscrição realizada com sucesso!");

    } catch (error) {
      Alert.alert("Erro", "Não foi possível realizar a inscrição.");
    }
  };

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

        if (userSession?.role === UserRole.ORGANIZATION && userSession.uid) {
          const findOrganization = await organizationService.getOrganizationById(userSession.uid)
          setOrganization(findOrganization);
        }

      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os detalhes do campeonato.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [championshipId]);

  useEffect(() => {
    const fetchRegisteredTeams = async () => {
      if (championship && championship.registeredTeams && championship.registeredTeams.length > 0) {
        try {
          const teamIds = championship.registeredTeams.map(teamId => teamId);
          const teamsDetails = await teamService.getTeamsByIds(teamIds);
          setRegisteredTeams(teamsDetails);

        } catch (error) {
          console.error("Erro ao buscar detalhes das equipas inscritas:", error);
          Alert.alert("Erro", "Não foi possível carregar a lista de equipas inscritas.");
        }
      }
    };

    fetchRegisteredTeams();
  }, [championship]);

  const formattedDate = useMemo(() => {
    if (!championship?.dateAndHour) return null;
    try {
      const date = parseISO(championship.dateAndHour);
      return format(date, "EEEE, dd/MM 'às' HH:mm'h'", { locale: ptBR });
    } catch (error) {
      return championship.dateAndHour;
    }
  }, [championship?.dateAndHour]);


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
    <Container>
      {championship.image ? (
        <ImageBackground
          source={{ uri: championship.image as string }}
          style={{ width: '100%', height: 200 }}
          resizeMode="cover"
        >
          <HeaderGradient
            colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.8)']}
            style={{ height: '100%' }}
          >
            <HeaderContent>
              <BackButton onPress={() => router.back()}>
                <BackIcon name="arrow-left" />
              </BackButton>
            </HeaderContent>
          </HeaderGradient>
        </ImageBackground>
      ) : (
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
      )}

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <Section>
          <SectionTitle>{championship.title}</SectionTitle>
          <SectionText>📍 {championship.address}</SectionText>
          {formattedDate && <SectionText>📅 {formattedDate}</SectionText>}
        </Section>

        {championship.description && (
          <Section>
            <SectionTitle>Descrição do Evento</SectionTitle>
            <SectionText>{championship.description}</SectionText>
          </Section>
        )}

        {championship.rules && championship.rules.length > 0 && (
          <Section>
            <SectionTitle>Regras</SectionTitle>
            {championship.rules.map((ruleSection, index) => (
              <React.Fragment key={index}>
                <SectionText style={{ fontWeight: '700', marginTop: 16 }}>
                  {ruleSection.title}
                </SectionText>
                <RuleList>
                  {ruleSection.items.map((item, itemIndex) => (
                    <RuleItem key={itemIndex}>• {item}</RuleItem>
                  ))}
                </RuleList>
              </React.Fragment>
            ))}
          </Section>
        )}

        {isAdmin && championship.type === 'campeonato' && (
          <Section>
            <SectionTitle>
              Times Inscritos ({registeredTeams.length} / {championship.maxTeams})
            </SectionTitle>

            {registeredTeams.length > 0 ? (
              registeredTeams.map((team) => (
                <TeamRow key={team.docId} style={{ marginTop: 8 }}>
                  {team.logo && (
                    <TeamPhotoImage source={{ uri: team.logo }} />
                  )}
                  <TeamName>{team.name}</TeamName>
                </TeamRow>
              ))
            ) : (
              <SectionText style={{ marginTop: 8 }}>Nenhuma equipe inscrita ainda.</SectionText>
            )}
          </Section>
        )}

      </ScrollView>
      {championship.type === 'campeonato' && championship.isPublished && (
        <Footer>
          <ActionButton
            label={'Chaveamento'}
            backgroundColor={COLORS.pinkLight}
            onPress={() =>
              navigation.navigate('MatchSwitching', { championshipId: championship.docId })
            }
          />
          <ActionButton
            label={'Estatísticas'}
            backgroundColor={COLORS.blue}
            onPress={() =>
              navigation.navigate('ChampionshipStatistics', {
                championshipId: championship.docId,
              })
            }
          />
        </Footer>
      )}
      {isAdmin && !championship.isPublished &&
        <Footer>
          <ActionButton
            isDisabled={championship.maxTeams !== championship.registeredTeams?.length}
            backgroundColor={COLORS.blue}
            label={championship.maxTeams !== championship.registeredTeams?.length
              ? `${championship.registeredTeams?.length} / ${championship.maxTeams} times cadastrados`
              : 'Finalizar Inscrições'
            }
            onPress={() => {
              Alert.alert(
                'Finalizar Incrições',
                'Deseja encerrar as inscrições?',
                [
                  { text: 'Cancelar', style: 'destructive' },
                  { text: 'Finalizar', style: 'default', onPress: handleGenerateMatches },
                ],
              )

            }}
          />
        </Footer>
      }
      {isOrganization && !championship.isPublished &&
        <Footer>
          <ActionButton
            isDisabled={(championship.maxTeams === championship.registeredTeams?.length) || (organization?.team?.id ? championship.registeredTeams?.includes(organization?.team?.id) : false)}
            backgroundColor={COLORS.blue}
            icon={organization?.team?.id && championship.registeredTeams?.includes(organization?.team?.id)
              ? <FontAwesome name="check" size={18} color={COLORS.white} />
              : <FontAwesome name="edit" size={18} color={COLORS.white} />
            }
            label={organization?.team?.id && championship.registeredTeams?.includes(organization?.team?.id) ? "Incrição realizada" :
              championship.maxTeams === championship.registeredTeams?.length
                ? `Inscrições encerradas`
                : 'Inscrever time'
            }
            onPress={() => {
              Alert.alert(
                'Realizar inscrição',
                'Deseja inscrever time no campeonato?',
                [
                  { text: 'Cancelar', style: 'destructive' },
                  { text: 'Inscrever', style: 'default', onPress: handleRegisterTeam },
                ],
              )
            }}
          />
        </Footer>
      }

    </Container>
  );
};

export default ChampionshipDetails;