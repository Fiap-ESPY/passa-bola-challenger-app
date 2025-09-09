import brasileiraoImage from '@/assets/news/brasileirao.png';
import kinSaitoImage from '@/assets/news/kin_saito.png';
import selecaoBrasileiraImage from '@/assets/news/selecao_brasileira.jpg';
import { News } from '@/model/news';

export const NEWS_DATA: News[] = [
  {
    id: 1,
    title: 'Última rodada do brasileirão',
    date: new Date('2025-05-10'),
    description:
      'Oito jogos da 15ª rodada aconteceram simultaneamente nesta quarta-feira, agitando a tabela e deixando a disputa ainda mais acirrada. Com resultados surpreendentes e partidas equilibradas, alguns times conseguiram se aproximar dos líderes, enquanto outros se distanciaram da zona de classificação.',
    image: brasileiraoImage,
  },
  {
    id: 2,
    title: 'Kin Saito e a Copa no brasil',
    date: new Date('2025-06-05'),
    description:
      'Vocês sabem quais são as exigências para que os times possam participar? É necessário atender a critérios técnicos, manter a documentação regularizada e cumprir os prazos definidos pela organização.',
    image: kinSaitoImage,
  },
  {
    id: 3,
    title: 'Seleção feminina se prepara para amistosos',
    date: new Date('2025-09-15'),
    description:
      'A seleção brasileira feminina inicia nesta semana a preparação para uma série de amistosos internacionais. A comissão técnica promete testar novas formações e dar oportunidade para jovens talentos se destacarem.',
    image: selecaoBrasileiraImage,
  },
];
