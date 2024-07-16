import React, { useContext, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, } from 'react-native';
import { AuthContext } from '../Auth/AuthContext';
import { useNavigation } from '@react-navigation/native';

import AITest from './AI component/ai';
import AIOne from './AI component/AIOne';
import AITwo from './AI component/AITwo';
import AIThree from './AI component/AIThree';
import AIFour from './AI component/AIFour';
import AIFive from './AI component/AIFive';
import AISix from './AI component/AISix';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const width = Dimensions.get('screen').width;

const AIGen = ({}) => {
  const { proMember } = useContext(AuthContext);

  const AIone = useRef(null);
  const AItwo = useRef(null);
  const AIthree = useRef(null);
  const AIfour = useRef(null);
  const AIfive = useRef(null);
  const AIsix = useRef(null);

  const AItest = useRef(null);

  const callAIFunctions = async () => {
    try {
      await Promise.all([
        AIone.current.initialize(),
        AIone.current.train(),
        AIone.current.classifyPoints(),

        AItwo.current.initialize(),
        AItwo.current.train(),
        AItwo.current.classifyPoints(),

        AIthree.current.initialize(),
        AIthree.current.train(),
        AIthree.current.classifyPoints(),

        AIfour.current.initialize(),
        AIfour.current.train(),
        AIfour.current.classifyPoints(),

        AIfive.current.initialize(),
        AIfive.current.train(),
        AIfive.current.classifyPoints(),

        AIsix.current.initialize(),
        AIsix.current.train(),
        AIsix.current.classifyPoints(),

        AItest.current.initialize(),
        AItest.current.train(),
        AItest.current.classifyPoints(),

      ]);
      console.log('All AI functions completed.');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const navigation = useNavigation();
  const handleNavigation = () => {
    navigation.navigate('Precios')
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#ffebeb' }}>
      <View
        style={{
          width: '90%',
          justifyContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: 25,
          backgroundColor: '#ffebeb',
          paddingVertical: 32,
          borderRadius: 5,
          flex: 1, // Add this line to make the content scrollable
        }}
      >
        <Text
          style={{
            marginBottom: 10,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Genera combinaciones utilizando nuestra Inteligencia Artificial
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <AIOne ref={AIone} />
          <AITwo ref={AItwo} />
          <AIThree ref={AIthree} />
          <AIFour ref={AIfour} />
          <AIFive ref={AIfive} />
          <AISix ref={AIsix} />
          <AITest ref={AItest} />
        </View>

        {proMember != false ? (
          <LinearGradient
            colors={['#0065B8', '#004E8F']}
            start={[0.01, 0.01]}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 32,
              borderRadius: 7,
              marginTop: 25,
              position: 'absolute',
              bottom: 50, // Add this line to position the button at the bottom
              left: '50%',
              transform: [{ translateX: -width * 0.33 }], // Center the button horizontally
            }}
          >
            <TouchableOpacity onPress={() => callAIFunctions()}>
              <Text style={{ color: 'snow' }}>Iniciar Secuencia Aprendizaje</Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <TouchableOpacity
            onPress={handleNavigation}
            style={{
              paddingVertical: 12,
              paddingHorizontal: 32,
              borderRadius: 7,
              marginTop: 25,
              backgroundColor: '#000',
              position: 'absolute',
              bottom: -80, // Add this line to position the button at the bottom
              left: '10%',
              transform: [{ translateX: -width * 0.50 }], // Center the button horizontally
            }}
          >
            <Text style={styles.text}>Hacerse Miembro Pro para usar AI</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
});

export default AIGen;