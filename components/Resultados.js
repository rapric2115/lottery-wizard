import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, child, get } from 'firebase/database';
import { firebaseConfig } from '../firebaseConfig';
import axios from 'axios';
import * as cheerio from 'cheerio';

import useFetch from '../custom/useFetch';


const Result = () => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const [leidsaAcumulado, setLeidsaAcumulado] = useState();
    const [leidsaFecha, setLeidsaFecha] = useState();
    const [lotekaAcumulado, setLotekaAcumulado] = useState();
    const [lotekaFecha, setLotekaFecha] = useState();
    const [formattedDate, setFormattedDate] = useState('5-12-1979');

    const LeidsaRef = ref(db);
    // const LeidsaRef = ref(db, 'leidsa/');
    // onValue(LeidsaRef, (snapshot) => {
    //   const data = snapshot.val();
    //   setLeidsa(data);
    // })

    useEffect(() => {
      getData()
    }, [])
    
    const getData = () => {  
          get(child(LeidsaRef, `lottos/leidsa/fecha`)).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              // Extract values into an array
                setLeidsaFecha(data);
             
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
      }

      
      const { leidsa } = useFetch('https://www.conectate.com.do/loterias/leidsa', 'score', 'leidsa' );
      const { fechaLeidsa } = useFetch('https://www.conectate.com.do/loterias/leidsa', 'session-date', 'fechaLeidsa' );
      const { leidsaTotalAcumulado } = useFetch('https://www.conectate.com.do/loterias/leidsa', 'session-badge', 'leidsaTotalAcumulado');
      const { loteka } = useFetch('https://www.conectate.com.do/loterias/loteka', 'score', 'loteka' );
      const { lotekaTotalAcumulado } = useFetch('https://www.conectate.com.do/loterias/loteka', 'session-badge', 'lotekaTotalAcumulado');
      const { lotekaWebsite } = useFetch('https://loteka.com.do/', 'bola', 'lotekaWebsite');

      console.log('Numeros de loteka website', leidsaTotalAcumulado)

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
      }, [fechaLeidsa]);

      function getPreviousWednesday() {
        const today = new Date();
        const currentDay = today.getDay();
        const daysUntilWednesday = (currentDay - 3 + 7) % 7; // Calculate days until Wednesday
        const previousWednesday = new Date(today);
        previousWednesday.setDate(today.getDate() - daysUntilWednesday);
        return previousWednesday;
      }

      function getPreviousSaturday() {
        const today = new Date();
        const currentDay = today.getDay();
        const daysUntilSaturday = (currentDay - 6 + 7) % 7; // Calculate days until Saturday
        const previousSaturday = new Date(today);
        previousSaturday.setDate(today.getDate() - daysUntilSaturday);
        return previousSaturday;
      }
      
      // Previous Days.
      const previousSaturday = getPreviousSaturday();
      console.log(previousSaturday.toDateString());

      const previousWednesday = getPreviousWednesday();
      console.log(previousWednesday.toDateString());

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
            console.log("lotekaTotalAcumulado[5] is not a string");
          }
        } else {
          console.log("lotekaTotalAcumulado is not an array or does not have an element at index 5");
        }
      }, [lotekaTotalAcumulado]);
      
      
      
      
     

    return(
        <ScrollView>
            <View style={{flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-around'}}>
              <View style={styles.resultContainer}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: '#112b3b', textAlign: 'center'}}>Pega 3 Mas</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <Text style={styles.fetchResults}>{leidsa[0]}</Text>
                  <Text style={styles.fetchResults}>{leidsa[1]}</Text>
                  <Text style={styles.fetchResults}>{leidsa[2]}</Text>
                </View>
              </View>

              <View style={styles.resultContainer}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: '#112b3b', textAlign: 'center'}}>Toca 3</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <Text style={styles.fetchResults}>{loteka[0]}</Text>
                  <Text style={styles.fetchResults}>{loteka[1]}</Text>
                  <Text style={styles.fetchResults}>{loteka[2]}</Text>
                </View>
              </View>
            </View>

            <View style={{flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-around'}}>
              <View style={styles.resultContainer}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: '#112b3b', textAlign: 'center'}}>Quiniela Palé</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <Text style={styles.fetchResults}>{leidsa[28]}</Text>
                  <Text style={styles.fetchResults}>{leidsa[29]}</Text>
                  <Text style={styles.fetchResults}>{leidsa[30]}</Text>
                </View>
              </View>

              <View style={styles.resultContainer}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: '#112b3b', textAlign: 'center'}}>Quiniela Loteka</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <Text style={styles.fetchResults}>{loteka[3]}</Text>
                  <Text style={styles.fetchResults}>{loteka[4]}</Text>
                  <Text style={styles.fetchResults}>{loteka[5]}</Text>
                </View>
              </View>
            </View>

            <View style={{flexDirection: 'row', paddingHorizontal: 10, justifyContent: 'space-around'}}>
              <View style={styles.resultContainer}>
                  <Text style={{fontSize: 24, fontWeight: 'bold', color: '#112b3b', textAlign: 'center'}}>Loto Pool</Text>
                  <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style={styles.fetchResults}>{leidsa[3]}</Text>
                    <Text style={styles.fetchResults}>{leidsa[4]}</Text>
                    <Text style={styles.fetchResults}>{leidsa[5]}</Text>
                    <Text style={styles.fetchResults}>{leidsa[6]}</Text>
                    <Text style={styles.fetchResults}>{leidsa[7]}</Text>
                  </View>
                </View>
                <View style={styles.resultContainer}>
                  <Text style={{fontSize: 24, fontWeight: 'bold', color: '#112b3b', textAlign: 'center'}}>Mega Chances</Text>
                  <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <Text style={styles.fetchResults}>{loteka[6]}</Text>
                    <Text style={styles.fetchResults}>{loteka[7]}</Text>
                    <Text style={styles.fetchResults}>{loteka[8]}</Text>
                    <Text style={styles.fetchResults}>{loteka[9]}</Text>
                    <Text style={styles.fetchResults}>{loteka[10]}</Text>
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
                  <Text style={styles.lotoResults}>{leidsa[31]}</Text>
                  <Text style={styles.lotoResults}>{leidsa[32]}</Text>
                  <Text style={styles.lotoResults}>{leidsa[33]}</Text>
                  <Text style={styles.lotoResults}>{leidsa[34]}</Text>
                  <Text style={styles.lotoResults}>{leidsa[35]}</Text>
                  <Text style={styles.lotoResults}>{leidsa[36]}</Text>
                  <Text style={styles.lotoResults}>{leidsa[37]}</Text>
                  <Text style={styles.lotoResults}>{leidsa[38]}</Text>

                    {/* {leidsa.map((num, index) => (
                        <Text style={styles.results} key={index}>{num}</Text>
                    ))} */}
                </View>
                <View style={{marginTop: 20}}>
                    <Text>ACUMULADO</Text>
                    <Text style={{fontSize: 38, fontWeight: 'bold', color: '#112b3b', textAlign: 'center'}}>{`RD ${leidsaAcumulado} MILLONES`}</Text>
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
                  <Text style={styles.lotoResults}>{loteka[12]}</Text>
                  <Text style={styles.lotoResults}>{loteka[13]}</Text>
                  <Text style={styles.lotoResults}>{loteka[14]}</Text>
                  <Text style={styles.lotoResults}>{loteka[15]}</Text>
                  <Text style={styles.lotoResults}>{loteka[16]}</Text>
                  <Text style={styles.lotoResults}>{loteka[17]}</Text>
                  <Text style={styles.lotoResults}>{loteka[18]}</Text>
                  <Text style={styles.lotoResults}>{loteka[19]}</Text>                  
                </View>
                <View style={{marginTop: 20}}>
                    <Text>ACUMULADO</Text>
                    <Text style={{fontSize: 38, fontWeight: 'bold', color: '#112b3b', textAlign: 'center'}}>{`RD ${lotekaAcumulado} MILLONES`}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      width: 370,
      height: 220,
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
      width: 35,
      height: 35,
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