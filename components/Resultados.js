import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, child, get } from 'firebase/database';
import { firebaseConfig } from '../firebaseConfig';



const Result = () => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const [leidsa, setLeidsa] = useState([]);
    const [leidsaAcumulado, setLeidsaAcumulado] = useState();
    const [leidsaFecha, setLeidsaFecha] = useState();
    const [loteka, setLoteka] = useState([]);
    const [lotekaAcumulado, setLotekaAcumulado] = useState();
    const [lotekaFecha, setLotekaFecha] = useState();

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
        get(child(LeidsaRef, `lottos/leidsa/num`)).then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            if (data && typeof data === 'object') {
              const dataArray = Object.values(data); // Extract values into an array
              setLeidsa(dataArray);
            } else {
              console.log("Data is not an object or is empty");
            }
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });

        get(child(LeidsaRef, `lottos/leidsa/acumulado`)).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              // Extract values into an array
                setLeidsaAcumulado(data);
             
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });

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

          // Loteka
          get(child(LeidsaRef, `lottos/loteka/num`)).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              if (data && typeof data === 'object') {
                const dataArray = Object.values(data); // Extract values into an array
                setLoteka(dataArray);
              } else {
                console.log("Data is not an object or is empty");
              }
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });

          get(child(LeidsaRef, `lottos/loteka/acumulado`)).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              // Extract values into an array
                setLotekaAcumulado(data);
             
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });

          get(child(LeidsaRef, `lottos/loteka/fecha`)).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              // Extract values into an array
                setLotekaFecha(data);
             
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
      }
      
      
    

      console.log(leidsaFecha)

    

    return(
        <ScrollView>
            <View style={styles.container}>
                <Text style={{fontWeight: 'bold'}}>LEIDSA</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text>FECHA</Text>
                        <Text style={{marginHorizontal: 10}}>{leidsaFecha}</Text>
                    </View>
                    <Text Style={{fontSize: 26, fontWeight: 'bold'}}>RESULTADO</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 20}}>
                    {leidsa.map((num, index) => (
                        <Text style={styles.results} key={index}>{num}</Text>
                    ))}
                </View>
                <View style={{marginTop: 20}}>
                    <Text>ACUMULADO</Text>
                    <Text style={{fontSize: 38, fontWeight: 'bold', color: '#112b3b'}}>{`RD$ ${leidsaAcumulado} MILLONES`}</Text>
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
                <View style={{flexDirection: 'row', marginTop: 20}}>
                    {loteka.map((num, i) => (
                        <Text style={styles.results} key={i}>{num}</Text>
                    ))}
                </View>
                <View style={{marginTop: 20}}>
                    <Text>ACUMULADO</Text>
                    <Text style={{fontSize: 38, fontWeight: 'bold', color: '#112b3b'}}>{`RD$ ${lotekaAcumulado} MILLONES`}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 370,
        height: 210,
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
    }
})

export default Result;