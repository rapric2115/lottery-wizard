import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../Auth/AuthContext';


const Result = () => {
    const { acumulado, uno, dos, tres, cuatro, cinco, seis, mas, superMas, fecha } = useContext(AuthContext);

    const resultado = [uno, dos, tres, cuatro, cinco, seis];
    const resultadoMax = [ mas, superMas ]
    

    return(
        <View style={styles.container}>
            <Text>Leidsa</Text>
            <Text style={{fontSize: 38, fontWeight: 'bold'}}>RESULTADO</Text>
            <Text>Fecha {fecha}</Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
                {resultado.map((item, i) => (
                    <Text key={i} style={styles.results}>{item}</Text>
                ))}
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                {resultadoMax.map((item, i) => (
                    <Text key={i} style={styles.resultsMax}>{item}</Text>
                ))}
            </View>
            <Text>Acumulado</Text>
            <Text style={{fontSize: 38, fontWeight: 'bold', alignSelf: 'center'}}>RD$ {acumulado} Millones</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 370,
        height: 333,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 7,
        marginVertical: 15,
        padding: 5
    },
    results: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#cbd4c2',
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