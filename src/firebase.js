import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



 const firebaseConfig={
    apiKey: "AIzaSyDlCtkCznMVa0wpIk7C8dE0UovmJuMQkuk",
    authDomain: "unichat-1db53.firebaseapp.com",
    projectId: "unichat-1db53",
    storageBucket: "unichat-1db53.appspot.com",
    messagingSenderId: "314224477513",
    appId: "1:314224477513:web:ce84a342d044df99c18698",
  }
  
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  
