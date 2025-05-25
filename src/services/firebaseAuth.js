import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "./../firebase/_firebase_init_";

// for google signIn
const googleProvider = new GoogleAuthProvider();

const registerWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

const logOut = () => {
  return signOut(auth);
};

export { registerWithEmail, loginWithEmail, loginWithGoogle, logOut };
