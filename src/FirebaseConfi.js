// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBM1SNPnI_tE7_34KEzMq6Rw6GSrctsavs",
  authDomain: "gmp-marketplace.firebaseapp.com",
  projectId: "gmp-marketplace",
  storageBucket: "gmp-marketplace.appspot.com",
  messagingSenderId: "483544130463",
  appId: "1:483544130463:web:77e9d2a1f64bae5f1f13aa",
  measurementId: "G-MMBMZND3W0"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const storage = getStorage(app);
const db = getFirestore(app);
export {app,auth, storage, db}
