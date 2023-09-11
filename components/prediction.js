import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
// import RandomForest from 'random-forest';

const Predictions = () => {
    // const [model, setModel] = useState(null);

    // // Sample training data 
    // const trainingData = [
    //     {features: [1, 2, 3], labels: 'A'},
    //     {features: [4, 5, 6], labels: 'B'}
    // ];

    // //Train the model when the component mounts
    // useEffect(() => {
    //   const trainedModel = trainModel(trainingData);
    //   setModel(trainedModel);
    // }, []);

    // // Function to train the Random Forest Model
    // const trainModel = (data) => {
    //     const model = new RandomForest({ numTrees: 10});
    //     model.train(data);
    //     return model;
    // }

    // // Function to make prediction
    // const predictLabel = (model, features) => {
    //     if(!model || !model.isTrained()) {
    //         return  'Model not trained';
    //     }

    //     const prediction = model.predict({features});
    //     return prediction.label; // The predicted label
    // }
    
    const newFeatures = [7, 8, 9];

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* {model ? (
          <Text>Prediction: {predictLabel(model, newFeatures)}</Text>
        ) : (
          <Text>Training the model...</Text>
        )} */}
        <Button title="Make Prediction" onPress={() => predictLabel(model, newFeatures)} />
      </View>
    )
}

const styles = StyleSheet.create({});

export default Predictions;