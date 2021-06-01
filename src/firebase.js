import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/functions"

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

  // const firebaseConfig = {
  //   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  //   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  //   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  //   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER,
  //   appId: process.env.REACT_APP_FIREBASE_APP_ID,
  //   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  // };

  // firebase.initializeApp(firebaseConfig)

  // export default firebase;