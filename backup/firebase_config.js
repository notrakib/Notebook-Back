import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyB9G7OL131Wlk65Hm6bLvhBE_XLwFkQJ4g",
  authDomain: "sen-auth-1890c.firebaseapp.com",
  projectId: "sen-auth-1890c",
  storageBucket: "sen-auth-1890c.appspot.com",
  messagingSenderId: "667369973571",
  appId: "1:667369973571:web:634069e1e5cd10d848b1f6",
};

export const initializeApp = firebase.initializeApp(firebaseConfig);
