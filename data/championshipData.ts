import type { Championship } from '@/model/championship';
import { BRACKET_EVENTS_DATA } from './brackEventData';

export const CHAMPIONSHIP_DATA: Championship[] = [
  {
    id: 1,
    title: 'Futebol Amistoso - São Paulo x Rio de Janeiro',
    type: 'racha',
    address: 'Estádio do Morumbi, São Paulo, SP',
    dateAndHour: '2025-09-12T16:00:00',
    isAvailable: true,
    brackEvents: BRACKET_EVENTS_DATA,
    image: require('@/assets/events/morumbis.jpg'),
    tournamentWinner: {
      id: 4,
      name: 'Feras',
      logo: require('@/assets/teams/feras_team.png'),
    },
  },
  {
    id: 2,
    title: 'Copa Passa a Bola - 4ª edição',
    type: 'campeonato',
    address: 'Ginásio do Maracanãzinho, Rio de Janeiro, RJ',
    dateAndHour: '2025-09-13T19:30:00',
    isAvailable: true,
    brackEvents: BRACKET_EVENTS_DATA,
    image: require('@/assets/events/copa_passa_bola_3.jpg'),
    tournamentWinner: {
      id: 4,
      name: 'Feras',
      logo: require('@/assets/teams/feras_team.png'),
    },
  },
  {
    id: 3,
    title: 'Copa Passa a Bola - 2ª edição',
    type: 'campeonato',
    address: 'Ginásio do Maracanãzinho, Rio de Janeiro, RJ',
    dateAndHour: '2025-09-13T19:30:00',
    isAvailable: false,
    brackEvents: BRACKET_EVENTS_DATA,
    image: require('@/assets/news/copa_passa_bola_1.png'),
    tournamentWinner: {
      id: 4,
      name: 'Feras',
      logo: require('@/assets/teams/feras_team.png'),
    },
  },
];
