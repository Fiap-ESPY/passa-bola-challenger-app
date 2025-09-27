import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  BottomTabs: { screen: string };
  NewScreen: undefined;
  MatchDetails: { matchId: number };
  NewsDetails: { newsId: number };
  MatchSwitching: { matchId: number };
  MatchStatistics: { matchId: number };
  AdminHome: undefined;
  AdminNews: undefined;
  AdminEvents: undefined;
  AdminCreateEvent: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  News: undefined;
  Login: undefined;
};

export type RootStackNavigationProps = StackNavigationProp<RootStackParamList>;
