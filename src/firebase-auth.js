// import { getAuth } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { auth } from './firebase-conf.js';

// Criação de novos usuários
export function createUser(
  createUserName,
  createEmail,
  createPassword,
  confirmPassword,
) {
  return createUserWithEmailAndPassword(auth, createEmail, createPassword, confirmPassword)
    .then(async () => {
      await updateProfile(auth.currentUser, {
        displayName: createUserName,
      });
    });
}

// Login com o Google
export function loginGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

// Verificar se usuário está logado
export function verifyUserLogged(callback) {
  onAuthStateChanged(auth, callback);
}

// Acessar informação do usuários
export function accessUser() {
  const user = auth.currentUser;
  if (user !== null) {
    return user;
  }
  return null;
}

// Login de usuários existentes
export function signIn(loginEmail, loginPassword) {
  signInWithEmailAndPassword(auth, loginEmail, loginPassword);
  return signInWithEmailAndPassword(auth, loginEmail, loginPassword);
}

// Para desconectar um usuário
export function signOutUser() {
  return signOut(auth);
}
