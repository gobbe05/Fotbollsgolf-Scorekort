import { initializeApp } from "firebase/app"
import { getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyAMs2vNGmp1RSxxZSZGglI6uW13l8dIdGw",
  authDomain: "fotbollsgolf-dev.firebaseapp.com",
  projectId: "fotbollsgolf-dev",
  storageBucket: "fotbollsgolf-dev.appspot.com",
  messagingSenderId: "441401638660",
  appId: "1:441401638660:web:f18df09c2370662f4e5a51"
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)