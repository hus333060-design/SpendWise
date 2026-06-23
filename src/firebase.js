
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDI_pnYrXU424GCayaDoEFQPBm2mtkN3zo",
  authDomain: "expence-tracker-b792d.firebaseapp.com",
  projectId: "expence-tracker-b792d",
  storageBucket: "expence-tracker-b792d.firebasestorage.app",
  messagingSenderId: "1007448075097",
  appId: "1:1007448075097:web:ff88c94d745d66ceaf7a48"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;