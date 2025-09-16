import { RootStackParamList } from '@/navigation/navigationTypes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { COLORS } from '@/theme/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

// SCREENS
import AdminHome from '../screens/Admin/home';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import MatchDetails from '../screens/MatchDetails';
import MatchSwitching from '../screens/MatchSwitching';
import NewsScreen from '../screens/News';
import NewsDetails from '../screens/NewsDetails';
import AdminCreateEvent from '../screens/Admin/createEvent';

export default function StackNavigation() {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={BottomTabsNavigation} />
      <Stack.Screen name="MatchDetails" component={MatchDetails} />
      <Stack.Screen name="NewsDetails" component={NewsDetails} />
      <Stack.Screen name="MatchSwitching" component={MatchSwitching} />
      <Stack.Screen name="AdminHome" component={AdminHome} />
      <Stack.Screen name="AdminNews" component={NewsScreen} />
      <Stack.Screen name="AdminEvents" component={HomeScreen} />
      <Stack.Screen name="AdminCreateEvent" component={AdminCreateEvent} />
    </Stack.Navigator>
  );
}

const BottomTabsNavigation = () => {
  const BottomTabs = createBottomTabNavigator();

  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
      borderWidth: 0,
      borderTopColor: 'white',
      backgroundColor: 'white',
      height: 70,
      elevation: 0,
    },
  };

  const focusedStyle = (isFocused: boolean) => {
    return isFocused ? COLORS.darkCharcoal : COLORS.lightGray;
  };

  return (
    <BottomTabs.Navigator screenOptions={screenOptions} initialRouteName="home">
      <BottomTabs.Screen
        name="news"
        component={NewsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="newspaper"
              size={27}
              color={focusedStyle(focused)}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home" size={27} color={focusedStyle(focused)} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="login"
        component={LoginScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="user" size={27} color={focusedStyle(focused)} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};
