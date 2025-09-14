import ActionButton from '@/components/buttons/actionbutton/ActionButton';
import { RootStackNavigationProps } from '@/navigation/navigationTypes';
import { COLORS } from '@/theme/colors';
import { useRoute } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Alert, ScrollView } from 'react-native';
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

const MatchDetails = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  const router = useRouter();
  const route = useRoute();
  const { matchId } = route.params as { matchId: number };

  const refId = useMemo(() => matchId, [matchId]);

  return (
    <Container>
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

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
        <Section>
          <SectionTitle>Copa Passa a Bola - 4ª edição</SectionTitle>
          <SectionText>📍 Rua Passa Bola, nº 123 – Centro, SP</SectionText>
          <SectionText>📅 Domingo 01/06 - 12:00h</SectionText>
        </Section>

        <Section>
          <SectionTitle>Descrição do Evento</SectionTitle>
          <SectionText>
            O Campeonato de Futebol Feminino Amador reúne 12 times compostos por
            10 jogadoras cada, promovendo a integração, o espírito esportivo e o
            incentivo à prática do futebol entre mulheres. Com partidas
            dinâmicas e disputas acirradas, o torneio valoriza o talento
            feminino no esporte e proporciona um ambiente de inclusão, respeito
            e competitividade saudável.
          </SectionText>
        </Section>

        <Section>
          <SectionTitle>Regras</SectionTitle>

          <SectionText style={{ fontWeight: '700', marginTop: 8 }}>
            Composição dos Times
          </SectionText>
          <RuleList>
            <RuleItem>
              • Cada equipe poderá inscrever até 10 jogadoras.
            </RuleItem>
            <RuleItem>
              • Em campo, cada time jogará com 7 jogadoras (6 na linha + 1
              goleira).
            </RuleItem>
            <RuleItem>
              • Substituições são ilimitadas, mas devem ocorrer com autorização
              da arbitragem e sem paralisação do jogo.
            </RuleItem>
          </RuleList>

          <SectionText style={{ fontWeight: '700', marginTop: 16 }}>
            Duração das Partidas
          </SectionText>
          <RuleList>
            <RuleItem>
              • Cada partida terá 2 tempos de 20 minutos, com 5 minutos de
              intervalo.
            </RuleItem>
            <RuleItem>• Em caso de empate no tempo regulamentar:</RuleItem>
          </RuleList>
          <RuleList style={{ marginLeft: 12 }}>
            <RuleItem>
              ◦ Prorrogação de 2 tempos de 5 minutos (sem intervalo).
            </RuleItem>
            <RuleItem>
              ◦ Persistindo o empate, disputa por pênaltis (3 cobranças por
              time).
            </RuleItem>
          </RuleList>

          <SectionText style={{ fontWeight: '700', marginTop: 16 }}>
            Sistema de Disputa: Mata-Mata
          </SectionText>
          <RuleList>
            <RuleItem>
              • Participam 12 equipes em sistema eliminatório simples.
            </RuleItem>
            <RuleItem>
              • As 4 equipes melhores ranqueadas (por sorteio ou critérios
              definidos) entram diretamente nas quartas de final.
            </RuleItem>
            <RuleItem>
              • As outras 8 equipes disputam a fase preliminar (oitavas de
              final):
            </RuleItem>
          </RuleList>
          <RuleList style={{ marginLeft: 12 }}>
            <RuleItem>
              ◦ 4 confrontos: vencedores avançam para as quartas.
            </RuleItem>
          </RuleList>
          <RuleList>
            <RuleItem>• A sequência do torneio:</RuleItem>
          </RuleList>
          <RuleList style={{ marginLeft: 12 }}>
            <RuleItem>◦ Oitavas de Final – 8 times → 4 classificados</RuleItem>
            <RuleItem>
              ◦ Quartas de Final – 4 classificados + 4 cabeças de chave
            </RuleItem>
            <RuleItem>◦ Semifinais – 4 times</RuleItem>
            <RuleItem>◦ Final e disputa de 3º lugar</RuleItem>
          </RuleList>

          <SectionText style={{ fontWeight: '700', marginTop: 16 }}>
            Regras Gerais
          </SectionText>
          <RuleList>
            <RuleItem>
              • Cartão amarelo: jogadora fica fora por 2 minutos (sem
              substituição).
            </RuleItem>
            <RuleItem>
              • Cartão vermelho: expulsão direta e desfalque para o jogo
              seguinte.
            </RuleItem>
            <RuleItem>
              • Tolerância de 10 minutos para início da partida; após isso, WO.
            </RuleItem>
          </RuleList>
        </Section>
      </ScrollView>

      <Footer>
        <ActionButton
          label={'Chaveamento'}
          onPress={() =>
            navigation.navigate('MatchSwitching', { matchId: refId })
          }
        />
        <ActionButton
          label={'Estatísticas'}
          onPress={() => Alert.alert("Página em desenvolvimento...")}
        />
      </Footer>
    </Container>
  );
};

export default MatchDetails;
