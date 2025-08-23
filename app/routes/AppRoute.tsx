
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// SCREENS
import HomeScreen from '../screens/Home';
import NewsScreen from '../screens/News';
import ProfileScreen from '../screens/Profile';


import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';



export default function StackNavigation(){

    const Stack = createStackNavigator()

    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="BottomTabs" component={BottomTabsNavigation} />
        </Stack.Navigator>

    )
}

function BottomTabsNavigation(){

    const BottomTabs = createBottomTabNavigator()

    const screenOptions = {
       tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle:{
            borderWidth: 0,
            borderTopColor:'white', 
            backgroundColor:'white',
            height: 55,
            elevation: 0
        },
    }

    return(
        <BottomTabs.Navigator screenOptions={screenOptions}>
            <BottomTabs.Screen 
                name="news"
                component={NewsScreen}
                options={{
                    tabBarIcon:
                        ({focused}) => 
                            <Ionicons 
                                name="newspaper" 
                                size={24}
                                color={focused ? "#1E1E1E" : "#E4E4E4"} 
                            />
                }}
            />
            <BottomTabs.Screen 
                name="home" 
                component={HomeScreen}
                options={{
                    tabBarIcon: 
                        ({focused}) => 
                            <Ionicons 
                                name="home" 
                                size={24} 
                                color={focused ? "#1E1E1E" : "#E4E4E4"} 
                            />
                }}
            />
            <BottomTabs.Screen 
                name="profile" 
                component={ProfileScreen}
                options={{
                    tabBarIcon:
                        ({focused}) => 
                            <FontAwesome 
                                name="user" 
                                size={24}  
                                color={focused ? "#1E1E1E" : "#E4E4E4"} 
                            />
                }}
            />
        </BottomTabs.Navigator>
    )
}