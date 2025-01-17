import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
} from 'firebase/auth';
import { app } from './firebase-conf';

// Inicialize o Firebase Authentication e obtenha uma referência ao serviço
export const auth = getAuth(app);
console.log(auth);

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
export async function loginGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

// Verificar se usuário está logado
export async function verifyUserLogged(callback) {
  onAuthStateChanged(auth, callback);
}

// Acessar informação do usuários
export function accessUser() {
  console.log(auth);
  const user = auth.currentUser;
  if (user !== null) {
    return user;
  }
  return null;
}

// Login de usuários existentes
export async function signIn(loginEmail, loginPassword) {
  return signInWithEmailAndPassword(auth, loginEmail, loginPassword);
}

// Para desconectar um usuário
export async function signOutUser() {
  return signOut(auth);
}
