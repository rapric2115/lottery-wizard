
import {initializeAuth, getReactNativePersistence} from 'firebase/auth'
import {initializeApp} from 'firebase/app';
import { ReactNativeAsyncStorage } from '@react-native-async-storage/async-storage';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyD9H3HpPuAOQS2vc1Of7Ef4tB9DTpGZZGc",
  authDomain: "lottery-wizard.firebaseapp.com",
  projectId: "lottery-wizard",
  storageBucket: "lottery-wizard.appspot.com",
  messagingSenderId: "592559416273",
  appId: "1:592559416273:web:cd166e763e5aa5830976f0",
  measurementId: "G-YKNJ1PYLD2",
  databaseURL: "https://lottery-wizard-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth };




