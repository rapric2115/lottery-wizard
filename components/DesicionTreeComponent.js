import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import DecisionTree from '../custom/DecisionTree';

export default function App() {
  const [age, setAge] = useState('');
  const [income, setIncome] = useState('');
  const [prediction, setPrediction] = useState(null);

  const trainingData = [
    [20, 30000],
    [30, 50000],
    [40, 70000],
    [10, 20000],
    [5, 10000]
    // Add more training data as needed
  ];

  const targetValues = [0, 1, 1];
  // Add more target values as needed

  const decisionTree = new DecisionTree();
  decisionTree.train(trainingData, targetValues);

  const handlePrediction = () => {
    const newInput = [parseInt(age), parseInt(income)];
    const result = decisionTree.predict(newInput);
    console.log('The results in DesicionComponent', result);
    setPrediction(result);
  };

  console.log('Training Data:', trainingData);
  console.log('Target Values:', targetValues);
  console.log('Trained Decision Tree:', decisionTree.root);


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Enter Customer Information</Text>
      <TextInput
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={text => setAge(text)}
        style={{ borderBottomWidth: 1, marginBottom: 10, width: 200 }}
      />
      <TextInput
        placeholder="Income"
        keyboardType="numeric"
        value={income}
        onChangeText={text => setIncome(text)}
        style={{ borderBottomWidth: 1, marginBottom: 20, width: 200 }}
      />
      <Button title="Predict" onPress={handlePrediction} />
      {prediction !== null && (
        <Text>Prediction: {prediction}</Text>
      )}
    </View>
  );
}
