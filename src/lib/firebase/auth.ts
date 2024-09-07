import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import { auth } from "./clientApp";

export function onAuthChanged(callback: (user: User | null) => void) {
  return auth.onAuthStateChanged(callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google: ", error);
  }
}

export async function createUserWithEmail(
  // username: string,
  email: string,
  password: string,
) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error creating user with email and password: ", error);
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing in with email and password: ", error);
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google: ", error);
  }
}
