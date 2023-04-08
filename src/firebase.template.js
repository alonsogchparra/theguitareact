import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

// YOU GET THIS INFO WHEN YOU CREATE A PROJECT ON FIREBASE
const firebaseConfig = {
  apiKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  authDomain: 'XXXXXXXXXXXXX.XXXXXXXXXXX.XXX',
  projectId: 'XXXXXXXXXXXXX',
  storageBucket: 'XXXXXXXXXXXXX.XXXXXXX.XXX',
  messagingSenderId: 'XXXXXXXXXXXX',
  appId: 'X:XXXXXXXXXXXX:XXX:XXXXXXXXXXXXXXXXXXXXXX',
  measurementId: 'X-XXXXXXXXXXXX',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export const storage = getStorage(app);

export {
  addDoc,
  auth,
  collection,
  createUserWithEmailAndPassword,
  db,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onAuthStateChanged,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  signInWithEmailAndPassword,
  signOut,
  updateDoc,
  updateProfile,
};
