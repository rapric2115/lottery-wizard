import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';

class NeuralNetwork {
  constructor(inputSize, hiddenSize, outputSize) {
    this.inputSize = inputSize;
    this.hiddenSize = hiddenSize;
    this.outputSize = outputSize;
    this.weightsInputToHidden = Array.from({ length: hiddenSize }, () =>
      Array.from({ length: inputSize }, () => Math.random() * 2 - 1)
    );
    this.biasHidden = Array(hiddenSize).fill(0);
    this.weightsHiddenToOutput = Array.from({ length: outputSize }, () =>
      Array.from({ length: hiddenSize }, () => Math.random() * 2 - 1)
    );
    this.biasOutput = Array(outputSize).fill(0);
    this.hiddenLayer = new Array(this.hiddenSize);
    this.learningRate = 0.1;

    this.sigmoid = (x) => 1 / (1 + Math.exp(-x));
  }

  feedForward(inputs) {
    for (let i = 0; i < this.hiddenSize; i++) {
      this.hiddenLayer[i] = 0;
      for (let j = 0; j < this.inputSize; j++) {
        this.hiddenLayer[i] +=
          this.weightsInputToHidden[i][j] * inputs[j];
      }
      this.hiddenLayer[i] += this.biasHidden[i];
      this.hiddenLayer[i] = this.sigmoid(this.hiddenLayer[i]);
    }

    const output = new Array(this.outputSize);
    for (let i = 0; i < this.outputSize; i++) {
      output[i] = 0;
      for (let j = 0; j < this.hiddenSize; j++) {
        output[i] +=
          this.weightsHiddenToOutput[i][j] * this.hiddenLayer[j];
      }
      output[i] += this.biasOutput[i];
      output[i] = this.sigmoid(output[i]);
    }
    return output;
  }

  train(inputs, target) {
    for (let i = 0; i < this.hiddenSize; i++) {
      this.hiddenLayer[i] = 0;
      for (let j = 0; j < this.inputSize; j++) {
        this.hiddenLayer[i] +=
          this.weightsInputToHidden[i][j] * inputs[j];
      }
      this.hiddenLayer[i] += this.biasHidden[i];
      this.hiddenLayer[i] = this.sigmoid(this.hiddenLayer[i]);
    }

    const output = new Array(this.outputSize);
    for (let i = 0; i < this.outputSize; i++) {
      output[i] = 0;
      for (let j = 0; j < this.hiddenSize; j++) {
        output[i] +=
          this.weightsHiddenToOutput[i][j] * this.hiddenLayer[j];
      }
      output[i] += this.biasOutput[i];
      output[i] = this.sigmoid(output[i]);
    }

    const errorsOutput = new Array(this.outputSize);
    const errorsHidden = new Array(this.hiddenSize);

    for (let i = 0; i < this.outputSize; i++) {
      errorsOutput[i] = target[i] - output[i];
      for (let j = 0; j < this.hiddenSize; j++) {
        this.weightsHiddenToOutput[i][j] +=
          this.learningRate *
          errorsOutput[i] *
          output[i] *
          (1 - output[i]) *
          this.hiddenLayer[j];
      }
      this.biasOutput[i] += this.learningRate * errorsOutput[i];
    }

    for (let i = 0; i < this.hiddenSize; i++) {
      errorsHidden[i] = 0;
      for (let j = 0; j < this.outputSize; j++) {
        errorsHidden[i] +=
          this.weightsHiddenToOutput[j][i] * errorsOutput[j];
      }
      this.biasHidden[i] += this.learningRate * errorsHidden[i];
      for (let j = 0; j < this.inputSize; j++) {
        this.weightsInputToHidden[i][j] +=
          this.learningRate *
          errorsHidden[i] *
          this.hiddenLayer[i] *
          (1 - this.hiddenLayer[i]) *
          inputs[j];
      }
    }
  }
}

