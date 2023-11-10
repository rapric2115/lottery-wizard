import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../Auth/AuthContext';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, set } from 'firebase/database';
import { firebaseConfig } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

import AIComponent from './AI component/ai';
import AITest from './AI component/AITest';
import AIOne from './AI component/AIOne';
import AITwo from './AI component/AITwo';
import AIThree from './AI component/AIThree';
import AIFour from './AI component/AIFour';
import AIFive from './AI component/AIFive';
import AISix from './AI component/AISix';
import { TouchableOpacity } from 'react-native-gesture-handler';

const width = Dimensions.get('screen').width;

const MyAccount = () => {
    const {handleSignOutWithGoogle, userDataID, userName, userEmail} = useContext(AuthContext);
    const [leidsa, setLeidsa] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [myCombination, setMyCombination] = useState([]);
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const [acumulado, setAcumulado] = useState('19');

    useEffect(() => { 
        getData();      
    }, [userDataID, userName, userEmail])

    const AdsRef = ref(db);
    const getData = () => { 

        if (userDataID) {        
        get(child(AdsRef, 'userSavedNumber/' + userDataID + '/myCombination')).then((snap) => {
            if (snap.exists()) {
                const data = snap.val();
                if (data && typeof data === 'object') {
                    const dataArray = Object.values(data);
                    setMyCombination(dataArray)
                } else {
                    console.log("Data is not an object or is Empty for my Combination")
                }
            } else {
                console.log("no data available")
            }
          }).catch((err) => {
            console.error(err);
          });
 
        }

        get(child(AdsRef, `lottos/leidsa/num`)).then((snapshot) => {
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

          get(child(AdsRef, `lottos/leidsa/`)).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              if (data && typeof data === 'object') {
                const dataArray = Object.values(data); // Extract values into an array
                setAcumulado(dataArray);
              } else {
                console.log("Data is not an object or is empty");
              }
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });

    }

    const results = [leidsa[0], leidsa[1], leidsa[2], leidsa[3], leidsa[4], leidsa[5]];    


    useEffect(() => {
        const sortData = () => {
            const sortedArray = [...myCombination];
            sortedArray.sort((a, b) => a - b);
            setSortedData(sortedArray)
        }

        sortData()
    }, [myCombination])
    

    const winner = sortedData.filter(number => results.includes(number)).length;

    const AIone = useRef(null);
    const AItwo = useRef(null);
    const AIthree = useRef(null);
    const AIfour = useRef(null);
    const AIfive = useRef(null);
    const AIsix = useRef(null);
    
    useEffect(() => {
        callAIFunctions()
        .then(() => {
            console.log('All AI functions completed.');
        })
        .catch(err => {
            console.error('Error:', err);
        });
      }, [])

    const callAIFunctions = async () => {
        try {
          await Promise.all([
            AIone.current.initialize(),
            AIone.current.train(),
            AIone.current.classifyPoints(),
            AItwo.current.initialize(),
            AItwo.current.train(),
            AItwo.current.classifyPoints(),
            AIthree.current.initialize(),
            AIthree.current.train(),
            AIthree.current.classifyPoints(),
            AIfour.current.initialize(),
            AIfour.current.train(),
            AIfour.current.classifyPoints(),
            AIfive.current.initialize(),
            AIfive.current.train(),
            AIfive.current.classifyPoints(),
            AIsix.current.initialize(),
            AIsix.current.train(),
            AIsix.current.classifyPoints(),
          ]);
      
          console.log('All AI functions completed.');
        } catch (error) {
          console.error('Error:', error);
        }
      };

      const navigation = useNavigation();
      const handleNavigation = () => {
        navigation.navigate('Precios')
      }
    
      
    return(
        <View>
            <View style={styles.card}>
                <View style={styles.content}>
                    <FontAwesome name='user-circle-o' size={50} color="white" />
                    <View>
                        <Text style={styles.title}>{userName != null ? userName : `Tu Nombre Aqui`}</Text>
                        <Text style={styles.p}>{userEmail}</Text>
                    </View>
                </View>
                <Pressable style={styles.button} onPress={handleSignOutWithGoogle}>
                    <Text style={styles.text}>Cerrar Sesión</Text>
                </Pressable>
            </View>
            <Text style={{textAlign: 'center', marginVertical: 15}}>Mis Combinaciones</Text>
            <View style={styles.combinationContainer}>
                <Text style={[styles.countText, winner > 2 ? styles.green: styles.red]}>
                {winner == 8
                ? `RD$ ${acumulado[0]} Millones`
                : winner == 7
                ? `Ha Ganado Aprox. RD$ ${acumulado[4]} Millones`
                : winner == 6
                ? `Ha Ganado Aprox. RD$ ${acumulado[3]} Millones`
                : winner > 4
                ? `Ha Ganado Aprox. RD$ 50,000 Pesos`
                : winner > 3
                ? `Ha Ganado Aprox. RD$ 25,000 Pesos`
                : winner > 2
                ? `Ha Ganado Aprox. RD$ 50 Pesos`
                : `RD$ 0 Pesos`}
                </Text>
                <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'center'}}>            
                        {sortedData.map((number, index) => (
                            <Text
                            key={index}
                            style={[
                                styles.numbers,
                                results.includes(number) && styles.highlightedNumber,
                            ]}
                            >
                            {number}
                            </Text>
                        ))}
                        <Text style={[ styles.numbers,
                                results.includes(results) && styles.highlightedNumber,]}>0</Text>
                        <Text  style={[ styles.numbers,
                                results.includes(results) && styles.highlightedNumber,]}>0</Text>
                </View>
                <Text style={[styles.countText, winner > 2? styles.green: styles.red]}>
                    {winner > 3 ? `Felicidades! Ha Ganado ha tenido ${winner} resultados` : `Siga Intentando ha tenido ${winner} resultados`}
                </Text>
            </View>
            <View style={{justifyContent: 'center', alignSelf: 'center', alignItems: 'center', marginTop: 25}}>
                <Text style={{marginBottom: 10}}>Genera combinaciones con Inteligencia Artificial</Text>
                {/* <View style={{padding: 15}}>
                    <Text style={{fontWeight: 'bold'}}>NOTA IMPORTANTE:</Text>
                    <Text>Esta Sesión de generar combinaciones con IA y guardar sus Combinaciones, serán próximamente de pago, RD$ 50 Mensuales.</Text>
                </View> */}
                <View style={{flexDirection: 'row'}}>
                    <AIOne ref={AIone}/> 
                    <AITwo ref={AItwo}/>
                    <AIThree ref={AIthree}/>
                    <AIFour ref={AIfour} />
                    <AIFive ref={AIfive} />
                    <AISix ref={AIsix} />
                </View>
                <TouchableOpacity onPress={callAIFunctions} style={{backgroundColor: '#2691b4', padding: 10, borderRadius: 7, marginTop: 25}}>
                    <Text style={{color: 'snow'}}>
                        Iniciar Secuencia Aprendizaje
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNavigation} style={{backgroundColor: '#2691b4', padding: 10, borderRadius: 7, marginTop: 25}}>
                    <Text style={{color: 'snow'}}>
                        Membresias
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    combinationContainer: {
        backgroundColor: '#fff', 
        borderRadius: 7, 
        width: '90%', 
        alignSelf: 'center', 
        borderWidth: 1, 
        borderColor: '#247ba0',
        paddingVertical: 5,
    },
    card: {
        width: width * .8,
        color: 'white',
        height: 150,
        backgroundColor: '#2691b4',
        borderRadius: 14,
        alignSelf: 'center',
        paddingTop: 15,
        marginTop: 20
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 16,
        color: 'white'
    },
    p: {
        color: 'white'
    },
    numbers: {
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: '#d6f1f7',
        margin: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: '#247ba0'
    },
    highlightedNumber: {
        backgroundColor: 'orange', // Change the background color to orange
    },
    countText: {
        alignSelf: 'flex-end',
        paddingRight: 10,
        paddingVertical: 10
    },
    green: {
        color: 'green',
        fontWeight: 'bold',
    },
    red: {
        color: 'red',
        fontWeight: 'bold',
    },
    button: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        alignSelf: 'center',
        marginTop: 20
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
})

export default MyAccount;