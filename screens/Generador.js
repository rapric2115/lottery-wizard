import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Predictions from '../components/prediction';
import { AuthContext } from '../Auth/AuthContext';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, set } from 'firebase/database';
import { firebaseConfig } from '../firebaseConfig';


const GeneradorFormula = () => {
    const {savedNumber, currentUser} = useContext(AuthContext);
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const [leidsa, setLeidsa] = useState([]);
    const [lastRes, setLastRes] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [myCombination, setMyCombination ] = useState([]);
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        getData();
      }, []);

    const AdsRef = ref(db);

    const getData = () => {
        get(child(AdsRef, `lottos/leidsa/results/`))
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
   
    const [combinacionOne, setCombinacionOne] = useState([]);
    const [combinacionTwo, setCombinacionTwo] = useState([]);
    const [combinacionTres, setCombinacionTres] = useState([]);
    const [combinacionCuatro, setCombinationCuatro] = useState([]);
    const [combinacionCinco, setCombinationCinco] = useState([]);
    const [combinacionSeis, setCombinationSeis] = useState([]);

    const dataset = [combinacionTwo[0], combinacionTres[0], combinacionCuatro[0], combinacionCinco[0], combinacionSeis[0]];
    const datasetOne = [combinacionTwo[1], combinacionTres[1], combinacionCuatro[1], combinacionCinco[1], combinacionSeis[1]];
    const datasetTwo = [combinacionTwo[2], combinacionTres[2], combinacionCuatro[2], combinacionCinco[2], combinacionSeis[2]];
    const datasetThree = [combinacionTwo[3], combinacionTres[3], combinacionCuatro[3], combinacionCinco[3], combinacionSeis[3]];

    // console.log('Data from generator', results);

    const OneNumber = [3, 6, 7, 5, 4.4, 4.7, 3,6];
    const TwoNumber = [14, 13, 17, 16, 19.4, 19.3, 18.8,18.6];
    const ThreeNumber = [20, 22, 25, 18, 19.8, 19.7, 18.2, 17.9];
    const fourNumber = [23, 22, 29, 24, 23, 22, 22.9, 26.3];
    const fiveNumber = [29, 31, 30, 28, 27.7, 27.5, 27.3, 28.9];
    const sixNumber = [34, 35, 32, 36, 33.9, 34, 33.8, 34.1];

    const OneAverage = 5.536186954;
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
            for (const value of OneNumber) {
                const result = log(value, Number(leidsa[0]), Number(lastRes[0]));
                const logNumber = (OneAverage * Number(leidsa[0]) * Number(lastRes[0])) / Math.pow(result, 2);
                const OneResults = Math.abs(Math.round((Math.log(logNumber) * 38) / (Math.pow(720, Math.pow(-sum(leidsa[0], lastRes[0]), -1)))));
                calculatedCombinations.push(OneResults);
            }
            setCombinacionOne(calculatedCombinations);
        };

        calculateCombinations();
    }, [leidsa[0], lastRes[0], OneAverage]);

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

const logSelectedRowValues = () => {
  if (selectedRow !== null) {
    const selectedValues = [];
    switch (selectedRow) {
      case 0:
        selectedValues.push(...combinacionOne);
        break;
      case 1:
        selectedValues.push(...combinacionTwo);
        break;
      // Add more cases for other rows if needed
      default:
        break;
    }
    console.log('Selected Row Values:', selectedValues);
  }
};

const renderRows = (combinations, results, styles, columnIndex) => {
    // Sort the combinations array by the values at the specified columnIndex
    combinations.sort((a, b) => a[columnIndex] - b[columnIndex]);
  
    return (
      <View key={columnIndex} style={{ flexDirection: 'row', justifyContent: 'center', borderRadius: 7, borderWidth: 1, borderColor: '#effafc', width: '90%', alignSelf: 'center', marginVertical: 10, backgroundColor: '#247ba0' }}>
        {combinations.map((combination, rowIndex) => (
          <TouchableOpacity key={rowIndex} onPress={() => logColumnValues(combinations, columnIndex)} style={{ marginVertical: 10 }}>
            <Text
              style={[
                styles.numbers,
                results.includes(combination[columnIndex]) && styles.highlightedNumber,
              ]}
            >
              {combination[columnIndex]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  

        const logColumnValues = (combinations, columnIndex) => {
            const valuesToLog = combinations.map((combination) => combination[columnIndex]);
            console.log(`Values at index ${columnIndex} for the clicked column:`, valuesToLog);
            savedNumber(valuesToLog)
        };


        useEffect(() => {
            const sortData = () => {
                const sortedArray = [...myCombination];
                sortedArray.sort((a, b) => a - b);
                setSortedData(sortedArray)
            }

            sortData()
        }, [myCombination])
        

    return(
        <View style={{flex: 1}}>
            <Text style={{marginHorizontal: 20, fontWeight: 'bold', fontSize: 18, marginTop: 15, textAlign: 'center'}}>Numeros generados Ledisa</Text>
            
           <ScrollView style={{ flexDirection: '', marginTop: 20, marginBottom: 30}}>
                {/* {renderRows([combinacionOne, combinacionTwo, combinacionTres, combinacionCuatro, combinacionCinco, combinacionSeis], results, styles)} */}
                {/* Add more rows as needed */}
                 {renderRows([combinacionOne, combinacionTwo, combinacionTres, combinacionCuatro, combinacionCinco, combinacionSeis], results, styles, 0)}
                 {renderRows([combinacionOne, combinacionTwo, combinacionTres, combinacionCuatro, combinacionCinco, combinacionSeis], results, styles, 1)}
                 {renderRows([combinacionOne, combinacionTwo, combinacionTres, combinacionCuatro, combinacionCinco, combinacionSeis], results, styles, 2)}
                 {renderRows([combinacionOne, combinacionTwo, combinacionTres, combinacionCuatro, combinacionCinco, combinacionSeis], results, styles, 3)}
                 {renderRows([combinacionOne, combinacionTwo, combinacionTres, combinacionCuatro, combinacionCinco, combinacionSeis], results, styles, 4)}
                 {renderRows([combinacionOne, combinacionTwo, combinacionTres, combinacionCuatro, combinacionCinco, combinacionSeis], results, styles, 5)}
                 {renderRows([combinacionOne, combinacionTwo, combinacionTres, combinacionCuatro, combinacionCinco, combinacionSeis], results, styles, 6)}
                 {renderRows([combinacionOne, combinacionTwo, combinacionTres, combinacionCuatro, combinacionCinco, combinacionSeis], results, styles, 7)}
                 {/* {renderRows([combinacionOne, combinacionTwo, combinacionTres, combinacionCuatro, combinacionCinco, combinacionSeis], results, styles, 8)} */}



            <View>
                <Text style={{textAlign: 'center'}}>Incrementa tus posibilidades de ser Millonario y ganar generando combinaciones con nuestra Inteligencia Aritificial.</Text>
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
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
})

export default GeneradorFormula;