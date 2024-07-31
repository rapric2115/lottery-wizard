import { View, Text, Button } from 'react-native';

const PurchaseSubscription = () => {
    const hasAccessToFeature = false;
   
    return (
        <View>
            <Button title="Purchase Subscription" />
            { hasAccessToFeature ? <Text>You Have Access to our AI</Text> : 
            <Text>You Have No Access to our AI</Text>
            }
        </View>
    )
}

export default PurchaseSubscription;