import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../Auth/AuthContext';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, child, get } from 'firebase/database';
import { firebaseConfig } from '../firebaseConfig';

const AdCard = ({ iconName, title, onPress, ...textStyle }) => {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const [bitcoin, setBitcoin] = useState();
  const [mcmoney, setMcmoney] = useState();
  const [adver, setAdver] = useState();

  const openURL = (url) => {
    Linking.openURL(url).catch((error) => console.error('Error opening URL:', error));
  };

  useEffect(() => {
    getData();
  }, []);

  const AdsRef = ref(db);

  const getData = () => {
    get(child(AdsRef, `lottos/ads/adverting/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data && typeof data === 'object') {
            const dataArray = Object.values(data); // Extract values into an array
            setAdver(dataArray);
          } else {
            console.log("Data is not an object or is empty");
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error fetching adverting data:", error);
      });

    // Loteka
    get(child(AdsRef, `lottos/ads/mcmoney/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data && typeof data === 'object') {
            const dataArray = Object.values(data); // Extract values into an array
            setMcmoney(dataArray);
          } else {
            console.log("Data is not an object or is empty");
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error fetching mcmoney data:", error);
      });
  };

  return (
    <View>
      <TouchableOpacity style={styles.adContainer} onPress={() => openURL('https://freebitco.in/?r=1239559')}>
        <MaterialCommunityIcons name={iconName} size={70} color="#F9AA4B" />
        <Text style={[styles.text, { ...textStyle }]}>{title}</Text>
      </TouchableOpacity>

      {mcmoney && mcmoney[1] && mcmoney[2] && (
        <TouchableOpacity style={styles.adContainer} onPress={() => openURL(mcmoney[2])}>
          <MaterialCommunityIcons name={mcmoney[1]} size={70} color="#F9AA4B" />
          <Text style={[styles.text, { ...textStyle }]}>{mcmoney[0]}</Text>
        </TouchableOpacity>
      )}

      {adver && adver[1] && adver[2] && adver[0] !== 'no' && (
        <TouchableOpacity style={styles.adContainer} onPress={() => openURL(adver[2])}>
          <MaterialCommunityIcons name={adver[1]} size={70} color="#F9AA4B" />
          <Text style={[styles.text, { ...textStyle }]}>{adver[0]}</Text>
        </TouchableOpacity>
      )}
     
    </View>
  );
};

const styles = StyleSheet.create({
  adContainer: {
    backgroundColor: '#2691b4',
    width: 370,
    borderRadius: 7,
    flexDirection: 'row',
    padding: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  text: {
    color: 'snow',
    alignSelf: 'center',
    textAlign: 'center',
    width: '80%',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
});

export default AdCard;
