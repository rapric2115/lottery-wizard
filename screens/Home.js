import React, { useContext } from 'react';
import { View, Text, StyleSheet, Touchable } from 'react-native';

import AdCard from '../components/adCard';
import Result from '../components/Resultados';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../Auth/AuthContext';

const HomeScreen = ({navigation}) => {
    const {advert1, advert1Name} = useContext(AuthContext);
    const today = new Date();
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dayOfWeek = daysOfWeek[today.getDay()]; // Get the day of the week name
    const dayOfMonth = today.getDate(); // Get the day of the month (1-31)
    const dayOfYear = today.getFullYear(); // Get the day of the year
    const monthOfYear = month[today.getMonth()]; // Get the month
    
    const formattedDate = `Hoy ${dayOfWeek} ${dayOfMonth} de ${monthOfYear} del ${dayOfYear}`;

    const handlePres = () => {
        navigation.navigate('Combinaciones')
    }

    return(
        <View>
            <Text style={styles.fecha}>{formattedDate}</Text>
            <AdCard iconName="bitcoin" title="Toma Acción Ahora, Gane hasta US$200 Dolares en Bitcoin. "/>
            <Result fecha='Miercoles 2, 2023'/>
            <TouchableOpacity onPress={handlePres} style={styles.btnGenerar}>
                <Text style={{color: 'snow', fontSize: 20, fontWeight: 'bold'}}>
                    Generar Numeros
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    fecha: {
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 16
    },
    btnGenerar: {
        alignSelf: 'center',
        backgroundColor: '#247ba0',
        padding: 20,
        borderRadius: 10,
    }
})

export default HomeScreen;