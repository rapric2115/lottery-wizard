import React, { useContext } from 'react';

import { View, Text, Pressable, StyleSheet } from 'react-native'
import { AuthContext } from '../Auth/AuthContext';


const ButtonWizard = ({children}) => {
    const {signInWithGoogle, request } = useContext(AuthContext);

    return(
        <View style={{justifyContent: 'center', alignSelf: 'center', marginVertical: '10', marginVertical: 20,}}>
            <Pressable disabled={!request} onPress={signInWithGoogle} style={styles.btn}>
                <Text style={styles.text}>{children}</Text>
            </Pressable>
        </View>
    )
} 

const styles = StyleSheet.create({
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
})

export default ButtonWizard;
