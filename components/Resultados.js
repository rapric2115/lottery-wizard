import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, RefreshControl } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, child, get } from 'firebase/database';
import { firebaseConfig } from '../firebaseConfig';
import CombinationButtons from './combinationButton';
import { useNavigation } from '@react-navigation/native';

import useFetch from '../custom/useFetch';

const SCREEN_WiDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;


const Result = () => {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
    const [leidsaAcumulado, setLeidsaAcumulado] = useState();
    // const [leidsaFecha, setLeidsaFecha] = useState();
    const [lotekaAcumulado, setLotekaAcumulado] = useState();
    const [lotekaFecha, setLotekaFecha] = useState();
    const [leidsaFecha, setLeidsaFecha ] = useState();
    const [refreshing, setRefreshing] = useState();
    const navigation = useNavigation();
  
    const LeidsaRef = ref(db);
   
    useEffect(() => {
      getData()
    }, [])
    
    const getData = () => {  
          get(child(LeidsaRef, `acumulados/leidsa`)).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              // Extract values into an array
                setLeidsaAcumulado(data);
                // console.log('Acumulado leidsa', data)
             
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error('error de firebase', error);
          });

          get(child(LeidsaRef, `acumulados/loteka`)).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              // Extract values into an array
                setLotekaAcumulado(data);
                // console.log('Acumulado leidsa', data)
             
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error('error de firebase', error);
          });
      }

      const { leidsa } = useFetch('https://www.conectate.com.do/loterias/leidsa', 'score', 'leidsa' ); 
      const { loteka } = useFetch('https://www.conectate.com.do/loterias/loteka', 'score', 'loteka' );
     
     
     
      const onRefresh = () => {
        setRefreshing(true);
        previousSaturday.toDateString();
        setRefreshing(false);
      }

      const convertDateFormat = (inputDate) => {
        try {
          if (inputDate) {
            const [day, month, year] = inputDate.split('-').map(Number);
            const dateObject = new Date(year, month - 1, day);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(dateObject);
            return formattedDate;
          } else {
            console.error('Input date is undefined');
            return null; // Return a default value or handle the error as needed
          }
        } catch (error) {
          console.error('Error converting date:', error);
          return null; // Return a default value or handle the error as needed
        }
      };
      
     
      function getSpecificDate() {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    
        // Create a new date object to manipulate
        const specificDate = new Date(today);
    
        switch (dayOfWeek) {
            case 0: // Sunday
            case 1: // Monday
            case 2: // Tuesday
                // Last Saturday
                specificDate.setDate(today.getDate() - (dayOfWeek + 1)); // Subtract (dayOfWeek + 1) days
                break;
            case 3: // Wednesday
                // Get today's date (Wednesday)
                break;
            case 4: // Thursday
            case 5: // Friday
                // Get last Wednesday
                specificDate.setDate(today.getDate() - (dayOfWeek - 3)); // Subtract (dayOfWeek - 3) days
                break;
            case 6: // Saturday
                // Get today's date (Saturday)
                break;
            default:
                break;
        }
    
        // Format the date to the desired format
        const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
        const dayName = daysOfWeek[specificDate.getDay()];
        const dayNumber = specificDate.getDate();
        const monthName = months[specificDate.getMonth()];
        const year = specificDate.getFullYear();
    
         setLeidsaFecha(`${dayName} ${dayNumber}, ${year}`)
    }

    function getSpecificDateForLoteka() {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  
      // Create a new date object to manipulate
      const specificDate = new Date(today);
  
      switch (dayOfWeek) {
          case 0: // Sunday
          case 1: // Monday
          case 2: // Tuesday
          case 3: // Wednesday
              // Previous Monday
              specificDate.setDate(today.getDate() - (dayOfWeek)); // Subtract dayOfWeek days
              break;
          case 4: // Thursday
          case 5: // Friday
          case 6: // Saturday
              // Get today's date (Thursday)
              break;
          default:
              break;
      }
  
      // Format the date to the desired format
      const daysOfWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
      const dayName = daysOfWeek[specificDate.getDay()];
      const dayNumber = specificDate.getDate();
      const monthName = months[specificDate.getMonth()];
      const year = specificDate.getFullYear();
  
      setLotekaFecha(`${dayName} ${dayNumber}, ${year}`)
  }
  
    
    useEffect(() => {
      getSpecificDate();
      getSpecificDateForLoteka();
    }, [leidsaFecha])
    
    
    

      const handlePressNavigation = () => {
        navigation.navigate('Leidsa')
    }

    const handlePressNavigationLoteka = () => {
        navigation.navigate('Loteka')
    }
     

    return(
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
            <View style={{flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-around'}}>
              <View style={styles.resultContainer}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: '#112b3b', textAlign: 'center'}}>Pega 3 Mas</Text>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  {leidsa.slice(0, 3).map((num, index) => (
                    <Text key={index} style={styles.fetchResults}>
                      {num}
                    </Text>
                  ))}
                </View>
              </View>

              <View style={styles.resultContainer}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: '#112b3b', textAlign: 'center'}}>Toca 3</Text>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  {loteka.slice(0, 3).map((num, index) => (
                    <Text key={index} style={styles.fetchResults}>
                      {num}
                    </Text>
                  ))}
                </View>
              </View>
            </View>

            <View style={{flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-around'}}>
              <View style={styles.resultContainer}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: '#112b3b', textAlign: 'center'}}>Quiniela Palé</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                {Array.from({ length: 3 }, (_, index) => (
                  <Text key={index} style={styles.fetchResults}>
                    {leidsa[index + 28]}
                  </Text>
                ))}
                </View>
              </View>

              <View style={styles.resultContainer}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: '#112b3b', textAlign: 'center'}}>Quiniela Loteka</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                {Array.from({ length: 3 }, (_, index) => (
                  <Text key={index} style={styles.fetchResults}>
                    {loteka[index + 3]}
                  </Text>
                ))}
                </View>
              </View>
            </View>

            <View style={{flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-around'}}>
              <View style={styles.resultContainer}>
                  <Text style={{fontSize: 24, fontWeight: 'bold', color: '#112b3b', textAlign: 'center'}}>Loto Pool</Text>
                  <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <Text key={index} style={styles.fetchResults}>
                      {leidsa[index + 3]}
                    </Text>
                  ))}
                  </View>
                </View>
                <View style={styles.resultContainer}>
                  <Text style={{fontSize: 24, fontWeight: 'bold', color: '#112b3b', textAlign: 'center'}}>Mega Chances</Text>
                  <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <Text key={index} style={styles.fetchResults}>
                      {loteka[index + 6]}
                    </Text>
                  ))}
                  </View>
                </View>
                
            </View>
            <View style={styles.container}>
                <Text style={{fontWeight: 'bold'}}>LEIDSA</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text>FECHA</Text>
                        <Text style={{marginHorizontal: 10}}>{leidsaFecha}</Text>
                    </View>
                    <Text Style={{fontSize: 26, fontWeight: 'bold'}}>RESULTADO</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 20, alignSelf: 'center'}}>
                {Array.from({ length: 8 }, (_, index) => (
                  <Text key={index} style={[styles.fetchResults, styles.textResults]}>
                    {leidsa[index + 31]}
                  </Text>
                ))}
                </View>
                <View style={{marginTop: 20}}>
                    <Text>ACUMULADO</Text>
                    <Text style={{fontSize: 38, fontWeight: 'bold', color: '#112b3b', textAlign: 'center'}}>{`RD ${leidsaAcumulado != undefined ? leidsaAcumulado : '00' } MILLONES`}</Text>
                </View>
                <CombinationButtons onPress={handlePressNavigation} text={'combinaciones leidsa'} />
            </View>
            <View style={styles.container}>
                <Text style={{fontWeight: 'bold'}}>LOTEKA</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text>FECHA</Text>
                        <Text style={{marginHorizontal: 10}}>{lotekaFecha}</Text>
                    </View>
                    <Text Style={{fontSize: 26, fontWeight: 'bold'}}>RESULTADO</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 20, alignSelf: 'center'}}>
                {Array.from({ length: 8 }, (_, index) => (
                  <Text key={index} style={[styles.fetchResults, styles.textResults]}>
                    {loteka[index + 12]}
                  </Text>
                ))}              
                </View>
                <View style={{marginTop: 20}}>
                    <Text>ACUMULADO</Text>
                    <Text style={{fontSize: 38, fontWeight: 'bold', color: '#112b3b', textAlign: 'center'}}>{`RD ${lotekaAcumulado != undefined ? lotekaAcumulado : '00'} MILLONES`}</Text>
                </View>
                <CombinationButtons onPress={handlePressNavigationLoteka} text={'combinaciones loteka'} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      width: SCREEN_WiDTH * .95,
      // height: 220,
      backgroundColor: 'white',
      alignSelf: 'center',
      borderRadius: 7,
      marginVertical: 15,
      padding: 5,
      marginBottom: 15, 
      borderWidth: 1,
      borderColor: '#247ba0'
    },
    results: {
      width: SCREEN_WiDTH * .35,
      height: SCREEN_HEIGHT * .35,
      borderRadius: 50,
      backgroundColor: '#d6f1f7',
      margin: 5,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 18,
      fontWeight: 'bold',
    },
    resultsMax: {
      width: 50,
      height: 50,
      borderRadius: 50,
      backgroundColor: '#da2c38',
      margin: 5,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      color: 'snow'
    },
    resultContainer: {
      backgroundColor: 'white',
      alignSelf: 'center',
      borderRadius: 7,
      marginVertical: 15,
      padding: 5,
      marginBottom: 15, 
      borderWidth: 1,
      borderColor: '#247ba0',
      width: '49%'
    }, 
    fetchResults: { 
      margin: 4,
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
    },
    textResults: {
      fontSize: 20,
    },
    lotoResults: {
      width: 35,
      margin: 5,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 18,
      fontWeight: 'bold',
    }
})

export default Result;