import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../Auth/AuthContext';

const AdCard = ({ iconName, title, onPress, ...textStyle }) => {
  const { advert1, advert1Name, advert1Content,
          advert2, advert2Name, advert2Content,
          advert3, advert3Name, advert3Content
        } = useContext(AuthContext);

  const openURL = (url) => {
    Linking.openURL(url).catch((error) => console.error('Error opening URL:', error));
  };

  const advertising = [
    {
      id: 1,
      name: advert1Name,
      url: advert1,
      content: advert1Content
    },
    {
      id: 2,
      name: advert2Name,
      url: advert2,
      content: advert2Content
    },
    {
      id: 3,
      name: advert3Name,
      url: advert3,
      content: advert3Content
    }
  ];

  const filteredAdvertising = advertising.filter((item) => item.content); // Filter out items with no content

  return (
    <View>
      <TouchableOpacity style={styles.adContainer} onPress={() => openURL('https://freebitco.in/?r=1239559')}>
        <MaterialCommunityIcons name={iconName} size={70} color="#F9AA4B" />
        <Text style={[styles.text, { ...textStyle }]}>{title}</Text>
      </TouchableOpacity>
      {filteredAdvertising.map((item) => (
        <TouchableOpacity style={styles.adContainer} onPress={() => openURL(item.url)} key={item.id}>
          <MaterialCommunityIcons name={item.name} size={70} color="#F9AA4B" />
          <Text style={[styles.text, { ...textStyle }]}>{item.content}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  adContainer: {
    backgroundColor: '#247ba0',
    width: 370,
    borderRadius: 7,
    flexDirection: 'row',
    padding: 10,
    marginTop: 20,
    alignSelf: 'center'
  },
  text: {
    color: 'snow',
    alignSelf: 'center',
    textAlign: 'center',
    width: '80%',
    fontSize: 16
  }
});

export default AdCard;
