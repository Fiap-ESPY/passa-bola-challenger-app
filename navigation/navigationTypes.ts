import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  BottomTabs: undefined;
  NewScreen: undefined;
  Profile: undefined;
  MatchDetails: { matchId: number };
};

export type BottomTabParamList = {
  Home: undefined;
  News: undefined;
  Profile: undefined;
};

export type RootStackNavigationProps = StackNavigationProp<RootStackParamList>;
