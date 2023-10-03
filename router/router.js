import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Octicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../Auth/AuthContext';

import GeneradorFormula from '../screens/Generador';

import HomeScreen from '../screens/Home';
import MyAccount from '../screens/Perfil';
import Register from '../screens/register';
import Login from '../screens/login';



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
                            ),
                        title: 'Resultados'
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
    const {currentUser} = useContext(AuthContext);
   return(
        <NavigationContainer>
            <Stack.Navigator>
                {currentUser ? (
                    <Stack.Screen name="Tabs" component={TabNavigator} options={{headerShown: false}}/> 
                    
                    ): (
                        <Stack.Group>
                            <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
                            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                        </Stack.Group>
                    )}
                {/* <Stack.Screen name="Generador" component={GeneradorFormula} />               */}
            </Stack.Navigator>
        </NavigationContainer>
   )
}

export default AppNavigator;