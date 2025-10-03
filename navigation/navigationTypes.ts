import { Organization } from '@/model/organization';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  BottomTabs: { screen: string };
  NewScreen: undefined;
  ChampionshipDetails: { championshipId: number, isAdmin: boolean };
  ChampionshipStatistics: { championshipId: number };
  NewsDetails: { newsId: number };
  MatchSwitching: { matchId: number };
  MatchStatistics: { matchId: number };
  AdminHome: undefined;
  AdminNews: undefined;
  AdminEvents: undefined;
  AdminCreateEvent: { championshipId?: number | null };
  AdminCreateNews: { newsId?: number | null };
  OrganizationRegisterStep1: Partial<Organization> | undefined;
  OrganizationRegisterStep2: Partial<Organization> | undefined;
  OrganizationRegisterStep3: Partial<Organization> | undefined;
  OrganizationRegisterStep4: Partial<Organization> | undefined;
  OrganizationRegisterStep5: Partial<Organization> | undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  News: undefined;
  Login: undefined;
};

export type RootStackNavigationProps = StackNavigationProp<RootStackParamList>;
