import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "the-shoppies-dbf55.firebaseapp.com",
  projectId: "the-shoppies-dbf55",
  storageBucket: "the-shoppies-dbf55.appspot.com",
  messagingSenderId: "944087490605",
  appId: "1:944087490605:web:c6407da1969f767a8958a4",
  measurementId: "G-QE96GREL4X"
};

// Initialize Firebase
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
    const photoURLUncompressed = photoURL.replace('=s96-c', '');
    try {
      await userRef.set({
        displayName,
        email,
        photoURLUncompressed,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const saveContent  = async (user, content) => {
  if (!user) return;

  const dataRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await dataRef.get();

  if (snapshot.exists) {
    try {
      await dataRef.update({
        content: content,
      });
    } catch (error) {
      console.error("Error creating content document", error);
    }
  }
};
