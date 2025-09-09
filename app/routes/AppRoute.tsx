import { RootStackParamList } from '@/navigation/navigationTypes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MatchDetails from '../screens/MatchDetails';

// SCREENS
import { COLORS } from '@/theme/colors';
import HomeScreen from '../screens/Home';
import NewsScreen from '../screens/News';
import ProfileScreen from '../screens/Profile';

export default function StackNavigation() {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={BottomTabsNavigation} />
      <Stack.Screen name="MatchDetails" component={MatchDetails} />
    </Stack.Navigator>
  );
}

function BottomTabsNavigation() {
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
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="user" size={27} color={focusedStyle(focused)} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}
