import { auth } from '@/config/firebaseConfig';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User
} from 'firebase/auth';

export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const listenAuth = (cb: (user: User | null) => void) =>
  onAuthStateChanged(auth, cb);
