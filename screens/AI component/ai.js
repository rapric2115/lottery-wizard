// import React, { useState } from 'react';
// import { View, Text, Button, Dimensions } from 'react-native';

// const SCREEN_WIDTH = Dimensions.get("screen").width;

// function encode(label) {
//     // Assuming the labels are numerical strings like "1", "2", "3", ...
//     const encoding = new Array(22).fill(0);
//     encoding[parseInt(label) - 1] = 1; // Subtract 1 to convert to a 0-based index
//     return encoding;
// }

// function decode(output) {
//     // Find the index of the maximum value in the output array
//     const maxIndex = output.indexOf(Math.max(...output));
//     // Add 1 to convert the 0-based index back to the numerical label
//     return (maxIndex + 1).toString();
// }

// class NeuralNetwork {
//     constructor(inputLen, outputLen) {
//         this.inputLen = inputLen;
//         this.outputLen = outputLen;
//         this.weights = Array.from({ length: this.outputLen }, () =>
//             Array.from({ length: this.inputLen }, () => Math.random())
//         );
//         // this.bias = Array(this.outputLen).fill(0);
//         this.learningRate = 0.1;
//     }

//     propagate(inputs) {
//         const output = new Array(this.outputLen);
//         for (let i = 0; i < this.outputLen; i++) {
//             output[i] = 0;
//             for (let j = 0; j < this.inputLen; j++) {
//                 output[i] += this.weights[i][j] * inputs[j];
//             }
//             // output[i] += this.bias[i];
//             output[i] = this.sigmoid(output[i]);
//         }
//         return output;
//     }

//     sigmoid(x) {
//         return 1 / (1 + Math.exp(-x));
//     }

//     train(inputs, target) {
//         const output = this.propagate(inputs);
//         const errors = new Array(this.outputLen);

//         for (let i = 0; i < this.outputLen; i++) {
//             errors[i] = target[i] - output[i];
//             for (let j = 0; j < this.inputLen; j++) {
//                 this.weights[i][j] +=
//                     this.learningRate *
//                     errors[i] *
//                     output[i] *
//                     (1 - output[i]) *
//                     inputs[j];
//             }
//             // this.bias[i] += this.learningRate * errors[i];
//         }
//     }
    
// }

// function AIComponent({result}) {
//     const [neuralNetwork, setNeuralNetwork] = useState(new NeuralNetwork(2, 4));
//     const [NumberOne, setNumberOne] = useState('');
//     const [NumberTwo, setNumberTwo] = useState('');
//     const [NumberThree, setNumberThree] = useState('')
//     const [NumberFour, setNumberFour] = useState('');
//     const [NumberFive, setNumberFive] = useState('');
//     const [NumberSix, setNumberSix] = useState('');
//     const [isTrainingComplete, setIsTrainingComplete] = useState(false);


//     async function train() {
//         const network = new NeuralNetwork(2, 4);
//         for (let i = 0; i < 10000; i++) {
//             const data =
//                 trainingData[Math.floor(Math.random() * trainingData.length)];
//             network.train([data.x, data.y], encode(data.label));
//         }
//             const X = { x: -1, y: -0.5 };
//             const output = network.propagate([X.x, X.y]);
//             const predictedLabel = decode(output);
//             setNumberOne(predictedLabel);
        
//     }

//     async function trainSecond() {
//         const network = new NeuralNetwork(2, 4);
//         for (let i = 0; i < 10000; i++) {
//             const data =
//                 secondData[Math.floor(Math.random() * secondData.length)];
//             network.train([data.x, data.y], encode(data.label));
//         }

//             const X = { x: 0, y: -0.5 };
//             const output = network.propagate([X.x, X.y]);
//             const predictedLabel = decode(output);
//             setNumberTwo(predictedLabel);       
//     }

//     async function trainThird() {
//         const network = new NeuralNetwork(2, 4);
//         for (let i = 0; i < 10000; i++) {
//             const data =
//                 thirdData[Math.floor(Math.random() * thirdData.length)];
//             network.train([data.x, data.y], encode(data.label));
//         }

//             const X = { x: 1, y: -0.5 };
//             const output = network.propagate([X.x, X.y]);
//             const predictedLabel = decode(output);
//             setNumberThree(predictedLabel);       
//     }

//     async function trainFour() {
//         const network = new NeuralNetwork(2, 4);
//         for (let i = 0; i < 10000; i++) {
//             const data =
//                 fourData[Math.floor(Math.random() * fourData.length)];
//             network.train([data.x, data.y], encode(data.label));
//         }

//             const X = { x: 1, y: 0 };
//             const output = network.propagate([X.x, X.y]);
//             const predictedLabel = decode(output);
//             setNumberFour(predictedLabel);       
//     }

