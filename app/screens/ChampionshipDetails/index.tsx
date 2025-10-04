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
import { COLORS } from '@/theme/colors';
import { UserSession } from '@/utils/session/session';
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
  SectionTitle
} from './styles';

const ChampionshipDetails = () => {
  const router = useRouter();
  const route = useRoute();

  const { championshipId } = route.params as { championshipId: string };

  const [championship, setChampionship] = useState<ChampionshipDocument | null>(null);
  const [session, setSession] = useState<UserSessionData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigation = useNavigation<RootStackNavigationProps>();

  const isAdmin = useMemo(() => session?.role === UserRole.ADMIN, [session]);

  const handlePublish = () => {

  }

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
      </ScrollView>
      {championship.type === 'campeonato' && championship.isPublished && (
        <Footer>
          <ActionButton
            label="Chaveamento"
            onPress={() =>
              navigation.navigate('MatchSwitching', { championshipId: championship.docId })
            }
          />
          <ActionButton
            label="Estatísticas"
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
            isDisabled={championship.maxTeams !== championship.registeredTeams}
            backgroundColor={COLORS.blue}
            label={championship.maxTeams !== championship.registeredTeams
              ? `${championship.registeredTeams} / ${championship.maxTeams} times cadastrados`
              : 'Finalizar Inscrições'
            }
            onPress={() => {
              Alert.alert(
                'Finalizar Incrições',
                'Deseja encerrar as inscrições',
                [
                  { text: 'Cancelar', style: 'cancel' },
                  { text: 'Finalizar', style: 'destructive', onPress: handlePublish },
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