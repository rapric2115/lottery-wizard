import React, {useContext} from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { AuthContext } from '../Auth/AuthContext';
import ButtonWizard from '../components/button';
 
const Register = ({navigation}) => {
    const {register} = useContext(AuthContext);

    return (
        <View style={{flex:1, justifyContent: 'center'}}>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values => register(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                    <TextInput
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        style={styles.input}
                        placeholder='email'
                    />
                    <TextInput
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        style={styles.input}
                        placeholder='password'
                    />
                    <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
                        <Text style={{alignSelf: 'center', color: '#fff'}}> Sign Up</Text>
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
        backgroundColor: 'blue',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 7,
        alignSelf: 'center',
        marginTop: 20,
        height: 40,
        justifyContent: 'center',
    }
 });

 export default Register;