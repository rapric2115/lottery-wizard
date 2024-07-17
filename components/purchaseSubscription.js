import { usePurchaseSubscription, useCheckEntitlements } from './Subscriptions';
import { RevenueCatContext } from '../Auth/RevenueCatContext';
import { View, Text, Button } from 'react-native';

const PurchaseSubscription = () => {
    const { offerings, purchaseSubscription } = useContext(RevenueCatContext);

    // const purchaseSubscription = usePurchaseSubscription();
    // const hasEntitlement = useCheckEntitlements();

    // const handlePurchase = () => {
    //     purchaseSubscription('subscription_identifier');
    // };

    // const hasAccessToFeature = hasEntitlement('entitlement_identifier');

    const handleSubscriptionPurchase = () => {
        const offering = offerings?.current;
        if (offering) {
            const productIdentifier = offering.availablePackage[0].identifier;
            purchaseSubscription(offering.identifier, productIdentifier);
        }
    }

    return (
        <View>
            <Button onPress={handleSubscriptionPurchase} title="Purchase Subscription" />
            { hasAccessToFeature && <Text>You Have Access to our AI</Text>}
        </View>
    )
}

export default PurchaseSubscription;