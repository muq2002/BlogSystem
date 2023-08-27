import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getStorage } from "@firebase/storage";
// import  dotenv from "dotenv"; dotenv.config();

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDfGy-m07Zpp6LVg3fORR48ewQWlRAVM84",
  authDomain: "m2tronix-blog.firebaseapp.com",
  projectId: "m2tronix-blog",
  storageBucket: "m2tronix-blog.appspot.com",
  messagingSenderId: "611933071515",
  appId: "1:611933071515:web:ebc821de75b9a06ac53e3e"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };
