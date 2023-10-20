import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from './constants';
// expo-costant?

type firebaseconfig = {
    apiKey: string,
    authDomain: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
    databaseURL: string,
};

// manifest.extra
// firebase config
const firebaseConfig: firebaseconfig = {
  apiKey: Constants.apiKey,
  authDomain: Constants.authDomain,
  projectId: Constants.projectId,
  storageBucket: Constants.storageBucket,
  messagingSenderId: Constants.messagingSenderId,
  appId: Constants.appId,
  databaseURL: Constants.databaseURL
};

// initialize firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getFirestore();