import type { Championship } from '@/model/championship';
import { BRACKET_EVENTS_DATA } from './brackEventData';

export const CHAMPIONSHIP_DATA: Championship[] = [
  {
    id: 1,
    title: 'Futebol Amistoso - São Paulo x Rio de Janeiro',
    type: 'racha',
    image: require('@/assets/events/morumbis.jpg'),
    address: 'Estádio do Morumbi, São Paulo, SP',
    dateAndHour: '2025-10-12T16:00:00Z',
    isAvailable: true,
    description:
      'Um grande encontro amistoso para celebrar o esporte. Junte sua galera e venha participar deste racha histórico entre as duas maiores cidades do país. O foco é a diversão e a confraternização.',
    rules: [
      {
        title: 'Regras do Racha',
        items: [
          'Times formados na hora.',
          'Partidas de 20 minutos ou até 2 gols.',
          'Fair play é obrigatório. Respeito acima de tudo.',
        ],
      },
    ],
    brackEvents: [],
    tournamentWinner: null,
  },
  {
    id: 2,
    title: 'Copa Passa a Bola - 4ª edição',
    type: 'campeonato',
    image: require('@/assets/events/copa_passa_bola_3.jpg'),
    address: 'Ginásio do Maracanãzinho, Rio de Janeiro, RJ',
    dateAndHour: '2025-09-08T09:00:00Z',
    isAvailable: true,
    description:
      'O Campeonato de Futebol Feminino Amador reúne 12 times compostos por 10 jogadoras cada, promovendo a integração, o espírito esportivo e o incentivo à prática do futebol entre mulheres. Com partidas dinâmicas e disputas acirradas, o torneio valoriza o talento feminino no esporte.',
    rules: [
      {
        title: 'Composição dos Times',
        items: [
          'Cada equipe poderá inscrever até 10 jogadoras.',
          'Em campo, cada time jogará com 7 jogadoras (6 na linha + 1 goleira).',
          'Substituições são ilimitadas, mas devem ocorrer com autorização da arbitragem.',
        ],
      },
      {
        title: 'Duração das Partidas',
        items: [
          'Cada partida terá 2 tempos de 20 minutos, com 5 minutos de intervalo.',
          'Em caso de empate no mata-mata, a decisão será por pênaltis (3 cobranças por time).',
        ],
      },
      {
        title: 'Sistema de Disputa: Mata-Mata',
        items: [
          'Participam 12 equipes em sistema eliminatório simples.',
          'Quartas de Final -> Semifinais -> Final.',
        ],
      },
    ],
    brackEvents: BRACKET_EVENTS_DATA,
    tournamentWinner: null,
  },
  {
    id: 3,
    title: 'Copa Passa a Bola - 2ª edição',
    type: 'campeonato',
    address: 'Ginásio do Ibirapuera, São Paulo, SP',
    dateAndHour: '2024-05-20T19:30:00Z',
    isAvailable: false,
    image: require('@/assets/news/copa_passa_bola_1.png'),
    description:
      'A segunda edição da Copa Passa a Bola marcou o início de uma tradição no futebol feminino amador. O evento foi um sucesso, reunindo equipes talentosas em uma disputa emocionante que culminou com a vitória do time Feras.',
    rules: [
      {
        title: 'Composição dos Times',
        items: [
          'Inscrição de até 10 jogadoras por equipe.',
          '7 jogadoras em campo (6 na linha + 1 goleira).',
        ],
      },
      {
        title: 'Duração das Partidas',
        items: [
          'Partidas com 2 tempos de 20 minutos.',
          'Intervalo de 5 minutos.',
        ],
      },
    ],
    brackEvents: BRACKET_EVENTS_DATA,
    tournamentWinner: {
      id: 4,
      name: 'Feras',
      logo: require('@/assets/teams/feras_team.png'),
    },
  },
];