//     async function trainFive() {
//         const network = new NeuralNetwork(2, 4);
//         for (let i = 0; i < 10000; i++) {
//             const data =
//                 fiveData[Math.floor(Math.random() * fiveData.length)];
//             network.train([data.x, data.y], encode(data.label));
//         }

//             const X = { x: 0, y: 0.5 };
//             const output = network.propagate([X.x, X.y]);
//             const predictedLabel = decode(output);
//             setNumberFive(predictedLabel);       
//     }

//     async function trainSix() {
//         const network = new NeuralNetwork(2, 4);
    
//         // Initialize variables for learning rate range test
//         let learningRate = 1e-6; // Starting learning rate
//         const maxLearningRate = 1; // Maximum learning rate to test
//         const numSteps = 100; // Number of steps
//         let bestLoss = Number.POSITIVE_INFINITY; // Initialize best loss
//         let bestOutput = new Array(4).fill(0); // Initialize best output as an array of zeros
    
//         let optimalLearningRate = 0.1; // Default learning rate
    
//         for (let step = 0; step < numSteps; step++) {
//             network.learningRate = learningRate;
//             let totalLoss = 0;
    
//             // Train for a fixed number of iterations (adjust as needed)
//             for (let i = 0; i < 10000; i++) {
//                 const data = sixData[Math.floor(Math.random() * sixData.length)];
//                 network.train([data.x, data.y], encode(data.label));
//             }
    
//             // Calculate and record the loss using Mean Squared Error (MSE)
//             for (let i = 0; i < 1000; i++) {
//                 const data = sixData[Math.floor(Math.random() * sixData.length)];
//                 const output = network.propagate([data.x, data.y]);
//                 const target = encode(data.label);
                
//                 // Calculate MSE
//                 let loss = 0;
//                 for (let j = 0; j < target.length; j++) {
//                     loss += (target[j] - output[j]) ** 2;
//                 }
//                 totalLoss += loss;
//             }
    
//             const averageLoss = totalLoss / 1000;
    
//             console.log(`Step ${step}: Learning Rate ${learningRate}, Loss ${averageLoss}`);
    
//             if (step > 0 && averageLoss < bestLoss) {
//                 optimalLearningRate = learningRate;
//                 bestLoss = averageLoss;
//                 bestOutput = network.propagate([1, 0.5]); // Store the output with the lowest loss
//             }
    
//             learningRate *= 1.2; // Increase learning rate (adjust multiplier as needed)
//             if (learningRate > maxLearningRate) {
//                 break; // Stop if learning rate exceeds the maximum
//             }
//         }
    
            
//         // Set the network's learning rate to the optimal value
//         network.learningRate = optimalLearningRate;
    
//         // Now, you can use the best output for prediction
//         const predictedLabel = decode(bestOutput);
//         setNumberSix(predictedLabel);
//     }
    
    
//     function reset() {
//         setNeuralNetwork(new NeuralNetwork(2, 4));
//         setNumberOne('')
//         setNumberTwo('')
//         setNumberThree('');
//         setNumberFour('');
//         setNumberFive('');
//         setNumberSix('');
//     }

    

//     const firstData = [
//         { x: -1, y: -0.5, label: "1" },
//         { x: -0.5, y: -0.5, label: "2" },
//         { x: 0, y: -0.5, label: "3" },
//         { x: 0.5, y: -0.5, label: "4" },
//         { x: 1, y: -0.5, label: "5" },
//         { x: 0, y: 1, label: "6" },
//         { x: 0, y: 0.5, label: "7" },
//         { x: 0, y: 0, label: "8" },
//         { x: 0.5, y: 0, label: "9" },
//         { x: 1, y: 0, label: "10" },
//         { x: -1, y: 0.5, label: "11" },
//         { x: -0.5, y: 0.5, label: "12" },
//         { x: -0.5, y: 0, label: "13" },
//         { x: 0.5, y: 0.5, label: "14" },
//         { x: 1, y: 0.5, label: "15" },
//     ];

//     const secondData = [
//         { x: -1, y: -0.5, label: "4" },
//         { x: -0.5, y: -0.5, label: "5" },
//         { x: 0, y: -0.5, label: "6" },
//         { x: 0.5, y: -0.5, label: "7" },
//         { x: 1, y: -0.5, label: "8" },
//         { x: 0, y: 1, label: "9" },
//         { x: 0, y: 0.5, label: "10" },
//         { x: 0, y: 0, label: "11" },
//         { x: 0.5, y: 0, label: "12" },
//         { x: 1, y: 0, label: "13" },
//         { x: -1, y: 0.5, label: "14" },
//         { x: -0.5, y: 0.5, label: "15" },
//         { x: -0.5, y: 0, label: "16" },
//         { x: 0.5, y: 0.5, label: "17" },
//         { x: 1, y: 0.5, label: "19" },
//     ];

