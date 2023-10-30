import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get("screen").width;

const ErrorMessage = ({ errorMessage }) => {
  if (!errorMessage) {
    return null; // If there's no error message, return nothing
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * .8,
    backgroundColor: 'red',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignSelf: 'center'
  },
  text: {
    color: 'white',
  },
});

export default ErrorMessage;
