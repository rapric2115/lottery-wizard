import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Octicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../Auth/AuthContext';

import GeneradorFormula from '../screens/Generador';
import MembershipPrice from '../screens/memberShip/membershipPrice';
import GeneradorAI from '../screens/generadorAI';
import GeneradorFormulaLoteka from '../screens/generadorLoteka';
import AIGen from '../screens/aiGenerator';
import Charts from '../screens/Analitics';

import HomeScreen from '../screens/Home';
import MyAccount from '../screens/Perfil';
import Register from '../screens/register';
import Login from '../screens/login';

import Brain from '../assets/Brain-modified.svg';
import UProfile from '../assets/user profile-modified.svg';
import Home from '../assets/home-modified.svg';
import Charrts from '../assets/chart.svg';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const TabNavigator = () => {
    const commonHeaderOptions = {
        headerBackButtonMenuEnabled: true,
    }
    return(
        <Tab.Navigator  
            initialRouteName='Home'
            screenOptions={{
                tabBarActiveTintColor: '#144e6b'
            }}>               
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: () => (
                            // <Octicons name="number" size={24} color="black" />
                            <Home width={30} height={30} fill="blue" />
                            ),
                        title: 'Resultados'
                        }} 
                />
                 <Tab.Screen 
                    name=" AI Combinaciones"
                    component={AIGen}
                    options={{
                        tabBarLabel: 'AI Combinaciones',
                        tabBarIcon: () => (
                            // <MaterialIcons name="bolt" size={24} color="black" />
                            <Brain width={30} height={30} fill="blue" />
                            )
                        }}
                />
                 <Tab.Screen 
                    name="Charts"
                    component={Charts}
                    options={{
                        tabBarLabel: 'Analitica',
                        tabBarIcon: () => (
                            // <FontAwesome5 name="user-circle" size={24} color="black" />
                            <Charrts width={20} height={20} fill="black" />
                        )                    
                    }}
                /> 
                <Tab.Screen 
                    name="Profile"
                    component={MyAccount}
                    options={{
                        tabBarLabel: 'Mi Perfil',
                        tabBarIcon: () => (
                            // <FontAwesome5 name="user-circle" size={24} color="black" />
                            <UProfile width={30} height={30} fill="blue" />
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
                    <Stack.Group>
                        <Stack.Screen name="Tabs" component={TabNavigator} options={{headerShown: false}}/> 
                        <Stack.Screen name="Precios" component={MembershipPrice} options={{headerShown: true, title: 'Membresias', presentation: 'modal'}} />
                        <Stack.Screen name="genAI" component={GeneradorAI} options={{headerShown: true, title: 'AI', presentation: 'modal'}} />
                        <Stack.Screen name="Loteka" component={GeneradorFormulaLoteka} options={{headerShown: true, title: 'Combinaciones Loteka'}} />
                        <Stack.Screen name="Leidsa" component={GeneradorFormula} options={{headerShown: true, title: 'Combinaciones Leidsa'}} />
                    </Stack.Group>
                    
                    ): (
                        <Stack.Group>
                            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                            <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
                        </Stack.Group>
                    )}
                {/* <Stack.Screen name="Generador" component={GeneradorFormula} />               */}
            </Stack.Navigator>
        </NavigationContainer>
   )
}

export default AppNavigator;