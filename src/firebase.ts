import { initializeApp, FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,

  authDomain: import.meta.env.VITE_AUTH_DOMAIN,

  projectId: import.meta.env.VITE_PROJECT_ID,

  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,

  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,

  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const errorHandling = (error: unknown) => {
  if (error instanceof FirebaseError) {
    const { message } = error;
    toast.error(message);
  }
};

const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    errorHandling(error);
  }
};

const registerWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    errorHandling(error);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    errorHandling(error);
  }
};

export { app, auth, loginWithEmailAndPassword, registerWithEmailAndPassword, logout };
