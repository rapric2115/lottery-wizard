import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from 'firebase/database';
import { firebaseConfig } from '../firebaseConfig';

const ImageAds = () => {
  const [adver, setAdver] = useState([]);

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  useEffect(() => {
    getData();
  }, []);

  const AdsRef = ref(db);

  const getData = () => {
    get(child(AdsRef, `ads`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data && typeof data === 'object') {
            const dataArray = Object.values(data);
            setAdver(dataArray);
          } else {
            console.log("Data is not an object or is empty");
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error fetching advertising data:", error);
      });
  };

  const openURL = (link) => {
    Linking.openURL(link).catch((error) => console.error('Error opening URL:', error));
  };

  if (!adver || adver.length === 0) {
    return null;
  }

  return (
    <TouchableOpacity onPress={() => openURL(adver[1])}>
      {adver[0] && (
        <View style={styles.container}>
          <Image source={{ uri: adver[0] }} style={styles.image} />
          <Text style={styles.text}>Image Ad</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  text: {
    backgroundColor: '#72C6EF',
    marginTop: -40,
    color: '#fff',
    padding: 7,
  },
});

export default ImageAds;
