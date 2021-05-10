import firebase from "firebase/app"
import "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyDhxARYdq6cVJ6cq-NHuOhT386RMnuRY3U",
    authDomain: "ninth-incentive-312907.firebaseapp.com",
    databaseURL: "https://ninth-incentive-312907-default-rtdb.firebaseio.com",
    projectId: "ninth-incentive-312907",
    storageBucket: "ninth-incentive-312907.appspot.com",
    messagingSenderId: "459599680510",
    appId: "1:459599680510:web:f22e3e5477c52d99e7a6af",
    measurementId: "G-CSQVNS1HJL"
  };

  firebase.initializeApp(firebaseConfig)

  export default firebase;