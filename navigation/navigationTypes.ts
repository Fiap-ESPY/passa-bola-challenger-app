import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  BottomTabs: { screen: string };
  NewScreen: undefined;
  ChampionshipDetails: { championshipId: number };
  ChampionshipStatistics: { championshipId: number };
  NewsDetails: { newsId: number };
  MatchSwitching: { matchId: number };
  MatchStatistics: { matchId: number };
  AdminHome: undefined;
  AdminNews: undefined;
  AdminEvents: undefined;
  AdminCreateEvent: { championshipId?: number | null };
};

export type BottomTabParamList = {
  Home: undefined;
  News: undefined;
  Login: undefined;
};

export type RootStackNavigationProps = StackNavigationProp<RootStackParamList>;
