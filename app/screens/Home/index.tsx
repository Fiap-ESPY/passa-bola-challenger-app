import headerImage from '@/assets/header-bg.jpg';
import logoImage from '@/assets/logo.png';
import MatchEventCard from '@/components/cards/matchevent/MatchEventCard';
import { MatchEvent } from '@/model/matchEvent';
import { ScrollView } from 'react-native';
import {
  CardContainer,
  Container,
  FilterContainer,
  FilterLabel,
  Header,
  Logo,
} from './styles';

export const MATCH_EVENTS: MatchEvent[] = [
  {
    id: 1,
    title: 'Futebol Amistoso - São Paulo x Rio de Janeiro',
    type: 'campeonato',
    address: 'Estádio do Morumbi, São Paulo, SP',
    dateAndHour: '2025-09-12T16:00:00',
    isAvailable: true,
  },
  {
    id: 2,
    title: 'Copa Passa Bola - 4ª edição',
    type: 'racha',
    address: 'Ginásio do Maracanãzinho, Rio de Janeiro, RJ',
    dateAndHour: '2025-09-13T19:30:00',
    isAvailable: true,
  },
  {
    id: 3,
    title: 'Copa Passa Bola - 2ª edição',
    type: 'racha',
    address: 'Ginásio do Maracanãzinho, Rio de Janeiro, RJ',
    dateAndHour: '2025-09-13T19:30:00',
    isAvailable: false,
  },
];

export default function Home() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Header source={headerImage} resizeMode="cover">
        <Logo source={logoImage} />
      </Header>
      <Container>
        <FilterContainer>
          <FilterLabel>Todos</FilterLabel>
          <FilterLabel>Próximos</FilterLabel>
          <FilterLabel>Anteriores</FilterLabel>
        </FilterContainer>
        <CardContainer>
          {MATCH_EVENTS.map((matchEvent, index) => (
            <MatchEventCard
              key={index}
              matchEvent={matchEvent}
              onClick={() => console.log('Cliquei')}
            />
          ))}
        </CardContainer>
      </Container>
    </ScrollView>
  );
}
