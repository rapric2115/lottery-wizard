import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../Auth/AuthContext';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, set } from 'firebase/database';
import { firebaseConfig } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import useFetchDateLoteka from '../custom/useFetchDateLoteka';
import OkMessage from '../components/okMessage';


import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const width = Dimensions.get('screen').width;

const MyAccount = () => {
    const {handleSignOutWithGoogle, userDataID, userName, userEmail} = useContext(AuthContext);
    const [leidsa, setLeidsa] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [sortedDataLoteka, setSortedDataLoteka] = useState([]);
    const [myCombination, setMyCombination] = useState([]);
    const [myCombinationLoteka, setMyCombinationLoteka] = useState([]);
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const [acumulado, setAcumulado] = useState('19');
    const [mensajeLeidsa, setMensajeLeidsa] = useState(null);
    const [mensajeLoteka, setMensajeLoteka] = useState(null);

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
                  if (dataArray.length > 0) {
                      setMyCombination(dataArray);
                  } else {
                      setMensajeLeidsa("No hay Combinaciones Guardadas");
                  }
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

        if (userDataID) {        
          get(child(AdsRef, 'userSavedNumberLoteka/' + userDataID + '/myCombination')).then((snap) => {
              if (snap.exists()) {
                  const data = snap.val();
                  if (data && typeof data === 'object') {
                      const dataArray = Object.values(data);
                      if (dataArray.length > 0) {
                        setMyCombinationLoteka(dataArray)
                    } else {
                        setMensajeLeidsa("No hay Combinaciones Guardadas");
                    }
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

    const { lotekaLast } = useFetchDateLoteka('score', 'lotekaLast');

    const results = [leidsa[0], leidsa[1], leidsa[2], leidsa[3], leidsa[4], leidsa[5]];  
    const resultsLoteka = [lotekaLast[12], lotekaLast[13], lotekaLast[14], lotekaLast[15], lotekaLast[16], lotekaLast[17]]  


    useEffect(() => {
        const sortData = () => {
            const sortedArray = [...myCombination];
            sortedArray.sort((a, b) => a - b);
            setSortedData(sortedArray)
        }
        const sortDataLoteka = () => {
          const sortedArrayLoteka = [...myCombinationLoteka];
          sortedArrayLoteka.sort((a, b) => a - b);
          setSortedDataLoteka(sortedArrayLoteka)
      }

      sortData()
      sortDataLoteka()

    }, [myCombination, myCombinationLoteka])
    

    const winner = sortedData.filter(number => results.includes(number)).length;
    const winnerLoteka = sortedData.filter(number => resultsLoteka.includes(number)).length;

   
    
    // useEffect(() => {
    //     callAIFunctions()
    //     .then(() => {
    //         console.log('All AI functions completed.');
    //     })
    //     .catch(err => {
    //         console.error('Error:', err);
    //     });
    //   }, [])

    
      const navigation = useNavigation();
      const handleNavigation = () => {
        navigation.navigate('Precios')
      }

      const firstLetter = userEmail.charAt(0);
    
      
    return(
        <ScrollView style={{backgroundColor: 'white'}}>
            <View style={styles.card}>
                <View style={styles.content}>
                    <View style={{justifyContent: 'center', paddingHorizontal: 15, borderRadius: 10}} >
                      {userName != null ?
                      <FontAwesome name='user-circle-o' size={50} color="black" />
                     :
                      <Text style={{borderRadius: 50, borderWidth: 2, borderColor: '#004E8F', 
                      width: 50, height: 50, textAlign: 'center', textTransform: 'uppercase', 
                      fontSize: 25, color: '#004E8F', marginTop: -50, textAlignVertical: 'center',
                       backgroundColor: '#99d1ff'}}>{firstLetter}</Text> 
                      }
                    </View>
                    <View>
                        <Text style={styles.title}>{userName != null ? userName : `Nombre`}</Text>
                        <Text style={styles.p}>{userEmail != null ? userEmail : "email@mail.com"}</Text>
                        <Pressable style={styles.button} onPress={handleSignOutWithGoogle}>
                            <Text style={styles.text}>Cerrar Sesión</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
           
            <View style={styles.combinationContainer}>
                <View>
                  <Text style={{textAlign: 'center', marginVertical: 15, fontWeight: 'bold'}}>MIS COMBINACIONES DE LEIDSA</Text>
                  <Text>{mensajeLeidsa != null ? mensajeLeidsa : null}</Text>
                </View>
                <Text style={[styles.countText, winner > 2 ? styles.green: styles.red]}>
                {winner == 8
                ? `RD$ ${acumulado[0]} Millones`
                : winner == 7
                ? `Ha Ganado Aprox. RD$ ${acumulado[4]} Millones`
                : winner == 6
                ? `Ha Ganado Aprox. RD$ ${acumulado[3]} Millones`
                : winner > 4
                ? `Ha Ganado Aprox. RD$ 25,000 Pesos Mínimo`
                : winner > 3
                ? `Ha Ganado Aprox. RD$ 1,000 Pesos Mínimo`
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
                    {winner > 2 ? `Felicidades! Ha Ganado ha tenido ${winner} resultados` : `Siga Intentando ha tenido ${winner} resultados`}
                </Text>
            </View>

            {/* Loteka */}
            <View style={[styles.combinationContainerLoteka, {marginTop: 15}]}>
                <View>
                  <Text style={{textAlign: 'center', marginVertical: 15, fontWeight: 'bold'}}>MIS COMBINACIONES DE LOTEKA</Text>
                  <Text>{mensajeLoteka != null ? mensajeLoteka : null}</Text>
                </View>
                <Text style={[styles.countText, winner > 2 ? styles.green: styles.red]}>
                {winnerLoteka == 8
                ? `RD$ ${acumulado[0]} Millones`
                : winnerLoteka == 7
                ? `Ha Ganado Aprox. RD$ ${acumulado[4]} Millones`
                : winnerLoteka == 6
                ? `Ha Ganado Aprox. RD$ ${acumulado[3]} Millones`
                : winnerLoteka > 4
                ? `Ha Ganado Aprox. RD$ 25,000 Pesos Mínimo`
                : winnerLoteka > 3
                ? `Ha Ganado Aprox. RD$ 1,000 Pesos Mínimo`
                : winnerLoteka > 2
                ? `Ha Ganado Aprox. RD$ 50 Pesos`
                : `RD$ 0 Pesos`}
                </Text>
                <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'center'}}>            
                        {sortedDataLoteka.map((number, index) => (
                            <Text
                            key={index}
                            style={[
                                styles.numbers,
                                resultsLoteka.includes(number) && styles.highlightedNumber,
                            ]}
                            >
                            {number}
                            </Text>
                        ))}
                        <Text style={[ styles.numbers,
                                resultsLoteka.includes(results) && styles.highlightedNumber,]}>0</Text>
                        <Text  style={[ styles.numbers,
                                resultsLoteka.includes(results) && styles.highlightedNumber,]}>0</Text>
                </View>
                <Text style={[styles.countText, winnerLoteka > 2? styles.green: styles.red]}>
                    {resultsLoteka > 2 ? `Felicidades! Ha Ganado ha tenido ${winnerLoteka} resultados` : `Siga Intentando ha tenido ${winnerLoteka} resultados`}
                </Text>
            </View>

                <LinearGradient
                colors={['#0065B8','#004E8F']}
                start={[0.01, 0.01]}
                style={{paddingVertical: 12, paddingHorizontal: 32, borderRadius: 7, 
                marginTop: 25, width: '60%', alignSelf: 'center', marginBottom: 30}}>
                  <TouchableOpacity onPress={handleNavigation} >
                      <Text style={{color: 'snow', alignSelf: 'center'}}>
                          Membresias
                      </Text>
                  </TouchableOpacity>
                </LinearGradient>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
        width: width * .9,
        color: 'white',
        height: 150,
        // backgroundColor: '#2691b4',
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
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'right'
    },
    p: {
        color: 'black'
    },
    numbers: {
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: '#fff',
        margin: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#001629'
        // borderWidth: 1,
        // borderColor: '#247ba0'
    },
    combinationContainer: {
      backgroundColor: '#ebf6ff', 
      borderRadius: 7, 
      width: '90%', 
      alignSelf: 'center', 
      // borderWidth: 1, 
      // borderColor: 'black',
      paddingVertical: 5,
  },
  combinationContainerLoteka: {
    backgroundColor: '#ebf6f0', 
    borderRadius: 7, 
    width: '90%', 
    alignSelf: 'center', 
    // borderWidth: 1, 
    // borderColor: 'black',
    paddingVertical: 5,
},
    highlightedNumber: {
        backgroundColor: 'orange', // Change the background color to orange
        color: '#fff'
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
        color: '#BF4E30',
        fontWeight: 'bold',
    },
    button: {
        width: '90%',
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