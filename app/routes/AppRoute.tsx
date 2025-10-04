import { RootStackParamList } from '@/navigation/navigationTypes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { COLORS } from '@/theme/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import AdminCreateEvent from '../screens/Admin/createEvent';
import AdminCreateNews from '../screens/Admin/createNews';
import AdminHome from '../screens/Admin/home';
import ChampionshipDetails from '../screens/ChampionshipDetails';
import Home from '../screens/Home';
import Login from '../screens/Login';
import MatchStatistics from '../screens/MatchStatistics';
import MatchSwitching from '../screens/MatchSwitching';
import News from '../screens/News';
import NewsDetails from '../screens/NewsDetails';
import ChampionshipStatistics from '../screens/ChampionshipStatistics';
import OrganizationRegisterStep1 from '../screens/Organization/register/step-1';
import OrganizationRegisterStep2 from '../screens/Organization/register/step-2';
import OrganizationRegisterStep3 from '../screens/Organization/register/step-3';
import OrganizationRegisterStep4 from '../screens/Organization/register/step-4';

export default function StackNavigation() {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={BottomTabsNavigation} />
       <Stack.Screen
        name="ChampionshipDetails"
        component={ChampionshipDetails}
      />
      
      <Stack.Screen
        name="ChampionshipStatistics"
        component={ChampionshipStatistics}
      />
      <Stack.Screen name="NewsDetails" component={NewsDetails} />
      <Stack.Screen name="MatchSwitching" component={MatchSwitching} />
     
      <Stack.Screen name="AdminHome" component={AdminHome} />
      <Stack.Screen name="AdminCreateEvent" component={AdminCreateEvent} />
      <Stack.Screen name="AdminCreateNews" component={AdminCreateNews} />
      <Stack.Screen name="MatchStatistics" component={MatchStatistics} />
      <Stack.Screen name="OrganizationRegisterStep1" component={OrganizationRegisterStep1} />
      <Stack.Screen name="OrganizationRegisterStep2" component={OrganizationRegisterStep2} /> 
      <Stack.Screen name="OrganizationRegisterStep3" component={OrganizationRegisterStep3} />
      <Stack.Screen name="OrganizationRegisterStep4" component={OrganizationRegisterStep4} />
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
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
    tabBarItemStyle: {
      marginVertical: 10
    },
  };

  const focusedStyle = (isFocused: boolean) => {
    return isFocused ? COLORS.darkCharcoal : COLORS.lightGray;
  };

  return (
    <BottomTabs.Navigator screenOptions={screenOptions} initialRouteName="home">
      <BottomTabs.Screen
        name="news"
        component={News}
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
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home" size={27} color={focusedStyle(focused)} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="login"
        component={Login}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="user" size={27} color={focusedStyle(focused)} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};


