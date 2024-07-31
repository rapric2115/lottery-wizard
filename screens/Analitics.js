import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, set } from 'firebase/database';
import { firebaseConfig } from '../firebaseConfig';


const Charts = () => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    const [ hotNumbers, setHotNumbers ] = useState(0);
    const [ estadistics, setEstadistics ] = useState(200);


    const LeidsaRef = ref(db);
   
    useEffect(() => {
      getData()
    }, [])
    
    const getData = () => {  
          get(child(LeidsaRef, `estadisticas`)).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              // Extract values into an array
                // setOne(data); 
                // Convert the object into an array of entries and set it to state
                const entries = Object.entries(data).map(([key, value]) => ({
                    key,
                    value,
                }));
                setEstadistics(entries);            
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error('error de firebase', error);
          });  
          get(child(LeidsaRef, `hotNumbers`)).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();              
                setHotNumbers(data);         
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error('error de firebase', error);
          });    
      }

    const barData = estadistics.length > 0 ? [
        {value: estadistics[29]?.value || 200, label: '1', frontColor: '#177AD5'},
        {value: estadistics[10]?.value || 200, label: '2'},
        {value: estadistics[28]?.value || 200, label: '3', frontColor: '#177AD5'},
        {value: estadistics[3]?.value || 200, label: '4'},
        {value: estadistics[1]?.value || 200, label: '5', frontColor: '#177AD5'},
        {value: estadistics[15]?.value || 200, label: '6'},
        {value: estadistics[16]?.value || 200, label: '7', frontColor: '#177AD5'}
    ]: [];

    const barDataTwo = [
        {value: estadistics[12]?.value || 200, label: '8'},
        {value: estadistics[11]?.value || 200, label: '9', fontColor: '#177AD5'},
        {value: estadistics[4]?.value || 200, label: '10'},
        {value: estadistics[13]?.value || 200, label: '11', fontColor: '#177AD5'},
        {value: estadistics[9]?.value || 200, label: '12'},
        {value: estadistics[17]?.value || 200, label: '13', fontColor: '#177AD5'},
        {value: estadistics[0]?.value || 200, label: '14'}
    ]

    const barDataThree = [
        {value: estadistics[14]?.value || 200, label: '15', fontColor: '#177AD5'},
        {value: estadistics[7]?.value || 200, label: '16'},
        {value: estadistics[8]?.value || 200, label: '17', fontColor: '#177AD5'},
        {value: estadistics[6]?.value || 200, label: '18'},
        {value: estadistics[5]?.value || 200, label: '19', fontColor: '#177AD5'},
        {value: estadistics[30]?.value || 200, label: '20'},
        {value: estadistics[39]?.value || 200, label: '21', fontColor: '#177AD5'}
    ]

    const barDataFour = [
        {value: estadistics[33]?.value || 200, label: '22'},
        {value: estadistics[38]?.value || 200, label: '23', fontColor: '#177AD5'},
        {value: estadistics[32]?.value || 200, label: '24'},
        {value: estadistics[31]?.value || 200, label: '25', fontColor: '#177AD5'},
        {value: estadistics[36]?.value || 200, label: '26'},
        {value: estadistics[37]?.value || 200, label: '27', fontColor: '#177AD5'},
        {value: estadistics[35]?.value || 200, label: '28'}
    ]

    const barDataFive = [
        {value: estadistics[34]?.value || 200, label: '29', fontColor: '#177AD5'},
        {value: estadistics[18]?.value || 200, label: '30'},
        {value: estadistics[27]?.value || 200, label: '31', fontColor: '#177AD5'},
        {value: estadistics[21]?.value || 200, label: '32'},
        {value: estadistics[26]?.value || 200, label: '33', fontColor: '#177AD5'},
        {value: estadistics[20]?.value || 200, label: '34'},
        {value: estadistics[19]?.value || 200, label: '35', fontColor: '#177AD5'}
    ]

    const barDataSix = [
        {value: estadistics[24]?.value || 200, label: '36'},
        {value: estadistics[25]?.value || 200, label: '37', fontColor: '#177AD5'},
        {value: estadistics[23]?.value || 200, label: '38'},
        {value: estadistics[22]?.value || 200, label: '39', fontColor: '#177AD5'},
        {value: estadistics[2]?.value || 200, label: '40'}
    ]

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Analitica</Text>
            <Text style={{marginTop: 30}}>Numeros Calientes</Text>
            <View style={{display: 'flex', flexDirection: 'row', marginBottom: 30}}>
                <Text style={ styles.hotNumbers}>{hotNumbers}</Text>  
            </View>
            <Text style={{marginTop: 15, padding: 10}}>Estadisticas basado en 1000+ combinaciones pasadas</Text>
            <ScrollView>
                <BarChart
                    barWidth={22}
                    noOfSections={3}
                    barBorderRadius={4}
                    frontColor="lightgray"
                    data={barData}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    isAnimated
                />
                <BarChart
                    barWidth={22}
                    noOfSections={3}
                    barBorderRadius={4}
                    frontColor="lightgray"
                    data={barDataTwo}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    isAnimated
                />
                <BarChart
                    barWidth={22}
                    noOfSections={3}
                    barBorderRadius={4}
                    frontColor="lightgray"
                    data={barDataThree}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    isAnimated
                />
                 <BarChart
                    barWidth={22}
                    noOfSections={3}
                    barBorderRadius={4}
                    frontColor="lightgray"
                    data={barDataFour}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    isAnimated
                />
                 <BarChart
                    barWidth={22}
                    noOfSections={3}
                    barBorderRadius={4}
                    frontColor="lightgray"
                    data={barDataFive}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    isAnimated
                />
                 <BarChart
                    barWidth={22}
                    noOfSections={3}
                    barBorderRadius={4}
                    frontColor="lightgray"
                    data={barDataSix}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    isAnimated
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', // Center horizontally
        padding: 20, // Add some padding for better spacing
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        // textAlign: 'right'
    }, 
    hotNumbers: {
        marginHorizontal: 5,
        fontSize: 20
    }
});

export default Charts;