import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, RefreshControl } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, child, get } from 'firebase/database';
import { firebaseConfig } from '../firebaseConfig';

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
    const [formattedDate, setFormattedDate] = useState('5-12-1979');
    const [refreshing, setRefreshing] = useState();

    // const LeidsaRef = ref(db);
    // const LeidsaRef = ref(db, 'leidsa/');
    // onValue(LeidsaRef, (snapshot) => {
    //   const data = snapshot.val();
    //   setLeidsa(data);
    // })

    // useEffect(() => {
    //   getData()
    // }, [])
    
    // const getData = () => {  
    //       get(child(LeidsaRef, `lottos/leidsa/fecha`)).then((snapshot) => {
    //         if (snapshot.exists()) {
    //           const data = snapshot.val();
    //           // Extract values into an array
    //             setLeidsaFecha(data);
             
    //         } else {
    //           console.log("No data available");
    //         }
    //       }).catch((error) => {
    //         console.error(error);
    //       });
    //   }

      const { leidsa } = useFetch('https://www.conectate.com.do/loterias/leidsa', 'score', 'leidsa' );
      const { fechaLeidsa } = useFetch('https://www.conectate.com.do/loterias/leidsa', 'session-date', 'fechaLeidsa' );
      const { leidsaTotalAcumulado } = useFetch('https://www.conectate.com.do/loterias/leidsa', 'session-badge', 'leidsaTotalAcumulado');
      const { loteka } = useFetch('https://www.conectate.com.do/loterias/loteka', 'score', 'loteka' );
      const { fechaLoteka } = useFetch('https://www.conectate.com.do/loterias/loteka', 'session-date', 'fechaLoteka' );
      const { lotekaTotalAcumulado } = useFetch('https://www.conectate.com.do/loterias/loteka', 'session-badge', 'lotekaTotalAcumulado');
      const { lotekaWebsite } = useFetch('https://loteka.com.do/', 'bola', 'lotekaWebsite');


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
      
      useEffect(() => {
        if (fechaLeidsa && fechaLeidsa.length >= 5) {
          const dateToString = fechaLeidsa[4];
          const formattedDate = convertDateFormat(dateToString);
      
          setFormattedDate(formattedDate);
        } else {
          console.error('Invalid or missing date in fechaLeidsa:', fechaLeidsa);
        }

        if (fechaLoteka && fechaLoteka.length >= 5) {
          const dateToString = fechaLoteka[4];
          const formattedDate = convertDateFormat(dateToString);
      
          setLotekaFecha(formattedDate);
        } else {
          console.error('Invalid or missing date in fechaLeidsa:', fechaLeidsa);
        }
      }, [fechaLeidsa]);


      useEffect(() => {
        if (Array.isArray(lotekaTotalAcumulado) && lotekaTotalAcumulado.length > 5) {
          const inputString = lotekaTotalAcumulado[5];
      
          if (typeof inputString === 'string') {
            const match = inputString.match(/(\$[0-9,]+)/);
      
            if (match) {
              const extractedValue = match[0];
              setLotekaAcumulado(extractedValue);
            } else {
              console.log("No match found");
            }
          } else {
            console.log("lotekaTotalAcumulado[5] is not a string");
          }
        } else {
          console.log("lotekaTotalAcumulado is not an array or does not have an element at index 5");
        }
      }, [lotekaTotalAcumulado]);

      useEffect(() => {
        if (Array.isArray(leidsaTotalAcumulado) && leidsaTotalAcumulado.length > 5) {
          const inputString = leidsaTotalAcumulado[5];
      
          if (typeof inputString === 'string') {
            const match = inputString.match(/(\$[0-9,]+)/);
      
            if (match) {
              const extractedValue = match[0];
              setLeidsaAcumulado(extractedValue);
            } else {
              console.log("No match found");
            }
          } else {
            console.log("leidsaTotalAcumulado[5] is not a string");
          }
        } else {
          console.log("leidsaTotalAcumulado is not an array or does not have an element at index 5");
        }
      }, [lotekaTotalAcumulado]);
      
      
      
      
     

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
                        <Text style={{marginHorizontal: 10}}>{formattedDate}</Text>
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