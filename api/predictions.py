import numpy as np
import pandas as pd
import matplotlib.pyplot as plt  # Added for visualization
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, BayesianRidge
from sklearn.ensemble import RandomForestRegressor
from sklearn.tree import DecisionTreeRegressor
from flask import Flask, request, jsonify
from flask_cors import CORS  # Added for CORS support

# Load your dataset from the CSV file
data = pd.read_csv('Training_Data.csv')

# Define your target variable and feature columns
target_column = '28'  # Replace with your target column name
feature_columns = ['8', '12', '20', '22', '23', '28', '8']  # Replace with your feature column names

X = data[feature_columns]
y = data[target_column]

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the Linear Regression model
linear_model = LinearRegression()
linear_model.fit(X_train, y_train)

# Train the Random Forest model
random_forest_model = RandomForestRegressor()
random_forest_model.fit(X_train, y_train)

# Train the Bayesian Regression model
bayesian_model = BayesianRidge()
bayesian_model.fit(X_train, y_train)

# Train the Decision Tree Regression model
decision_tree_model = DecisionTreeRegressor()
decision_tree_model.fit(X_train, y_train)

# Create a Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for your app

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'GET':
        # Handle GET requests here (if needed)
        return jsonify({'message': 'This is a GET request to /predict'})
    elif request.method == 'POST':
        try:
            data = request.json
            input_array1 = np.array(data['input_array1'])
            input_array2 = np.array(data['input_array2'])

            # Ensure input arrays have 7 values each
            if len(input_array1) != 7 or len(input_array2) != 7:
                return jsonify({'error': 'Input arrays must contain 7 values each'}), 400

            # Predict using Linear Regression
            linear_prediction = linear_model.predict([input_array1])
            # Predict using Random Forest
            random_forest_prediction = random_forest_model.predict([input_array2])
            # Predict using Bayesian Regression
            bayesian_prediction = bayesian_model.predict([input_array1])
            # Predict using Decision Tree Regression
            decision_tree_prediction = decision_tree_model.predict([input_array2])

            # Visualize the Linear Regression prediction
            plt.scatter(X_test.iloc[:, 0], y_test, label="Test Data")
            plt.plot(X_test.iloc[:, 0], linear_model.predict(X_test), color="red", label="Linear Regression")
            plt.xlabel("X")
            plt.ylabel("y")
            plt.legend()
            plt.title("Linear Regression Prediction")
            plt.show()

            # Visualize the Random Forest prediction
            plt.scatter(X_test.iloc[:, 0], y_test, label="Test Data")
            plt.plot(X_test.iloc[:, 0], random_forest_model.predict(X_test), color="green", label="Random Forest")
            plt.xlabel("X")
            plt.ylabel("y")
            plt.legend()
            plt.title("Random Forest Prediction")
            plt.show()

            # Visualize the Bayesian Regression prediction
            plt.scatter(X_test.iloc[:, 0], y_test, label="Test Data")
            plt.plot(X_test.iloc[:, 0], bayesian_model.predict(X_test), color="blue", label="Bayesian Regression")
            plt.xlabel("X")
            plt.ylabel("y")
            plt.legend()
            plt.title("Bayesian Regression Prediction")
            plt.show()

            # Visualize the Decision Tree Regression prediction
            plt.scatter(X_test.iloc[:, 0], y_test, label="Test Data")
            plt.plot(X_test.iloc[:, 0], decision_tree_model.predict(X_test), color="orange", label="Decision Tree")
            plt.xlabel("X")
            plt.ylabel("y")
            plt.legend()
            plt.title("Decision Tree Regression Prediction")
            plt.show()

            response = {
                'linear_regression_prediction': linear_prediction.tolist(),
                'random_forest_prediction': random_forest_prediction.tolist(),
                'bayesian_regression_prediction': bayesian_prediction.tolist(),
                'decision_tree_regression_prediction': decision_tree_prediction.tolist()
            }

            return jsonify(response)
        except Exception as e:
            return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
