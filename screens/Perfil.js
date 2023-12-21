import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../Auth/AuthContext';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, set } from 'firebase/database';
import { firebaseConfig } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

import AITest from './AI component/ai';
import AIOne from './AI component/AIOne';
import AITwo from './AI component/AITwo';
import AIThree from './AI component/AIThree';
import AIFour from './AI component/AIFour';
import AIFive from './AI component/AIFive';
import AISix from './AI component/AISix';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const width = Dimensions.get('screen').width;

const MyAccount = () => {
    const {handleSignOutWithGoogle, userDataID, userName, userEmail, proMember} = useContext(AuthContext);
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

    const AItest = useRef(null);
    
    // useEffect(() => {
    //     callAIFunctions()
    //     .then(() => {
    //         console.log('All AI functions completed.');
    //     })
    //     .catch(err => {
    //         console.error('Error:', err);
    //     });
    //   }, [])

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

            AItest.current.initialize(),
            AItest.current.train(),
            AItest.current.classifyPoints(),

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
                </View>
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
           
            <View style={{width: '90%', justifyContent: 'center', alignSelf: 
            'center', alignItems: 'center', marginTop: 25, backgroundColor: '#ffebeb', 
            paddingVertical: 32, borderRadius: 5}}>
                <Text style={{marginBottom: 10, fontWeight: 'bold', textAlign: 'center'}}>Genera combinaciones utilizando nuestra Inteligencia Artificial</Text>
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
                    {/* numero mas y super*/}
                    <AITest ref={AItest} />
                  {/* <AITest ref={AItest} /> */}
                </View>
                {proMember != false ?
                <LinearGradient
                  colors={['#0065B8','#004E8F']}
                  start={[0.01, 0.01]}
                  style={{paddingVertical: 12, paddingHorizontal: 32, borderRadius: 7, marginTop: 25}}>
                    <TouchableOpacity onPress={() => callAIFunctions()}>
                        <Text style={{color: 'snow'}}>
                            Iniciar Secuencia Aprendizaje
                        </Text>
                    </TouchableOpacity>
                  </LinearGradient>
              :
              <TouchableOpacity onPress={handleNavigation} style={{paddingVertical: 12, 
              paddingHorizontal: 32, borderRadius: 7, marginTop: 25, backgroundColor: '#000'}}>
                <Text style={styles.text}>Hacerse Miembro Pro para usar AI</Text>
              </TouchableOpacity>  
              }
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