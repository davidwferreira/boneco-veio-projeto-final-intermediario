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
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

console.log("🔥 AMBIENTE:", import.meta.env.MODE);
console.log("🔥 projectId:", firebaseConfig.projectId);


export const app = initializeApp(firebaseConfig);
// Força Firestore a usar long-polling, o que evita o erro de WebChannel
const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
  experimentalForceLongPolling: true,
});

export { db };