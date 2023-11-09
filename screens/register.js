import React, {useContext, useState} from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Formik } from 'formik';
import { AuthContext } from '../Auth/AuthContext';
import ButtonWizard from '../components/button';
import ErrorMessage from '../components/errorMessage';
import Checkbox from 'expo-checkbox';
 
const Register = ({navigation}) => {
    const {register, errorMessage} = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={{flex:.9, justifyContent: 'center'}}>
            <Image source={require('../assets/logo.png')} style={{width: 150, height: 150, alignSelf: 'center'}} />
            <ErrorMessage errorMessage={errorMessage} />
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values => register(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                    <TextInput
                        onChangeText={handleChange('email')}
                        autoCapitalize='none'
                        onBlur={handleBlur('email')}
                        value={values.email}
                        style={styles.input}
                        placeholder='email'
                        require
                    />
                    <TextInput
                        onChangeText={handleChange('password')}
                        autoCapitalize='none'
                        onBlur={handleBlur('password')}
                        value={values.password}
                        style={styles.input}
                        placeholder='Password'
                        secureTextEntry={!showPassword}
                        required
                    />
                     <View style={styles.checkboxContainer}>
                        <Checkbox 
                        style={styles.checkbox}
                        value={showPassword}
                        onValueChange={setShowPassword}
                        color={showPassword ? '#247BA0': undefined} />
                        <Text>Show Password</Text>                        
                    </View>
                    <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
                        <Text style={{alignSelf: 'center', color: '#fff', fontWeight: 'bold'}}> Sign Up</Text>
                    </TouchableOpacity>
                    <ButtonWizard> sign Up with Google </ButtonWizard>
                </View>
                )}
            </Formik>
            <View style={{flexDirection: 'row', alignText: 'center', alignSelf: 'center'}}>
                <Text>Ya tienes cuenta</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{marginHorizontal: 10}}>Ingresar aqui</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

 const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        width: '80%',
        alignSelf: 'center',
        borderRadius: 7,
        marginVertical: 5,
        paddingHorizontal: 10,
        height: 40
    },
    btn: {
        width: '50%',
        backgroundColor: 'black',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 7,
        alignSelf: 'center',
        marginTop: 20,
        height: 40,
        justifyContent: 'center',
    }, 
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 20,
    }
 });

 export default Register;