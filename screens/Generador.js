import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Predictions from '../components/prediction';
import { AuthContext } from '../Auth/AuthContext';

const GeneradorFormula = () => {
    
    const { uno, dos, tres, cuatro, cinco, seis, mas, superMas,
        unoSecond, dosSecond, tresSecond, cuatroSecond, cincoSecond, seisSecond, masSecond, superMasSecond } = useContext(AuthContext);
    const numeros = [uno, dos, tres, cuatro, cinco, seis];
    const sumax = [mas, superMas];
    const results = [uno, dos, tres, cuatro, cinco, seis];
    const resultMax = [mas, superMas];
    
    const [combinacionCinco, setCombinationCinco] = useState([]);

    const fiveNumber = [30, 29, 28, 27, 27.7];
    const fiveAverage = 27.88748875;
    const sum = (a, b) => {
        return a + b;
    }
    const log = (a, b, c) => {
        return a * (Math.log(sum(b, c)) / Math.log(8.7));
    }

    useEffect(() => {
        const calculateCombinations = () => {
            const calculatedCombinations = [];
            for (const value of fiveNumber) {
                const result = log(value, cinco, cincoSecond);
                const logNumber = (fiveAverage * cinco * cincoSecond) / Math.pow(result, 2);
                const cincoResults = Math.round((Math.log(logNumber) * 38) / (Math.pow(720, Math.pow(-sum(cinco, cincoSecond), -1))));
                calculatedCombinations.push(cincoResults);
            }
            setCombinationCinco(calculatedCombinations);
        };

        calculateCombinations();
    }, [cinco, cincoSecond, fiveAverage]);

    for ( const fiv of fiveNumber ) {
        const result = log(fiv, cinco, cincoSecond);
        console.log(`for ${fiv} is ${result}`)
    }


    return(
        <View>
            <Text></Text>
            <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'center'}}>            
                {
                    numeros.map((nums, i) => (
                        <Text style={[styles.numbers, results.includes(nums) && styles.highlightedNumber]} key={i}>{nums}</Text>
                    ))
                }
                {
                    sumax.map((nummax, i) => (
                        <Text style={[styles.numbers, resultMax.includes(nummax) && styles.highlightedNumber]} key={i}>{nummax}</Text>
                    ))
                }            
            </View>
            <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center'}}>
                <View>
                    <Text>Uno</Text>
                </View>
                <View>
                    <Text>Dos</Text>
                </View>
                <View>
                    <Text>Tres</Text>
                </View>
                <View>
                    <Text>Cuantro</Text>
                </View>
                <View>
                    {
                        combinacionCinco.map((five, i) => (
                         <Text style={[styles.numbers, results.includes(five) && styles.highlightedNumber]} key={i}>{five}</Text>
                        ))
                    }
                </View>
                <View>
                    <Text>Seis</Text>
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