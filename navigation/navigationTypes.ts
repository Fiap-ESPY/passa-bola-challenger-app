import { Organization } from '@/model/organization';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  BottomTabs: { screen: string };
  NewScreen: undefined;
  ChampionshipDetails: { championshipId: string };
  ChampionshipStatistics: { championshipId: string };
  NewsDetails: { newsId: string };
  MatchSwitching: { championshipId: string };
  MatchStatistics: { matchId: string, championshipId: string };
  AdminHome: undefined;
  AdminNews: undefined;
  AdminEvents: undefined;
  AdminCreateEvent: { championshipId?: string | null };
  AdminCreateNews: { newsId?: string | null };
  OrganizationRegisterStep1: Partial<Organization> | undefined;
  OrganizationRegisterStep2: Partial<Organization> | undefined;
  OrganizationRegisterStep3: Partial<Organization> | undefined;
  OrganizationRegisterStep4: Partial<Organization> | undefined;
  OrganizationRegisterStep5: Partial<Organization> | undefined;
  OrganizationProfile: { organizationId: string };
};

export type BottomTabParamList = {
  Home: undefined;
  News: undefined;
  Login: undefined;
};

export type RootStackNavigationProps = StackNavigationProp<RootStackParamList>;
