// Import the functions you need from the Firebase SDK
import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCevJK2ruTyZQVnkiv2Ey0Gvn9d-9U4QgA',
  authDomain: 'assignment-a0c8e.firebaseapp.com',
  databaseURL:
    'https://assignment-a0c8e-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'assignment-a0c8e',
  storageBucket: 'assignment-a0c8e.appspot.com',
  messagingSenderId: '997803975268',
  appId: '1:997803975268:web:2796da5e6b36394c8cf571',
  measurementId: 'G-DGGFZGK13E',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export {auth, db};
