import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Router from './router/router';
import { AuthProvider } from './Auth/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

