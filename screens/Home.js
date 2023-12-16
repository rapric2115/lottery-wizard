import React, { useContext } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import AdCard from '../components/adCard';
import Result from '../components/Resultados';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../Auth/AuthContext';
import CountdownTimer from '../components/countDown';


const HomeScreen = ({navigation}) => {
    const today = new Date();
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dayOfWeek = daysOfWeek[today.getDay()]; // Get the day of the week name
    const dayOfMonth = today.getDate(); // Get the day of the month (1-31)
    const dayOfYear = today.getFullYear(); // Get the day of the year
    const monthOfYear = month[today.getMonth()]; // Get the month
    
    const formattedDate = `Hoy ${dayOfWeek} ${dayOfMonth} de ${monthOfYear} del ${dayOfYear}`;

    const handlePressNavigation = () => {
        navigation.navigate('Combinaciones')
    }

    const handlePressNavigationLoteka = () => {
        navigation.navigate('Loteka')
    }

    return(
        <ScrollView style={{flex: 1}}>
            <Text style={styles.fecha}>{formattedDate}</Text>
            <AdCard iconName="bitcoin" title="Toma Acción Ahora, Gane hasta US$200 Dolares en Bitcoin. "/>
            {/* <CountdownTimer targetDate="November 1, 2023" /> */}
            <Result/>
            <LinearGradient
                colors={['#0065B8','#004E8F']}
                 start={[0.01, 0.01]}
                 style={styles.btnGenerar} >
                <TouchableOpacity onPress={handlePressNavigation}>
                    <Text style={{color: 'snow', fontSize: 20, fontWeight: 'bold'}}>
                        Combinaciones Leidsa
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
                colors={['#0065B8','#004E8F']}
                 start={[0.01, 0.01]}
                 style={styles.btnGenerar} >
                <TouchableOpacity onPress={handlePressNavigationLoteka}>
                    <Text style={{color: 'snow', fontSize: 20, fontWeight: 'bold'}}>
                        Combinaciones Loteka
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    fecha: {
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#224357'
    },
    btnGenerar: {
        alignSelf: 'center',
        padding: 20,
        borderRadius: 10,
        marginBottom: 40
    }
})

export default HomeScreen;