// DecisionTree.js
class TreeNode {
    constructor(value, left = null, right = null) {
      this.value = value;
      this.left = left;
      this.right = right;
    }
  }
  
  class DecisionTree {
    constructor() {
      this.root = null;
    }
  
    train(data, target) {
      this.root = this.buildTree(data, target);
    }
  
    buildTree(data, target) {
      if (data.length === 0) {
        // Handle base case
        return null;
      }
  
      const bestSplit = this.findBestSplit(data, target);
  
      if (!bestSplit) {
        // Handle leaf node creation
        const leafValue = this.calculateLeafValue(target);
        return new TreeNode({ value: leafValue });
    }    
  
      const { featureIndex, threshold } = bestSplit;
  
      const leftData = [];
      const leftTarget = [];
      const rightData = [];
      const rightTarget = [];
  
      for (let i = 0; i < data.length; i++) {
        if (data[i][featureIndex] <= threshold) {
          leftData.push(data[i]);
          leftTarget.push(target[i]);
        } else {
          rightData.push(data[i]);
          rightTarget.push(target[i]);
        }
      }
  
      const leftNode = this.buildTree(leftData, leftTarget);
      const rightNode = this.buildTree(rightData, rightTarget);
  
      return new TreeNode({ featureIndex, threshold }, leftNode, rightNode);
    }
  
    findBestSplit(data, target) {
        const numFeatures = data[0].length;
        const numSamples = data.length;
        
        let bestGini = Infinity;
        let bestSplit = null;
    
        for (let featureIndex = 0; featureIndex < numFeatures; featureIndex++) {
          // Sort data based on the current feature
          data.sort((a, b) => a[featureIndex] - b[featureIndex]);
    
          for (let i = 1; i < numSamples; i++) {
            const threshold = (data[i - 1][featureIndex] + data[i][featureIndex]) / 2;
    
            const left = [];
            const right = [];
    
            for (let j = 0; j < numSamples; j++) {
              if (data[j][featureIndex] <= threshold) {
                left.push(target[j]);
              } else {
                right.push(target[j]);
              }
            }
    
            // Calculate Gini impurity for the split
            const gini = this.calculateGini(left, right);
    
            // Update the best split if the current split is better
            if (gini < bestGini) {
              bestGini = gini;
              bestSplit = { featureIndex, threshold };
            }
          }
        }
    
        return bestSplit;
      }

      // Function to calculate Gini impurity
    calculateGini(left, right) {
        const total = left.length + right.length;
        const giniLeft = this.calculateNodeGini(left);
        const giniRight = this.calculateNodeGini(right);

        const weightedGini = (left.length / total) * giniLeft + (right.length / total) * giniRight;

        return weightedGini;
    }

    // Function to calculate Gini impurity for a node
    calculateNodeGini(node) {
        if (node.length === 0) {
        return 0;
        }

        const counts = this.countClassOccurrences(node);
        const probabilities = counts.map(count => count / node.length);
        
        // Gini impurity formula
        const gini = 1 - probabilities.reduce((sum, prob) => sum + prob**2, 0);

        return gini;
    }
  
      // Function to count occurrences of each class in a node
    countClassOccurrences(node) {
        const counts = {};

        for (const value of node) {
        counts[value] = (counts[value] || 0) + 1;
        }

        return Object.values(counts);
    }

   // Function to calculate the predicted class for a leaf node in a classification tree
   calculateLeafValue(target) {
    const counts = this.countClassOccurrences(target);
    const maxCount = Math.max(...counts);

    // Find all classes with the maximum count
    const mostFrequentClasses = Object.keys(counts).filter((key) => counts[key] === maxCount);

    // If there is only one most frequent class, return it; otherwise, return a random one
    const mostFrequentClass = mostFrequentClasses.length === 1 ? mostFrequentClasses[0] : mostFrequentClasses[Math.floor(Math.random() * mostFrequentClasses.length)];

    return mostFrequentClass;
}

  
  
    predict(input) {
      return this.traverseTree(input, this.root);
    }
  
    traverseTree(input, node) {
        console.log('This is the input DT', input);
        console.log('This is the node DT', node);

        if (node.left === null && node.right === null) {
            return node.value.value; // For a leaf node, return the leaf value directly
          }
          

        const { featureIndex, threshold } = node.value;
      
        if (input[featureIndex] <= threshold) {
          return this.traverseTree(input, node.left);
        } else {
          return this.traverseTree(input, node.right);
        }
      }
      
  }
  
  export default DecisionTree;
  