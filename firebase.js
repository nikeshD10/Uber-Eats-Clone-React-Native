import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT4ix9xP_WLP03SauArCiwTyk734XrmAk",
  authDomain: "rn-uber-eat-clone-18e17.firebaseapp.com",
  projectId: "rn-uber-eat-clone-18e17",
  storageBucket: "rn-uber-eat-clone-18e17.appspot.com",
  messagingSenderId: "40859729722",
  appId: "1:40859729722:web:6ccd9d5589847172941a03",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize cloud firestore and get a reference to the service
const db = getFirestore(app);
export default db;
