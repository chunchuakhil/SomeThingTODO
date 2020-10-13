import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB5e89Lfr9cLHYGxijSuVQwgKH35XJtbmU",
  authDomain: "todo-app-130d7.firebaseapp.com",
  databaseURL: "https://todo-app-130d7.firebaseio.com",
  projectId: "todo-app-130d7",
  storageBucket: "todo-app-130d7.appspot.com",
  messagingSenderId: "124182057618",
  appId: "1:124182057618:web:55e8b1e2f7030a624fcc4b",
  measurementId: "G-J9F2EY5PRD",
});
const db = firebaseApp.firestore();
export default db;
