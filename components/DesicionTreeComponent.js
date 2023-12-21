import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
// import DecisionTree from '../custom/DecisionTree';
import { DecisionTree } from '@rhodri_davies/decision-tree-js'

export default function App() {
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    // Move the decision tree-related code here
    const trainingData = [
      ['15', 22, '14'],
      ['17', 15, '22'],
      ['14', 17, '15'],
      ['15', 14, '17'],
      ['16', 15, '14'],
    ];

    const headers = ['color', 'diameter'];

    const decisionTree = new DecisionTree(trainingData, headers);

    const predict = decisionTree.predict(['22', 14]);
    const firstKey = Object.keys(predict.class)[0];
    setPrediction(firstKey);

    console.log(predict.class);
    console.log(predict.rule);
    console.log(firstKey);
  }, []); 


  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>Leidsa Pale AI</Text>
      
      {/* <Button title="Predict" onPress={handlePrediction} /> */}
      {prediction !== null && (
        <Text>Prediction: {prediction}</Text>
      )}
    </View>
  );
}
