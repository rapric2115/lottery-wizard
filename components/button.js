import React, { useContext } from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { AuthContext } from '../Auth/AuthContext';


const ButtonWizard = ({children}) => {
    const {signInWithGoogle, request } = useContext(AuthContext);

    return(
        <View style={{justifyContent: 'center', alignSelf: 'center', marginVertical: '10'}}>
            <TouchableOpacity disabled={!request} onPress={signInWithGoogle} style={styles.btn}>
                <Text>{children}</Text>
            </TouchableOpacity>
        </View>
    )
} 

const styles = StyleSheet.create({
    btn: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 7,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    }
})

export default ButtonWizard;
