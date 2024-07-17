import { useContext } from 'react';
import { RevenueCatContext } from '../Auth/RevenueCatContext';
import Purchases from 'react-native-purchases';

export const usePurchaseSubscription = () => {
    // const { offerings } = useContext(RevenueCatContext);

    // const purchaseSubscription = async (subscriptionIdentifier) => {
    //     try {
    //         const purchaserInfo = await Purchases.purchasePackage(subscriptionIdentifier);
    //     } catch (err) {
    //         console.error('Error purchasing subscription', err);
    //     }

    //     return purchaseSubscription;
    // }
}

export const useCheckEntitlements = () => {
        // const { currentPackage } = useContext(RevenueCatContext);

        // const hasEntitlement = (entitlementIdentifier) => {
        //     return currentPackage?.entitlements[entitlementIdentifier]?.isActive;
        // }

        // return hasEntitlement;
}