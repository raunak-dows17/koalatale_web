// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCquy17yaZrbjoFEOXSn2noY4S6ELdm3BA",
  authDomain: "koalatale-17102002.firebaseapp.com",
  projectId: "koalatale-17102002",
  storageBucket: "koalatale-17102002.appspot.com",
  messagingSenderId: "263531808543",
  appId: "1:263531808543:web:b5e7c271b583188f1c122a",
  measurementId: "G-ZE64YY9D7S",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
