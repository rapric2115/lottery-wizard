import React, { useEffect } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { getVisitCount, incrementVisitCount } from '../utils/visitCounter';

import AdCard from '../components/adCard';
import Result from '../components/Resultados';
import ImageAds from '../components/ImageAd';


const HomeScreen = () => {
    const today = new Date();
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dayOfWeek = daysOfWeek[today.getDay()]; // Get the day of the week name
    const dayOfMonth = today.getDate(); // Get the day of the month (1-31)
    const dayOfYear = today.getFullYear(); // Get the day of the year
    const monthOfYear = month[today.getMonth()]; // Get the month
    
    const formattedDate = `Hoy ${dayOfWeek} ${dayOfMonth} de ${monthOfYear} del ${dayOfYear}`;

    useEffect(() => {
        // Increment visit count when the app loads
        incrementVisitCount();
      }, []);
    
      useEffect(() => {
        // Display visit count
        getVisitCount().then((count) => {
          console.log('Visit count:', count);
        });
      }, []);

   
    return(
        <ScrollView style={{flex: 1}}>
            <Text style={styles.fecha}>{formattedDate}</Text>
            <AdCard iconName="bitcoin" title="Toma Acción Ahora, Gane hasta US$200 Dolares en Bitcoin. "/>
            <ImageAds />
            {/* <CountdownTimer targetDate="November 1, 2023" /> */}
            <Result/>
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
    }
})

export default HomeScreen;