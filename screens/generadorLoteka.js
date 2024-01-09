import React, { useEffect, useState, useContext, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Predictions from '../components/prediction';
import { AuthContext } from '../Auth/AuthContext';
import { getDatabase, ref, child, get, set } from 'firebase/database';
import { app } from '../firebaseConfig';
import OkMessage from '../components/okMessage';
import { LinearGradient } from 'expo-linear-gradient';

import useFetch from '../custom/useFetch';
import useFetchDateLoteka from '../custom/useFetchDate';

const GeneradorFormulaLoteka = ({ navigation }) => {
  const { savedNumberLoteka, currentUser, message, proMember } = useContext(AuthContext);
  const db = getDatabase(app);
  const [leidsa, setLeidsa] = useState([]);
  const [lastRes, setLastRes] = useState([]);
  const [myCombination, setMyCombination] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    gettingData();
  }, []);

  const AdsRef = ref(db);

  const gettingData = async () => {
    try {
      const resultsSnap = await get(child(AdsRef, `lottos/leidsa/results/`));
      const numSnap = await get(child(AdsRef, `lottos/leidsa/num`));

      if (numSnap.exists()) {
        const data = numSnap.val();
        if (data && typeof data === 'object') {
          const dataArray = Object.values(data);
          setLeidsa(dataArray);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };



  const { loteka, loading: lotekaLoading } = useFetch(
    'https://www.conectate.com.do/loterias/loteka',
    'score',
    'loteka'
  );

  const { leidsaLast } = useFetchDateLoteka('score', 'leidsaLast');

  useEffect(() => {
    setLastRes(leidsaLast)
  }, [leidsaLast])
  

  
  const lotekaArray = loteka.map((item) => Number(item.trim()));


  const results = useMemo(
    () => [
      lotekaArray[12],
      lotekaArray[13],
      lotekaArray[14],
      lotekaArray[15],
      lotekaArray[16],
      lotekaArray[17],
      lotekaArray[18],
      lotekaArray[19],
    ],
    [lotekaArray]
  );



  const [combinacionOne, setCombinacionOne] = useState([]);
  const [combinacionTwo, setCombinacionTwo] = useState([]);
  const [combinacionTres, setCombinacionTres] = useState([]);
  const [combinacionCuatro, setCombinationCuatro] = useState([]);
  const [combinacionCinco, setCombinationCinco] = useState([]);
  const [combinacionSeis, setCombinationSeis] = useState([]);

  const OneNumber = [
    3,
    6,
    7,
    5,
    8,
    4,
    9,
    10,
    11,
    4.4,
    4.7,
    3.1,
    2.9,
    5.1,
    6.3,
  ];
  const TwoNumber = [
    11,
    12,
    14,
    15,
    13,
    9,
    10,
    17,
    16,
    11.5,
    12.6,
    11.6,
    11.2,
    11,
    13.6,
    19,
    8,
    18,
    7,
    6,
  ];
  const ThreeNumber = [
    20,
    22,
    25,
    18,
    19,
    27,
    29,
    26,
    21,
    19.8,
    19.7,
    18.2,
    17.9,
    19.6,
    19.3,
  ];
  const fourNumber = [
    23,
    22,
    29,
    24,
    25,
    26,
    27,
    21,
    31,
    22.9,
    26.3,
    24.6,
    26.9,
    23.1,
    26.2,
  ];
  const fiveNumber = [
    29,
    31,
    30,
    28,
    27,
    33,
    32,
    34,
    25,
    27.7,
    27.5,
    27.3,
    28.9,
    28.8,
    30.9,
  ];
  const sixNumber = [
    34,
    35,
    32,
    36,
    33,
    31,
    37,
    38,
    29,
    33.9,
    33.8,
    34.1,
    34.5,
    34.9,
    34.7,
  ];

  const OneAverage = 5.536186954;
  const twoAverage = 12.56418659;
  const ThreeAverage = 19.86937931;
  const fourAverage = 26.734528;
  const fiveAverage = 33.78447209;
  const sixAverage = 40.63576114;

  const sum = (a, b) => {
    return Number(a) + Number(b);
  };

  const log = (a, b, c) => {
    return a * Math.log(sum(b, c));
  };

  useEffect(() => {
    if (loteka.length > 0 && lastRes.length > 0) {
    const calculateCombinations = (
      leidsaIndex,
      resultsIndex,
      arrayNums,
      aveNums,
      inicio,
      fin
    ) => {
      const calculatedCombinations = [];
      for (const value of arrayNums) {
        const result = log(value, Number(leidsaIndex), Number(resultsIndex));
        const logNumber =
          (aveNums * Number(leidsaIndex) * Number(resultsIndex)) /
          Math.pow(result, 2);
        const results = Math.abs(
          Math.round(
            (Math.log(logNumber) * 38) /
              Math.pow(720, Math.pow(-sum(leidsaIndex, resultsIndex), -1))
          )
        );
        if (results >= inicio && results <= fin) {
          calculatedCombinations.push(results);
        }
      }
      return calculatedCombinations;
    };

    setCombinacionOne(
      calculateCombinations(
        lotekaArray[12],
        lastRes[31],
        OneNumber,
        OneAverage,
        0,
        22
      )
    );
    setCombinacionTwo(
      calculateCombinations(
        lotekaArray[13],
        lastRes[32],
        TwoNumber,
        twoAverage,
        2,
        29
      )
    );
    setCombinacionTres(
      calculateCombinations(
        lotekaArray[14],
        lastRes[33],
        ThreeNumber,
        ThreeAverage,
        3,
        33
      )
    );
    setCombinationCuatro(
      calculateCombinations(
        lotekaArray[15],
        lastRes[34],
        fourNumber,
        fourAverage,
        4,
        34
      )
    );
    setCombinationCinco(
      calculateCombinations(
        lotekaArray[16],
        lastRes[35],
        fiveNumber,
        fiveAverage,
        12,
        37
      )
    );
    setCombinationSeis(
      calculateCombinations(
        lotekaArray[17],
        lastRes[36],
        sixNumber,
        sixAverage,
        19,
        38
      )
    );
  }}, [leidsa]);

  const renderRows = (combinations, results, styles, columnIndex) => {
    combinations.sort((a, b) => a[columnIndex] - b[columnIndex]);

    return (
      <LinearGradient
        colors={['#0065B8', '#004E8F']}
        start={[0.01, 0.1]}
        key={columnIndex}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          borderRadius: 7,
          borderWidth: 1,
          borderColor: '#effafc',
          width: '90%',
          alignSelf: 'center',
          marginVertical: 10,
        }}
      >
        {combinations.map((combination, rowIndex) => (
          <TouchableOpacity
            key={rowIndex}
            onPress={() => logColumnValues(combinations, columnIndex)}
            style={{ marginVertical: 10 }}
          >
            <Text
              style={[
                styles.numbers,
                results.includes(combination[columnIndex]) &&
                  styles.highlightedNumber,
              ]}
            >
              {combination[columnIndex]}
            </Text>
          </TouchableOpacity>
        ))}
      </LinearGradient>
    );
  };

  const logColumnValues = (combinations, columnIndex) => {
    const valuesToLog = combinations.map(
      (combination) => combination[columnIndex]
    );
    savedNumberLoteka(valuesToLog);
  };

  useEffect(() => {
    const sortData = () => {
      const sortedArray = [...myCombination];
      sortedArray.sort((a, b) => a - b);
      setSortedData(sortedArray);
    };

    sortData();
  }, [myCombination]);

  const handleNavigation = () => {
    navigation.navigate('genAI');
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ marginHorizontal: 20, fontWeight: 'bold', fontSize: 18, marginTop: 15, textAlign: 'center' }}>
        Numeros generados Loteka
      </Text>
      <OkMessage message={message} />
      {proMember != false ?
      
      <TouchableOpacity onPress={handleNavigation} 
        style={{borderWidth: 1, paddingVertical: 10, 
        paddingHorizontal: 12, alignSelf: 'center',
        borderRadius: 5, marginTop: 10
        }}>
        <Text>
          Pale y Tripleta loteka con AI
        </Text>
      </TouchableOpacity> :
      <TouchableOpacity onPress={handleNavigation} 
        style={{borderWidth: 1, paddingVertical: 10, 
        paddingHorizontal: 12, alignSelf: 'center',
        borderRadius: 5, marginTop: 10
        }}>
        <Text>
          Hacerse Miembro Pro para usar AI 
        </Text>
      </TouchableOpacity>
    }

