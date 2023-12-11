import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
// import {brain} from 'brainjs';
// import { SimpleLinearRegression3D } from 'ml-regression';

const GeneradorAI = ({ navigation }) => {
  // State to manage the background color
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); 

  

  // Function to generate a random color
  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBackgroundColor(randomColor);
  };

  const combi = ['7', '10', '25', '33', '35', '38', '11', '4'];

  const combination = {
    r: 0.1428,
    g: 0.1666
  };


const data = [
    { x: 4, y: 1, z: 8 },
    { x: 6, y: 4, z: 1 },
    { x: 3, y: 6, z: 4 },
    { x: 3, y: 3, z: 6 },
    { x: 7, y: 3, z: 3 },
    { x: 10, y: 7, z: 3 },
    { x: 3, y: 10, z: 7 },
    { x: 3, y: 3, z: 10 },
    { x: 7, y: 3, z: 3 },
    { x: 2, y: 7, z: 3 },
    { x: 3, y: 2, z: 7 },

    // Add more data points as needed
  ];


const predict = (array1, array2, val) => {
    var first = array1[0]
    var second = array2[0]
    var firstVal = array1[1]
    var secondVal = array2[1]
    var a = (firstVal - secondVal) / (first - second)
    var b = secondVal - (second * a)
    return val * b;
}


// Extract input and output arrays
const inputs = data.map((point) => [point.x, point.y]);
const outputs = data.map((point) => point.z);

// Create a linear regression model
const regression = new SimpleLinearRegression3D(inputs, outputs);

// Get the coefficients (slope and intercept)
const coefficients = regression.getCoefficients();

console.log('Slope:', coefficients.slope);
console.log('Intercept:', coefficients.intercept);

// Use the model to make predictions
const prediction = regression.predict([newX, newY]);
console.log('Predicted Z:', prediction);



const handlePress = () => {
    generateRandomColor();
    console.log('prediction: ',predict([2,9],[9,3],3))
}




  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Text>Generador combinaciones con AI</Text>
      <View style={{flexDirection: 'row'}}>
        {combi.map((numbers, i) => (
            <Text style={{backgroundColor: '#fff', borderRadius: 50, marginHorizontal: 5, padding: 5,  width: 30,
            height: 30, textAlign: 'center', fontWeight: 'bold'}} key={i}>{numbers}</Text>
        ))}
      </View>
      <TouchableOpacity onPress={handlePress}>
        <Text>Generar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GeneradorAI;
