import { RoundType } from '@/model/enum/roundType';
import { Match } from '@/model/match';

export const BRACKET_EVENTS_DATA: Match[] = [
  // ---------------- OITAVAS DE FINAL ----------------
  {
    id: '1',
    round: RoundType.R16,
    label: 'Confronto 1',
    home: {
      id: '1',
      name: 'Enlace',
      logo: require('@/assets/teams/enlance_team.png'),
      score: 2,
    },
    away: {
      id: '2',
      name: 'Impacto',
      logo: require('@/assets/teams/impacto_team.png'),
      score: 3,
    },
  },
  {
    id: '2',
    round: RoundType.R16,
    label: 'Confronto 2',
    home: {
      id: '3',
      name: 'Arco',
      logo: require('@/assets/teams/arco_team.png'),
      score: 2,
    },
    away: {
      id: '4',
      name: 'Feras',
      logo: require('@/assets/teams/feras_team.png'),
      score: 4,
    },
  },
  {
    id: '3',
    round: RoundType.R16,
    label: 'Confronto 3',
    home: {
      id: '5',
      name: 'Tribalistas',
      logo: require('@/assets/teams/tribalistas_team.png'),
      score: 3,
    },
    away: {
      id: '6',
      name: 'Confraria',
      logo: require('@/assets/teams/confraria_team.png'),
      score: 1,
    },
  },
  {
    id: '4',
    round: RoundType.R16,
    label: 'Confronto 4',
    home: {
      id: '7',
      name: 'Legado',
      logo: require('@/assets/teams/legado_team.png'),
      score: 2,
    },
    away: {
      id: '8',
      name: 'Mancha',
      logo: require('@/assets/teams/mancha_team.png'),
      score: 0,
    },
  },
  {
    id: '5',
    round: RoundType.R16,
    label: 'Confronto 5',
    home: {
      id: '9',
      name: 'Pokas',
      logo: require('@/assets/teams/pokas_team.png'),
      score: 1,
    },
    away: {
      id: '10',
      name: 'Angelical',
      logo: require('@/assets/teams/angelical_team.png'),
      score: 3,
    },
  },
  {
    id: '6',
    round: RoundType.R16,
    label: 'Confronto 6',
    home: {
      id: '11',
      name: 'Guadalupe',
      logo: require('@/assets/teams/guadalupe_team.png'),
      score: 4,
    },
    away: {
      id: '12',
      name: 'Império',
      logo: require('@/assets/teams/imperio_team.png'),
      score: 2,
    },
  },
  {
    id: '7',
    round: RoundType.R16,
    label: 'Confronto 7',
    home: {
      id: '13',
      name: 'Podium',
      logo: require('@/assets/teams/podium_team.png'),
      score: 3,
    },
    away: {
      id: '14',
      name: 'Impacto',
      logo: require('@/assets/teams/impacto_team.png'),
      score: 1,
    },
  },
  {
    id: '8',
    round: RoundType.R16,
    label: 'Confronto 8',
    home: {
      id: '15',
      name: 'Pomo',
      logo: require('@/assets/teams/pomo_team.png'),
      score: 2,
    },
    away: {
      id: '16',
      name: 'Trevo',
      logo: require('@/assets/teams/trevo_logo.png'),
      score: 1,
    },
  },

  // ---------------- QUARTAS DE FINAL ----------------
  {
    id: '9',
    round: RoundType.QF,
    label: 'Confronto 1',
    home: {
      id: '4',
      name: 'Feras',
      logo: require('@/assets/teams/feras_team.png'),
      score: 3,
    },
    away: {
      id: '2',
      name: 'Impacto',
      logo: require('@/assets/teams/impacto_team.png'),
      score: 1,
    },
  },
  {
    id: '10',
    round: RoundType.QF,
    label: 'Confronto 2',
    home: {
      id: '5',
      name: 'Tribalistas',
      logo: require('@/assets/teams/tribalistas_team.png'),
      score: 2,
    },
    away: {
      id: '7',
      name: 'Legado',
      logo: require('@/assets/teams/legado_team.png'),
      score: 1,
    },
  },
  {
    id: '11',
    round: RoundType.QF,
    label: 'Confronto 3',
    home: {
      id: '10',
      name: 'Angelical',
      logo: require('@/assets/teams/angelical_team.png'),
      score: 2,
    },
    away: {
      id: '11',
      name: 'Guadalupe',
      logo: require('@/assets/teams/guadalupe_team.png'),
      score: 0,
    },
  },
  {
    id: '12',
    round: RoundType.QF,
    label: 'Confronto 4',
    home: {
      id: '13',
      name: 'Podium',
      logo: require('@/assets/teams/podium_team.png'),
      score: 3,
    },
    away: {
      id: '15',
      name: 'Pomo',
      logo: require('@/assets/teams/pomo_team.png'),
      score: 1,
    },
  },

  // ---------------- SEMIFINAL ----------------
  {
    id: '13',
    round: RoundType.SF,
    label: 'Confronto 1',
    home: {
      id: '4',
      name: 'Feras',
      logo: require('@/assets/teams/feras_team.png'),
      score: 2,
    },
    away: {
      id: '5',
      name: 'Tribalistas',
      logo: require('@/assets/teams/tribalistas_team.png'),
      score: 1,
    },
  },
  {
    id: '14',
    round: RoundType.SF,
    label: 'Confronto 2',
    home: {
      id: '10',
      name: 'Angelical',
      logo: require('@/assets/teams/angelical_team.png'),
      score: 3,
    },
    away: {
      id: '13',
      name: 'Podium',
      logo: require('@/assets/teams/podium_team.png'),
      score: 2,
    },
  },

  // ---------------- FINAL ----------------
  {
    id: '15',
    round: RoundType.F,
    label: 'Final',
    home: {
      id: '4',
      name: 'Feras',
      logo: require('@/assets/teams/feras_team.png'),
      score: 3,
    },
    away: {
      id: '10',
      name: 'Angelical',
      logo: require('@/assets/teams/angelical_team.png'),
      score: 2,
    },
  },
];
