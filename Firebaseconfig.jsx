import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAkAz-zifzNwqnjTD1rI7FWshO4IGiY6ds",
  authDomain: "reactchat-4e2e2.firebaseapp.com",
  projectId: "reactchat-4e2e2",
  storageBucket: "reactchat-4e2e2.appspot.com",
  messagingSenderId: "119308601378",
  appId: "1:119308601378:web:82d670d1e9f0e688c6a27b"
};

export const app = initializeApp(firebaseConfig);