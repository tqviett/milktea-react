// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn7lruDLRIpBHV7MtwNklCJW0ibrQOvRU",
  authDomain: "milkteashop-tunztunzz.firebaseapp.com",
  databaseURL: "https://milkteashop-tunztunzz-default-rtdb.firebaseio.com",
  projectId: "milkteashop-tunztunzz",
  storageBucket: "milkteashop-tunztunzz.appspot.com",
  messagingSenderId: "831318455172",
  appId: "1:831318455172:web:7e9fc51e9032e427d823d1",
  measurementId: "G-ZC2LD9K4YV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;