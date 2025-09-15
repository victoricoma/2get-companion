import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCWtzFye3XZzYecLggn6k4zzpnLkJjHBaU",
  authDomain: "app-2get.firebaseapp.com",
  projectId: "app-2get",
  storageBucket: "app-2get.firebasestorage.app",
  messagingSenderId: "335955043480",
  appId: "1:335955043480:web:f7f53fda3e6bf3a81f5ced",
  measurementId: "G-GNR1SSFVDR"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);