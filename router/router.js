import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Octicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

import GeneradorFormula from '../screens/Generador';

import HomeScreen from '../screens/Home';
import MyAccount from '../screens/Perfil';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const TabNavigator = () => {
    return(
        <Tab.Navigator  
            initialRouteName='Home'
            screenOptions={{
                tabBarActiveTintColor: '#e91e63'
            }}>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: () => (
                            <Octicons name="number" size={24} color="black" />
                            )
                        }} 
                />
                 <Tab.Screen 
                    name="Combinaciones"
                    component={GeneradorFormula}
                    options={{
                        tabBarLabel: 'Combinaciones',
                        tabBarIcon: () => (
                            <MaterialIcons name="bolt" size={24} color="black" />
                            )
                        }}
                />
                <Tab.Screen 
                    name="Profile"
                    component={MyAccount}
                    options={{
                        tabBarLabel: 'Mi Perfil',
                        tabBarIcon: () => (
                            <FontAwesome5 name="user-circle" size={24} color="black" />
                        )
                    }}
                />
            </Tab.Navigator>
    )
}

const AppNavigator = () => {
   return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Tabs" component={TabNavigator} options={{headerShown: false}}/> 
                {/* <Stack.Screen name="Generador" component={GeneradorFormula} />               */}
            </Stack.Navigator>
        </NavigationContainer>
   )
}

export default AppNavigator;