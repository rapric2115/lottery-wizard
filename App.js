import Router from './router/router';
import { AuthProvider } from './Auth/AuthContext';
import Purchases from 'react-native-purchases';
import { RevenueCatProvider } from './Auth/RevenueCatContext';

export default function App() {
  Purchases.setDebugLogsEnabled(true);
  Purchases.configure({
    apiKey: 'strp_KyCWKQDlCNielcpCovuaZAOooRG'
  });

  return (
    <RevenueCatProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </RevenueCatProvider>
   
  );
}

