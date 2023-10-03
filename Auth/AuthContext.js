import React, { createContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

// web client ID: "391790290602-fis5hsn5s2gqs912jn0ljref9ni1ebfa.apps.googleusercontent.com"
// IOs client ID: "391790290602-9v54hr3dtoplo9r5a572ctf69uo1ftj7.apps.googleusercontent.com"
// Android cliend ID: "391790290602-ou4v1l1620m3ia989spi2p3l16ir4m6c.apps.googleusercontent.com"

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
   

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);


    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
      clientId: "391790290602-fis5hsn5s2gqs912jn0ljref9ni1ebfa.apps.googleusercontent.com",
      iosClientId: "391790290602-9v54hr3dtoplo9r5a572ctf69uo1ftj7.apps.googleusercontent.com",
      androidClientId: "391790290602-ou4v1l1620m3ia989spi2p3l16ir4m6c.apps.googleusercontent.com"
    })

    useEffect(() => {
      // FetchingNumeros(); // Commented out, so it shouldn't be causing issues
      if (response?.type === "success") {
        setAccessToken(response.authentication.accessToken);
        accessToken && fetchUserInfo(); // Fetching user info only when accessToken changes
      }
      loadAccessToken();
  }, [response, accessToken]);

   // Add this useEffect to load the access token from AsyncStorage
  
    const loadAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem('@user');
        console.log('access token from asyncStorage: ', token)
        if (token) {
          setAccessToken(token);
          setCurrentUser(token)
          console.log('token from authContext: ', token)
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
                Authorization: `Bearer ${accessToken}`, // Add the access token here
              },
            });
      
            if (response.ok) {
              const userInfo = await response.json();
              setCurrentUser(userInfo);
            } else {
              // Handle errors when fetching user info
              console.error("Failed to fetch user info:", response.status, response.statusText);
            }
          } catch (error) {
            console.error("Error fetching user info:", error);
          }
        }

         // After successfully fetching user info, store the token in AsyncStorage
          try {
            await AsyncStorage.setItem('accessToken', accessToken);
          } catch (error) {
            console.error('Error saving access token:', error);
          }
      };
      
      
     

      const userID = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const uid = user.uid;
              console.log(uid);
              // ...
            } else {
              // User is signed out
              // ...
            }});
      }
  
     

      const login = (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // console.log(user);
            setCurrentUser(user);
              // Store the access token in AsyncStorage upon successful login
              try {
                AsyncStorage.setItem('@user', JSON.stringify(userCredential));
              } catch (error) {
                console.error('Error saving access token:', error);
              }
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Handle login errors
            console.error(errorCode, errorMessage);
          });
      };
      

      const register =  (values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
          .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;
            setAccessToken(user.accessToken);
            setCurrentUser(true);
            const token = user.accessToken;
            await AsyncStorage.setItem('@user', JSON.stringify(userCredential));
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Handle registration errors
            console.error(errorCode, errorMessage);
          });
      };
      

      const signInWithGoogle = () => {
        promptAsync();
      };
      
      handleSignOutWithGoogle = () => {
        signOut(auth).then(async () => {
          // Sign-out successful.
          try {
            await AsyncStorage.removeItem('@user');
          } catch (error) {
            console.error('Error removing access token:', error);
          }
          setCurrentUser(null);
        }).catch((error) => {
          // An error happened.
        });
      }

      console.log('from AuthContext line 171', currentUser)

    return (
        <AuthContext.Provider value={{
            register, currentUser, signInWithGoogle, login, request, handleSignOutWithGoogle
        }}>
            {children}
        </AuthContext.Provider>
    )
}