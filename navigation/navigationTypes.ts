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
  AdminCreateNews: { newsId?: number | null };
  OrganizationRegisterStep1: undefined;
  OrganizationRegisterStep2: undefined;
  OrganizationRegisterStep3: undefined;
  OrganizationRegisterStep4: undefined;
  OrganizationRegisterStep5: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  News: undefined;
  Login: undefined;
};

export type RootStackNavigationProps = StackNavigationProp<RootStackParamList>;