//     const thirdData = [
//         { x: -1, y: -0.5, label: "10" },
//         { x: -0.5, y: -0.5, label: "11" },
//         { x: 0, y: -0.5, label: "12" },
//         { x: 0.5, y: -0.5, label: "13" },
//         { x: 1, y: -0.5, label: "14" },
//         { x: 0, y: 1, label: "15" },
//         { x: 0, y: 0.5, label: "16" },
//         { x: 0, y: 0, label: "17" },
//         { x: 0.5, y: 0, label: "18" },
//         { x: 1, y: 0, label: "19" },
//         { x: -1, y: 0.5, label: "20" },
//         { x: -0.5, y: 0.5, label: "21" },
//         { x: -0.5, y: 0, label: "22" },
//         { x: 0.5, y: 0.5, label: "23" },
//         { x: 1, y: 0.5, label: "24" },
//     ];

//     const fourData = [
//         { x: -1, y: -0.5, label: "16" },
//         { x: -0.5, y: -0.5, label: "17" },
//         { x: 0, y: -0.5, label: "18" },
//         { x: 0.5, y: -0.5, label: "19" },
//         { x: 1, y: -0.5, label: "20" },
//         { x: 0, y: 1, label: "21" },
//         { x: 0, y: 0.5, label: "22" },
//         { x: 0, y: 0, label: "23" },
//         { x: 0.5, y: 0, label: "24" },
//         { x: 1, y: 0, label: "25" },
//         { x: -1, y: 0.5, label: "26" },
//         { x: -0.5, y: 0.5, label: "27" },
//         { x: -0.5, y: 0, label: "28" },
//         { x: 0.5, y: 0.5, label: "29" },
//         { x: 1, y: 0.5, label: "30" },
//     ];

//     const fiveData = [
//         { x: -1, y: -0.5, label: "22" },
//         { x: -0.5, y: -0.5, label: "23" },
//         { x: 0, y: -0.5, label: "24" },
//         { x: 0.5, y: -0.5, label: "25" },
//         { x: 1, y: -0.5, label: "26" },
//         { x: 0, y: 1, label: "27" },
//         { x: 0, y: 0.5, label: "28" },
//         { x: 0, y: 0, label: "29" },
//         { x: 0.5, y: 0, label: "30" },
//         { x: 1, y: 0, label: "31" },
//         { x: -1, y: 0.5, label: "32" },
//         { x: -0.5, y: 0.5, label: "33" },
//         { x: -0.5, y: 0, label: "34" },
//         { x: 0.5, y: 0.5, label: "35" },
//         { x: 1, y: 0.5, label: "36" },
//     ];

//     const sixData = [
//         { x: -1, y: -0.5, label: "24" },
//         { x: -0.5, y: -0.5, label: "25" },
//         { x: 0, y: -0.5, label: "26" },
//         { x: 0.5, y: -0.5, label: "27" },
//         { x: 1, y: -0.5, label: "28" },
//         { x: 0, y: 1, label: "29" },
//         { x: 0, y: 0.5, label: "30" },
//         { x: 0, y: 0, label: "31" },
//         { x: 0.5, y: 0, label: "32" },
//         { x: 1, y: 0, label: "33" },
//         { x: -1, y: 0.5, label: "34" },
//         { x: -0.5, y: 0.5, label: "35" },
//         { x: -0.5, y: 0, label: "36" },
//         { x: 0.5, y: 0.5, label: "37" },
//         { x: 1, y: 0.5, label: "38" },
//     ];
    
//     const handleTraining = async () => {
//         setIsTrainingComplete(false);

//         // Use Promise.all to await all training functions
//         await Promise.all([train(), trainSecond(), trainThird(), trainFour(), trainFive(), trainSix()]);

//         setIsTrainingComplete(true);
//     }

//     // let colorName = '';

//     return {
//         <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
//             <Text>Neural Network Demo</Text>
//             <View style={{flexDirection: 'row', width: SCREEN_WIDTH * .8, justifyContent: 'center'}}>
//                <Text>{NumberOne} -</Text>
//                <Text>{NumberTwo} -</Text>
//                <Text>{NumberThree} -</Text>
//                <Text>{NumberFour} -</Text>
//                <Text>{NumberFive} -</Text>
//                <Text>{NumberSix}</Text>
//             </View>
//             <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: SCREEN_WIDTH * .8, marginTop: 10}}>
//                 <Button title="Train" onPress={handleTraining} />
//                 <Button title="Reset" onPress={reset} />
//             </View>
//         </View>
//     );
// }

// export default AIComponent;


