
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAuvBD9-OzV8isiGsM1IO0Zl9uakG70yLY",
  authDomain: "vinayrecipeapp.firebaseapp.com",
  projectId: "vinayrecipeapp",
  storageBucket: "vinayrecipeapp.appspot.com",  // 🔧 FIXED typo: ".app" → ".appspot.com"
  messagingSenderId: "519399178740",
  appId: "1:519399178740:web:1abe4e8a51897e36e539a1"
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore database
const db = getFirestore(app);

export { db };
