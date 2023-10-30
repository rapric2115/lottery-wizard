import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format, differenceInSeconds } from 'date-fns';
import { es } from 'date-fns/locale'; // Import the 'es' (Spanish) locale

const CountdownTimer = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const endDate = new Date(targetDate);
      const secondsRemaining = differenceInSeconds(endDate, now);

      if (secondsRemaining <= 0) {
        clearInterval(interval); // Stop the countdown when the target date is reached.
      } else {
        const days = Math.floor(secondsRemaining / 86400);
        const hours = Math.floor((secondsRemaining % 86400) / 3600);
        const minutes = Math.floor((secondsRemaining % 3600) / 60);
        const seconds = secondsRemaining % 60;

        setTimeRemaining({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [targetDate]);

  return (
    <View>
      <Text>{timeRemaining.days} days</Text>
      <Text>{timeRemaining.hours} hours</Text>
      <Text>{timeRemaining.minutes} minutes</Text>
      <Text>{timeRemaining.seconds} seconds</Text>
    </View>
  );
};

export default CountdownTimer;
