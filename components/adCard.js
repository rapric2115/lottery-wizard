import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../Auth/AuthContext';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, child, get } from 'firebase/database';
import { firebaseConfig } from '../firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';

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

  // https://static1.freebitco.in/banners/468x60-3.png

  return (
    <View>
       {/* <LinearGradient
         // Button Linear Gradient
         colors={['#72C6EF','#004E8F']}
         start={[0.01, 0.01]}
         style={styles.adContainer}>
          <TouchableOpacity style={styles.adContainer} onPress={() => openURL('https://freebitco.in/?r=1239559')}>
            <MaterialCommunityIcons name={iconName} size={70} color="#F9AA4B" />
            <Text style={[styles.text, { ...textStyle }]}>{title}</Text>
          </TouchableOpacity>
        </LinearGradient> */}
        
        <LinearGradient
         // Button Linear Gradient
         colors={['#FF844B','#EA5C28']}
         start={[0.01, 0.01]}
         style={styles.adContainer}
         >
          <TouchableOpacity style={{ borderRadius: 7}} onPress={() => openURL('https://freebitco.in/?r=1239559')}>
            <Image source={{uri: 'https://static1.freebitco.in/banners/468x60-3.png'}} style={{width: 355, height: 60, resizeMode: 'contain'}}/>
          </TouchableOpacity>
        </LinearGradient>
      

      {mcmoney && mcmoney[1] && mcmoney[2] && (
         <LinearGradient
         // Button Linear Gradient
         colors={['#72C6EF','#004E8F']}
         start={[0.01, 0.01]}
         style={styles.adContainer}>
          <TouchableOpacity style={styles.adContainer} onPress={() => openURL(mcmoney[2])}>
            <MaterialCommunityIcons name={mcmoney[1]} size={70} color="#F9AA4B" />
            <Text style={[styles.text, { ...textStyle }]}>{mcmoney[0]}</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}

      {adver && adver[1] && adver[2] && adver[0] !== 'no' && (
         <LinearGradient
         // Button Linear Gradient
         colors={['#72C6EF','#004E8F']}
        //  start={[0.1, 0.2]}
         start={[0.01, 0.01]}
         style={styles.adContainer}>
          <TouchableOpacity style={styles.adContainer} onPress={() => openURL(adver[2])}>
            <MaterialCommunityIcons name={adver[1]} size={70} color="#F9AA4B" />
            <Text style={[styles.text, { ...textStyle }]}>{adver[0]}</Text>
          </TouchableOpacity>
         </LinearGradient>
      )}
     
    </View>
  );
};

const styles = StyleSheet.create({
  adContainer: {
    // backgroundColor: '#2691b4',
    width: 370,
    borderRadius: 7,
    flexDirection: 'row',
    padding: 8,
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
