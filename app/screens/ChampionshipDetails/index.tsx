import ActionButton from '@/components/buttons/actionbutton/ActionButton';
import { CHAMPIONSHIP_DATA } from '@/data/championshipData';
import { Championship } from '@/model/championship';
import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { useRoute } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Text,
} from 'react-native';

import { COLORS } from '@/theme/colors';
import { loadEvents } from '@/utils/events/eventsStore';
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
} from './styles';

const ChampionshipDetails = () => {
  const navigation = useNavigation<RootStackNavigationProps>();
  const router = useRouter();
  const route = useRoute();
  const { championshipId } = route.params as { championshipId: number };

  const [championship, setChampionship] = useState<Championship | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refId = useMemo(() => championshipId, [championshipId]);

  useEffect(() => {
    setIsLoading(true);

    const fetchChampionship = async () => {
      const storedEvents = await loadEvents();
      const eventsFromStorage = storedEvents || [];

      const allEventsMap = new Map<number, Championship>();

      for (const event of CHAMPIONSHIP_DATA) {
        allEventsMap.set(event.id, event);
      }

      for (const event of eventsFromStorage) {
        allEventsMap.set(event.id, event);
      }

      const combinedEvents = Array.from(allEventsMap.values());

      const foundChampionship = combinedEvents.find(c => c.id === refId);

      setChampionship(foundChampionship || null);
      setIsLoading(false);
    };

    fetchChampionship();
  }, [refId]);

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
        <ActivityIndicator size="large" color="#007bff" />
      </Container>
    );
  }

  if (!championship) {
    return (
      <Container>
        <Text>Campeonato não encontrado!</Text>
      </Container>
    );
  }

  return (
    <Container>
      {championship.image ? (
        <ImageBackground
          source={championship.image}
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

      {championship.type === 'campeonato' && (
        <Footer>
          <ActionButton
            label={'Chaveamento'}
            backgroundColor='#F576B1'
            onPress={() =>
              navigation.navigate('MatchSwitching', { matchId: refId })
            }
          />
          <ActionButton
            label={'Estatísticas'}
            backgroundColor='#B381C7'
            onPress={() =>
              navigation.navigate('ChampionshipStatistics', {
                championshipId: refId,
              })
            }
          />
        </Footer>
      )}
    </Container>
  );
};

export default ChampionshipDetails;
