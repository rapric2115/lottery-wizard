import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  initializeAuth,
  getAuth,
  getReactNativePersistence,
  onAuthStateChanged,
} from 'firebase/auth';

import { getDatabase, ref, set } from 'firebase/database';
import { app, auth, firebaseConfig } from '../firebaseConfig';
import * as Google from 'expo-auth-session/providers/google';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userDataID, setUserDataID] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [proMember, setProMember] = useState(true);

  // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //   clientId: "391790290602-fis5hsn5s2gqs912jn0ljref9ni1ebfa.apps.googleusercontent.com",
  //   iosClientId: "391790290602-9v54hr3dtoplo9r5a572ctf69uo1ftj7.apps.googleusercontent.com",
  //   androidClientId: "391790290602-ou4v1l1620m3ia989spi2p3l16ir4m6c.apps.googleusercontent.com"
  // });

 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     setAccessToken(response.authentication.accessToken);
  //     accessToken && fetchUserInfo();
  //   }
  //   // loadAccessToken();
  // }, [response, accessToken]);

  useEffect(() => {
    userID();
  }, [currentUser]);

  const loadAccessToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@user');
      if (token != null) {
        setAccessToken(token);
        setCurrentUser(token);
      }
    } catch (error) {
      console.error('Error loading access token:', error);
    }
  };

  const fetchUserInfo = async () => {
    if (accessToken) {
      try {
        const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const userInfo = await response.json();
          setCurrentUser(userInfo);
        } else {
          console.error("Failed to fetch user info:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }

    try {
      await AsyncStorage.setItem('@user', JSON.stringify(currentUser));
    } catch (error) {
      console.error('Error saving access token:', error);
    }
  };

  const userID = () => {
    if (currentUser) {
      try {
        const userDataId = currentUser;
        if (userDataId) {
          const userId = userDataId.uid;
          const name = userDataId.displayName;
          const email = userDataId.email;
          setUserDataID(userId);
          setUserName(name);
          setUserEmail(email);
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  };

  const login = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user);
        try {
          AsyncStorage.setItem('@user', JSON.stringify(userCredential));
        } catch (error) {
          console.error('Error saving access token:', error);
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
        setErrorMessage(errorMessage);
      });
  };

  const register = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        setAccessToken(user.accessToken);
        setCurrentUser(true);
        await AsyncStorage.setItem('@user', JSON.stringify(userCredential));
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
        setErrorMessage(errorMessage);
      });
  };

  const signInWithGoogle = () => {
    Alert.alert('Por el momento Ingresar con Google no esta disponible.');
  };

  const handleSignOutWithGoogle = () => {
    signOut(auth).then(async () => {
      try {
        await AsyncStorage.removeItem('@user');
      } catch (error) {
        console.error('Error removing access token:', error);
      }
      setCurrentUser(null);
    }).catch((error) => {
      console.error('An error happened during sign-out:', error);
    });
  };

  const savedNumber = (values) => {
    const db = getDatabase();
    
    if (currentUser) {
      const userId = currentUser.uid;
      set(ref(db, 'userSavedNumber/' + userId), {
        myCombination: values,
      });
      setMessage('Guardado exitosamente');
    }
  };

  return (
    <AuthContext.Provider value={{
      register,
      currentUser,
      signInWithGoogle,
      login,
      // request,
      handleSignOutWithGoogle,
      savedNumber,
      userName,
      auth,
      userDataID,
      userEmail,
      errorMessage,
      message,
      proMember
    }}>
      {children}
    </AuthContext.Provider>
  );
};
