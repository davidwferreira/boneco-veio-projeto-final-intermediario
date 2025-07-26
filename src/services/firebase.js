// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  initializeFirestore,       // <--- essa linha estava faltando
  persistentLocalCache
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.API_KEY,
  authDomain: import.meta.env.AUTH_DOMAIN,
  projectId: import.meta.env.PROJECT_ID,
  storageBucket: import.meta.env.STORAGE_BUCKET,
  messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
  appId: import.meta.env.APP_ID,
};

console.log("🔥 AMBIENTE:", import.meta.env.MODE);
console.log("🔥 projectId:", import.meta.env.VITE_PROJECT_ID);


export const app = initializeApp(firebaseConfig);
// Força Firestore a usar long-polling, o que evita o erro de WebChannel
const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
  experimentalForceLongPolling: true,
});

export { db };