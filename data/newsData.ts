import { NewsCategoryType } from '@/model/enum/newsCategoryType';
import { News } from '@/model/news';

export const NEWS_DATA: News[] = [
  {
    id: 1,
    title: 'Copa Passa a Bola — 4ª edição é confirmada com novidades',
    date: '2025-09-10',
    category: NewsCategoryType.PASSA_BOLA_NEWS,
    description:
      'A Copa Passa a Bola volta em sua 4ª edição com formato ampliado e etapas regionais, reunindo equipes femininas de diversas cidades.',
    image: require('@/assets/news/copa_passa_bola_2.jpg'),
    pill: 'Novidades',
    source: 'Passa a Bola Oficial',
    content: `A organização do Passa a Bola confirmou a realização da 4ª edição da Copa, competição que destaca o futebol feminino amador e semiprofissional. O torneio terá fases regionais e mata-mata final, com calendário distribuído aos fins de semana para facilitar a participação dos times.

As inscrições estarão abertas exclusivamente pelo aplicativo Passa a Bola, na aba “Campeonatos”. Cada equipe poderá registrar até 18 atletas, com exigência de documento oficial e termo de participação. A comissão reforça o compromisso com boas práticas de fair play e segurança das atletas.

Entre as novidades desta edição, o evento contará com súmula digital, checagem de elenco por QR Code, placar em tempo real e estatísticas de jogo dentro do app. Haverá ainda votação para “Craque da Rodada” e seleção da competição, incentivando o engajamento dos torcedores.

A premiação inclui troféu, medalhas e kits esportivos para as equipes finalistas. A fase decisiva terá transmissão ao vivo nas redes oficiais do Passa Bola, com cobertura de bastidores e entrevistas. Mais detalhes de regulamento e tabela serão divulgados no aplicativo ao longo das próximas semanas.`,
  },
 {
  id: 2,
  title: 'Alexia Russo ganha mural em clube que a revelou',
  date: '2025-09-12',
  category: NewsCategoryType.GENERAL,
  pill: 'Eternizada',
  description: 'A atacante inglesa Alexia Russo foi homenageada com um mural no clube onde iniciou sua carreira, reconhecendo sua trajetória de sucesso no futebol feminino.',
  image: require('@/assets/news/alexia_russo.jpg'),
  source: 'ESPN Brasil',
  content: `O clube que revelou Alexia Russo decidiu eternizar a jogadora com um mural em sua sede. A atacante, hoje destaque no cenário internacional, iniciou sua trajetória no futebol de base da equipe e rapidamente se destacou pela habilidade e liderança dentro de campo.

A homenagem busca inspirar futuras gerações de atletas, reforçando a importância da formação e do incentivo ao futebol feminino desde as categorias mais jovens. Russo agradeceu emocionada a lembrança e afirmou que "é uma honra voltar às origens e ver sua história registrada no local onde tudo começou".`
},

  {
    id: 3,
    title: 'Última rodada do Brasileirão',
    date: '2025-05-10',
    category: NewsCategoryType.BRASILEIRAO_NEWS,
    pill: 'Reta final',
    description:
      'Oito jogos da 15ª rodada aconteceram simultaneamente nesta quarta-feira (18) encerrando a primeira fase da competição.',
    image: require('@/assets/news/brasileirao.png'),
    source: 'Globo Esporte',
    content: `A 15ª rodada do Campeonato Brasileiro chegou ao fim com muita emoção e mudanças significativas na tabela. Times que brigam pelo título conquistaram vitórias importantes, enquanto aqueles que lutam contra o rebaixamento tiveram que encarar resultados amargos.

O destaque da rodada ficou para a vitória do líder sobre um dos principais concorrentes, aumentando ainda mais sua vantagem na ponta. Em contrapartida, a disputa pela última vaga no G6 segue acirrada, com três equipes separadas por apenas dois pontos.

A próxima rodada promete confrontos diretos e pode definir novos rumos na competição. Os torcedores aguardam ansiosos por mais uma sequência de jogos decisivos.`,
  },
  {
    id: 4,
    title: 'Kin Saito e a Copa no Brasil',
    date: '2025-06-05',
    category: NewsCategoryType.GENERAL,
    pill: 'Curiosidade',
    description:
      'Vocês sabem quais são as exigências para que os times possam participar? É necessário atender a critérios técnicos, manter a documentação regularizada e cumprir os prazos definidos pela organização.',
    image: require('@/assets/news/kin_saito.jpg'),
    source: 'FIFA News',
    content: `Kin Saito, diretora de competições da FIFA, esteve no Brasil nesta semana para acompanhar os preparativos 
    para a próxima edição da Copa. Durante entrevista coletiva, ela destacou os avanços nas obras dos estádios, 
    na estrutura logística e no planejamento de segurança.

    Além disso, Kin reforçou a importância da regularização documental dos clubes participantes e do cumprimento 
    rigoroso dos prazos definidos pela organização. Segundo ela, a integração entre CBF, governo e entidades 
    internacionais tem sido essencial para garantir que o Brasil esteja pronto para receber um dos maiores 
    eventos esportivos do planeta.

    Os próximos meses serão decisivos para ajustes finais, e os torcedores já começam a sentir a atmosfera da competição.`,
  },
  {
    id: 5,
    title: 'Seleção feminina se prepara para amistosos',
    date: '2025-08-15',
    category: NewsCategoryType.GENERAL,
    pill: 'Amistoso',
    description:
      'A seleção brasileira feminina inicia nesta semana a preparação para uma série de amistosos internacionais. A comissão técnica promete testar novas formações e dar oportunidade para jovens talentos se destacarem.',
    image: require('@/assets/news/selecao_brasileira.jpg'),
    source: 'CBF Oficial',
    content: `A Seleção Brasileira Feminina iniciou, nesta segunda-feira, a fase final de preparação para a série de 
amistosos internacionais que acontecerão neste mês. A técnica da equipe anunciou que pretende testar novas 
formações táticas e dar espaço para jogadoras jovens que vêm se destacando nos campeonatos nacionais.

Os treinos têm foco na compactação defensiva, na construção rápida de jogadas e na melhora da finalização. 
A equipe também trabalhará situações de bola parada, uma das maiores preocupações para os próximos desafios.

O primeiro amistoso será contra os Estados Unidos, atuais campeãs mundiais, seguido por uma partida contra a 
Alemanha. Os jogos servirão como termômetro para avaliar o desempenho da equipe antes do início das eliminatórias 
da próxima Copa do Mundo.`,
  },
];
