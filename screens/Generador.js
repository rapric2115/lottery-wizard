import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Predictions from '../components/prediction';
import { AuthContext } from '../Auth/AuthContext';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, child, get } from 'firebase/database';
import { firebaseConfig } from '../firebaseConfig';


const GeneradorFormula = () => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const [leidsa, setLeidsa] = useState([]);
    const [lastRes, setLastRes] = useState([]);

    useEffect(() => {
        getData();
      }, []);

    const AdsRef = ref(db);

    const getData = () => {
        get(child(AdsRef, `lottos/leidsa/lastResults/`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              if (data && typeof data === 'object') {
                const dataArray = Object.values(data); // Extract values into an array
                setLastRes(dataArray);
              } else {
                console.log("Data is not an object or is empty");
              }
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error("Error fetching adverting data:", error);
          });

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
    }    

    

    
    
    const results = [leidsa[0], leidsa[1], leidsa[2], leidsa[3], leidsa[4], leidsa[5]]
   
    const [combinacionTwo, setCombinacionTwo] = useState([]);
    const [combinacionTres, setCombinacionTres] = useState([]);
    const [combinacionCuatro, setCombinationCuatro] = useState([]);
    const [combinacionCinco, setCombinationCinco] = useState([]);
    const [combinacionSeis, setCombinationSeis] = useState([]);

    const dataset = [combinacionTwo[0], combinacionTres[0], combinacionCuatro[0], combinacionCinco[0], combinacionSeis[0]];
    const datasetOne = [combinacionTwo[1], combinacionTres[1], combinacionCuatro[1], combinacionCinco[1], combinacionSeis[1]];
    const datasetTwo = [combinacionTwo[2], combinacionTres[2], combinacionCuatro[2], combinacionCinco[2], combinacionSeis[2]];
    const datasetThree = [combinacionTwo[3], combinacionTres[3], combinacionCuatro[3], combinacionCinco[3], combinacionSeis[3]];

    console.log('Data from generator', dataset);

    const TwoNumber = [14, 13, 17, 16];
    const ThreeNumber = [20, 22, 25, 18];
    const fourNumber = [23, 22, 29, 24];
    const fiveNumber = [29, 31, 30, 28];
    const sixNumber = [34, 35, 32, 36];

    const twoAverage = 12.56418659;
    const ThreeAverage = 19.86937931;
    const fourAverage = 26.734528;
    const fiveAverage = 33.78447209;
    const sixAverage = 40.63576114;

    const sum = (a, b) => {
        return Number(a) + Number(b);
    }
    
    const log = (a, b, c) => {
        return a * Math.log(sum(b, c));
    }

    useEffect(() => {
        const calculateCombinations = () => {
            const calculatedCombinations = [];
            for (const value of TwoNumber) {
                const result = log(value, Number(leidsa[1]), Number(lastRes[1]));
                const logNumber = (twoAverage * Number(leidsa[1]) * Number(lastRes[1])) / Math.pow(result, 2);
                const TwoResults = Math.abs(Math.round((Math.log(logNumber) * 38) / (Math.pow(720, Math.pow(-sum(leidsa[1], lastRes[1]), -1)))));
                calculatedCombinations.push(TwoResults);
            }
            setCombinacionTwo(calculatedCombinations);
        };

        calculateCombinations();
    }, [leidsa[1], lastRes[1], twoAverage]);

    useEffect(() => {
        const calculateCombinations = () => {
            const calculatedCombinations = [];
            for (const value of ThreeNumber) {
                const result = log(value, Number(leidsa[2]), Number(lastRes[2]));
                const logNumber = (ThreeAverage * Number(leidsa[2]) * Number(lastRes[2])) / Math.pow(result, 2);
                const ThreeResults = Math.abs(Math.round((Math.log(logNumber) * 38) / (Math.pow(720, Math.pow(-sum(leidsa[2], lastRes[2]), -1)))));
                calculatedCombinations.push(ThreeResults);
            }
            setCombinacionTres(calculatedCombinations);
        };

        calculateCombinations();
    }, [leidsa[2], lastRes[2], ThreeAverage]);

    useEffect(() => {
        const calculateCombinations = () => {
            const calculatedCombinations = [];
            for (const value of fourNumber) {
                const result = log(value, Number(leidsa[3]), Number(lastRes[3]));
                const logNumber = (fourAverage * Number(leidsa[3]) * Number(lastRes[3])) / Math.pow(result, 2);
                const fourResults = Math.abs(Math.round((Math.log(logNumber) * 38) / (Math.pow(720, Math.pow(-sum(leidsa[3], lastRes[3]), -1)))));
                calculatedCombinations.push(fourResults);
            }
            setCombinationCuatro(calculatedCombinations);
        };

        calculateCombinations();
    }, [leidsa[3], lastRes[3], fourAverage]);

    useEffect(() => {
        const calculateCombinations = () => {
            const calculatedCombinations = [];
            for (const value of fiveNumber) {
                const result = log(value, Number(leidsa[4]), Number(lastRes[4]));
                const logNumber = (fiveAverage * Number(leidsa[4]) * Number(lastRes[4])) / Math.pow(result, 2);
                const cincoResults = Math.round((Math.log(logNumber) * 38) / (Math.pow(720, Math.pow(-sum(leidsa[4], lastRes[4]), -1))));
                calculatedCombinations.push(cincoResults);
            }
            setCombinationCinco(calculatedCombinations);
        };

        calculateCombinations();
    }, [leidsa[4], lastRes[4], fiveAverage]);

    useEffect(() => {
        if (leidsa && lastRes) {
            const calculateCombinations = () => {
                const calculatedCombinations = [];
                for (const value of sixNumber) {
                    const result = log(value, Number(leidsa[5]), Number(lastRes[5]));
                    const logNumber = (sixAverage * Number(leidsa[5]) * Number(lastRes[5])) / Math.pow(result, 2);
                    const seisResults = Math.round((Math.log(logNumber) * 38) / (Math.pow(720, Math.pow(-sum(leidsa[5], lastRes[5]), -1))));
                    calculatedCombinations.push(seisResults);
                }
                setCombinationSeis(calculatedCombinations);
            };
    
            calculateCombinations();
        }
    }, [leidsa[5], lastRes[5], sixAverage]);



    




    return(
        <View>
            <Text style={{marginHorizontal: 20, fontWeight: 'bold', fontSize: 18, marginTop: 15}}>Numeros generados Ledisa</Text>
            <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'center'}}>            
                {/* {
                    numeros.map((nums, i) => (
                        <Text style={[styles.numbers, results.includes(nums) && styles.highlightedNumber]} key={i}>{nums}</Text>
                    ))
                }
                {
                    sumax.map((nummax, i) => (
                        <Text style={[styles.numbers, resultMax.includes(nummax) && styles.highlightedNumber]} key={i}>{nummax}</Text>
                    ))
                }             */}
            </View>
            <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center'}}>
                <View>
                    <Text>Uno</Text>
                </View>
                <View>
                    {
                        combinacionTwo.map((three, i) => (
                          <TouchableOpacity onPress={() => console.log(three)}>
                              <Text style={[styles.numbers, results.includes(three) && styles.highlightedNumber]} key={i} >{three}</Text>
                          </TouchableOpacity>  
                        ))
                    }
                </View>
                <View>
                    {
                        combinacionTres.map((three, i) => (
                         <Text style={[styles.numbers, results.includes(three) && styles.highlightedNumber]} key={i}>{three}</Text>
                        ))
                    }
                </View>
                <View>
                    {
                        combinacionCuatro.map((four, i) => (
                         <Text style={[styles.numbers, results.includes(four) && styles.highlightedNumber]} key={i}>{four}</Text>
                        ))
                    }
                </View>
                <View>
                    {
                        combinacionCinco.map((five, i) => (
                         <Text style={[styles.numbers, results.includes(five) && styles.highlightedNumber]} key={i}>{five}</Text>
                        ))
                    }
                </View>
                <View>
                {
                        combinacionSeis.map((six, i) => (
                         <Text style={[styles.numbers, results.includes(six) && styles.highlightedNumber]} key={i}>{six}</Text>
                        ))
                    }
                </View>
                <View>
                    <Text>Mas</Text>
                </View>
                <View>
                    <Text>Super Mas</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    numbers: {
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: '#cbd4c2',
        margin: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    highlightedNumber: {
        backgroundColor: 'orange', // Change the background color to orange
    },
})

export default GeneradorFormula;