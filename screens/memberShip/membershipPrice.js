import React, { useState } from 'react';
import {View, Text, StyleSheet, SafeAreaView, Dimensions, Pressable, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
// import PayPal from 'react-native-paypal';

const SCREEN_WIDTH = Dimensions.get("screen").width;

const MembershipPrice = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState();
    const Package = [
        {id: 1, name: '12 Meses', price: 50000, save: 's100' },
        {id: 2, name: '3 Meses', price: 13000, save: '$20'},
        {id: 3, name: '1 Meses', price: 5000, save: '$0'},
    ]

    const benefics = [
        {
            id: 1,
            benefics: 'Generar combinaciones con AI',
            basic: 'lock',
            premium: 'check'
        },
        {
            id: 2,
            benefics: 'Guardar hasta 5 Combinaciones',
            basic: 'lock',
            premium: 'check'
        }
    ]

    const handleMembership = (data) => {
        console.log(data)
        setSelectedItem(data.id);
        setSelectedPrice(data.price)
    }

    const handlePaypalPayment = () => {
        alert(`Paypal payment received ${selectedPrice}`);
    }

   const handleSubscription = () => {
    Alert.alert(`Has realizado la subscricion de ${selectedItem}`)
   }

    // const handlePaypalPayment = async () => {
    //     // Set up your PayPal client ID (replace with your own)
    //     const paypalClientID = 'ATiG3WV_uTbt3BnT7FNOmE_q38dBKznfSrWdRgHmE03T-QGNVbzzhnjTnmyDxprClbIQ-NmbZbmgXNVM';
    
    //     // Define the PayPal payment configuration
    //     const paypalConfig = {
    //       clientID: paypalClientID,
    //       environment: 'sandbox', // Change to 'production' for a live environment
    //       intent: 'authorize', // Payment intent (authorize, order, sale)
    //       currency: 'USD', // Currency code
    //       price: {selectedPrice}, // The amount to be paid
    //       description: 'Pago Membresia', // Payment description
    //     };
    
    //     try {
    //       const paymentResponse = await PayPal.pay(paypalConfig);
    //       if (paymentResponse.success) {
    //         console.log('Payment was successful:', paymentResponse.confirmation);
    //         // Handle successful payment, e.g., navigate to a success page.
    //       } else {
    //         console.log('Payment was canceled or failed:', paymentResponse.error);
    //         // Handle payment cancellation or failure.
    //       }
    //     } catch (error) {
    //       console.error('PayPal payment error:', error);
    //       // Handle any errors that occur during the payment process.
    //     }
    //   };

    return(
        <SafeAreaView style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 30}}>Precios Membresias</Text>
            <Text>Elige un Plan</Text>
            <Text style={{marginTop: 15}}>Acceso Ilimitado, Cancela cuando quiereas</Text>
            <View style={{marginTop: 30}}>
            {Package.map((data) => (
                <TouchableOpacity key={data.id} style={[styles.membershipPakage, 
                    {flexDirection: 'row', borderColor: selectedItem === data.id ? 'blue' : 'black', borderWidth: selectedItem === data.id ? 2 : 1}]} 
                    onPress={() => handleMembership(data)}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{data.name}</Text>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>{data.price}</Text>
                        <Text style={{fontSize: 12, fontWeight: 400}}>Ahorra {data.save}</Text>
                    </View>
                </TouchableOpacity>
            ))}
            </View>
            <View>
                <Pressable style={{marginVertical: 30, width: 200, backgroundColor: 'black', padding: 10, justifyContent: 'center', borderRadius: 7}}
                    onPress={handleSubscription}
                >
                    <Text style={{color: 'snow', alignSelf: 'center'}}>Pagar Membresia</Text>
                </Pressable>
            </View>
            <View style={{marginTop: 15}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: SCREEN_WIDTH * .9, marginVertical: 10}}>
                    <Text style={{fontWeight: 'bold'}}>Beneficios</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{paddingHorizontal: 5, fontWeight: 'bold'}}>Basico</Text>
                        <Text style={{paddingHorizontal: 5, fontWeight: 'bold'}}>Premium</Text>
                    </View>
                </View>
                {benefics.map((data) => (
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: SCREEN_WIDTH * .8}} key={data.id}>
                        <Text>{data.benefics}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', width: SCREEN_WIDTH * .25}}>
                            <AntDesign name={data.basic} size={24} color="black" />
                            <AntDesign name={data.premium} size={24} color="black" />
                        </View>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    membershipPakage: {
        width: SCREEN_WIDTH * .8,
        borderRadius: 7,
        justifyContent: 'space-around',
        padding: 10,
        marginTop: 15
    }
});

export default MembershipPrice;