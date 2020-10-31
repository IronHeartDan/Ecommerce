import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA0uGXrIxTsSGCypYHmLOu_Nu07Z3d5a-c",
  authDomain: "worthshop-aab02.firebaseapp.com",
  databaseURL: "https://worthshop-aab02.firebaseio.com",
  projectId: "worthshop-aab02",
  storageBucket: "worthshop-aab02.appspot.com",
  messagingSenderId: "120587771751",
  appId: "1:120587771751:web:9d107982bf1308995a99c2",
  measurementId: "G-1LEB6F8PYV",
};

const firebaseapp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseapp.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
