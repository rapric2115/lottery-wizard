import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CombinationButtons = ({onPress, text}) => {
    return (
        <LinearGradient
        colors={['#0065B8','#004E8F']}
         start={[0.01, 0.01]}
         style={styles.btnGenerar} >
        <TouchableOpacity onPress={onPress}>
            <Text style={{color: 'snow', fontSize: 20, fontWeight: 'bold'}}>
                {text}
            </Text>
        </TouchableOpacity>
    </LinearGradient>
    )
}

const styles = StyleSheet.create({
    btnGenerar: {
        alignSelf: 'center',
        padding: 20,
        borderRadius: 10,
        marginBottom: 15
    }
})

export default CombinationButtons;