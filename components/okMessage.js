import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get("screen").width;

const OkMessage = ({ message }) => {
  const [displayMessage, setDisplayMessage] = useState(message);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setDisplayMessage(null); // Set the message to null after 10 seconds
      }, 5000); // 10000 milliseconds = 10 seconds 5000 milliseconds = 5 sec

      return () => {
        clearTimeout(timeout); // Clear the timeout if the component unmounts
      };
    }
  }, [message]);

  if (!displayMessage) {
    return null; // If there's no message, return nothing
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{displayMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: '#5bae5b',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignSelf: 'center'
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
});

export default OkMessage;
