import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import Constants from 'expo-constants';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseEnv = Constants.expoConfig?.extra?.firebase;

const firebaseConfig = {
  apiKey: firebaseEnv?.apiKey,
  authDomain: firebaseEnv?.authDomain,
  projectId: firebaseEnv?.projectId,
  storageBucket: firebaseEnv?.storageBucket,
  messagingSenderId: firebaseEnv?.messagingSenderId,
  appId: firebaseEnv?.appId,
  measurementId: firebaseEnv?.measurementId,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