class AISix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenNodes: 3,
      trainingIterations: 1000,
      numPoints: 100,
      trainingData: [
        { x: -1, y: -0.5, label: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { x: -1, y: -0.25, label: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { x: -1, y: 0, label: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { x: -1, y: 0.25, label: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { x: -1, y: 0.5, label: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { x: -0.5, y: -0.5, label: [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { x: -0.5, y: -0.25, label: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0] },
        { x: -0.5, y: 0, label: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0] },
        { x: -0.5, y: 0.25, label: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0] },
        { x: -0.5, y: 0.5, label: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0] },
        { x: 0, y: -0.5, label: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0] },
        { x: 0, y: -0.25, label: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0] },
        { x: 0, y: 0, label: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0] },
        { x: 0, y: 0.25, label: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0] },
        { x: 0, y: 0.5, label: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1] },
        { x: 0.5, y: -0.5, label: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { x: 0.5, y: -0.25, label: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      ],
      six: '0',
    };

    this.neuralNetwork = new NeuralNetwork(2, this.state.hiddenNodes, 15);
    this.initializeNueralNetwork();
  }

  async initializeNueralNetwork() {
    try{
      await this.initialize();
      console.log('Neural network initialized successfully.');
    } catch (error) {
      console.error('Error initializing neural network:', error.message);
    }
  }

  initialize = async () => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  };

  train = async () => {
    return new Promise((resolve, reject) => {
      if (this.neuralNetwork) {
        for (let i = 0; i < this.state.trainingIterations; i++) {
          const data = this.state.trainingData[
            Math.floor(Math.random() * this.state.trainingData.length)
          ];
          this.neuralNetwork.train([data.x, data.y], data.label);
        }
        resolve();
      } else {
        reject(new Error('Neural network not initialized. Please initialize before training.'));
      }
    });
  };

  classifyPoints = () => {
    return new Promise((resolve, reject) => {

        const predictedLabels = [];
      
        for (let i = 0; i < this.state.numPoints; i++) {
          const x = Math.random() * 2 - 1;
          const y = Math.random() * 2 - 1;
          const output = this.neuralNetwork.feedForward([x, y]);
      
          const predictedLabel = this.decodePredictedLabel(output);
      
          predictedLabels.push(predictedLabel);
        }
      
        // Now you can use the predictedLabels array as needed
    
        function findMostFrequentValue(array) {
            const counts = {};
            let mostFrequentValue = null;
            let maxCount = 0;
          
            for (let i = 0; i < array.length; i++) {
              const value = array[i];
          
              if (counts[value] === undefined) {
                counts[value] = 1;
              } else {
                counts[value]++;
              }
          
              if (counts[value] > maxCount) {
                mostFrequentValue = value;
                maxCount = counts[value];
              }
            }
          
            return mostFrequentValue;
          }
          
          
          const mostFrequentValue = findMostFrequentValue(predictedLabels);
          this.setState({ six: mostFrequentValue.toString() });
          
    })
  };

  decodePredictedLabel = (output) => {
    // Find the index with the highest probability in the output array
    const predictedIndex = output.indexOf(Math.max(...output));
  
    // Map the index to the corresponding label from your training data
    
    const trainingData = [
      { x: -1, y: -0.5, label: 24 },
      { x: -1, y: -0.25, label: 25 },
      { x: -1, y: 0, label: 26 },
      { x: -1, y: 0.25, label: 27 },
      { x: -1, y: 0.5, label: 28 },
      { x: -0.5, y: -0.5, label: 29 },
      { x: -0.5, y: -0.25, label: 30 },
      { x: -0.5, y: 0, label: 31 },
      { x: -0.5, y: 0.25, label: 32 },
      { x: -0.5, y: 0.5, label: 33 },
      { x: 0, y: -0.5, label: 34 },
      { x: 0, y: -0.25, label: 35 },
      { x: 0, y: 0, label: 36 },
      { x: 0, y: 0.25, label: 37 },
      { x: 0, y: 0.5, label: 38 },
      { x: 0.5, y: -0.5, label: 39 },
      { x: 0.5, y: -0.25, label: 40 },
    ];
    
    if (predictedIndex >= 0 && predictedIndex < trainingData.length) {
      return trainingData[predictedIndex].label;
    } else {
      return 'Unknown';
    }
  };
  

  render() {
    return (
      <View>
        <Text style={{
            width: 30,
            height: 30,
            borderRadius: 50,
            backgroundColor: '#fff',
            margin: 5,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 18,
            fontWeight: 'bold',
        }}>{this.state.six}</Text>
      </View>
    );
  }
}

export default AISix;
