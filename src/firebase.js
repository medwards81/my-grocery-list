import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA-3zCX-0ZJVnXxEa99I4GY32aohOo8bVw',
  authDomain: 'grocery-list-app-18eeb.firebaseapp.com',
  databaseURL: 'https://grocery-list-app-18eeb.firebaseio.com',
  projectId: 'grocery-list-app-18eeb',
  storageBucket: 'grocery-list-app-18eeb.appspot.com',
  messagingSenderId: '24475181652',
  appId: '1:24475181652:web:da2bdd6a1ddc5107c043c1'
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error('Error fetching user', error);
  }
};
