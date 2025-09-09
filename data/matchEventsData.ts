import type { MatchEvent } from '@/model/matchEvent';

export const MATCH_EVENTS_DATA: MatchEvent[] = [
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