{lotekaLoading ? (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0000ff" />
      ) : (

      <ScrollView style={{ flexDirection: '', marginTop: 20, marginBottom: 30 }}>
        {renderRows(
          [combinacionOne, combinacionTwo, combinacionTres, combinacionCuatro, combinacionCinco, combinacionSeis],
          results,
          styles,
          0
        )}
        {renderRows(
          [combinacionOne, combinacionTwo, combinacionTres, combinacionCuatro, combinacionCinco, combinacionSeis],
          results,
          styles,
          1
        )}
        {renderRows(
          [combinacionOne, combinacionTwo, combinacionTres, combinacionCuatro, combinacionCinco, combinacionSeis],
          results,
          styles,
          2
        )}
        {renderRows(
          [combinacionOne, combinacionTwo, combinacionTres, combinacionCuatro, combinacionCinco, combinacionSeis],
          results,
          styles,
          3
        )}
        {renderRows(
          [combinacionOne, combinacionTwo, combinacionTres, combinacionCuatro, combinacionCinco, combinacionSeis],
          results,
          styles,
          4
        )}
        {renderRows(
          [combinacionOne, combinacionTwo, combinacionTres, combinacionCuatro, combinacionCinco, combinacionSeis],
          results,
          styles,
          5
        )}
        {renderRows(
          [combinacionOne, combinacionTwo, combinacionTres, combinacionCuatro, combinacionCinco, combinacionSeis],
          results,
          styles,
          6
        )}
        {renderRows(
          [combinacionOne, combinacionTwo, combinacionTres, combinacionCuatro, combinacionCinco, combinacionSeis],
          results,
          styles,
          7
        )}
        {/* {renderRows([combinacionOne, combinacionTwo, combinacionTres, combinacionCuatro, combinacionCinco, combinacionSeis], results, styles, 8)} */}



            <View>
                <Text style={{textAlign: 'center'}}>Incrementa tus posibilidades de ser Millonario y ganar generando combinaciones con nuestra Inteligencia Aritificial.</Text>
            </View>
            </ScrollView>
      )}
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

export default GeneradorFormulaLoteka;