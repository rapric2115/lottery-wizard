import React, { createContext, useState, useEffect } from 'react';
import Purchases from 'react-native-purchases';

export const RevenueCatContext = createContext();

export const RevenueCatProvider = ({ children }) => {
  const [offerings, setOfferings] = useState(null);
  const [currentPackage, setCurrentPackage] = useState(null);

  useEffect(() => {
    const fetchOfferings = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
            setOfferings(offerings);
        }
      } catch (error) {
        console.error('Error fetching offerings:', error);
      }
    };

    const fetchCustomerInfo = async () => {
        try {
            const customerInfo = await Purchases.getCustomerInfo();
            setCurrentPackage(customerInfo.entitlements);
        } catch (err) {
            console.error('Error fetching customer info', err);
        }
    }

    fetchCustomerInfo();
    fetchOfferings();

    const subscription = Purchases.addEntitlementsUpdatedListener((customerInfo) => {
        setCurrentPackage(customerInfo.entitlements);
    })

    return () => { subscription.remove();}
  }, []);

  // Add functions for purchasing products and managing entitlements

  const purchaseSubscription = async (offeringIdentifier, productIdentifier) => {
    try {
        const purchaseInfo = await Purchases.purchasePackage(offeringIdentifier, productIdentifier);
        setCurrentPackage(purchaseInfo.customerInfo.entitlements);
    } catch (error) {
        console.error('Error purchase subscription', error);
    }
  }

  return (
    <RevenueCatContext.Provider value={{ offerings, currentPackage, purchaseSubscription }}>
      {children}
    </RevenueCatContext.Provider>
  );
};