import firebase from 'firebase';
import '@firebase/firestore';
import '@firebase/analytics';
import '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import '@firebase/functions';
import '@firebase/messaging';
import '@firebase/performance';
import '@firebase/remote-config';
import '@firebase/storage';
import ReduxSagaFirebase from 'redux-saga-firebase';

// const {
//   FIREBASE_API_KEY,
//   FIREBASE_AUTH_DOMAIN,
//   FIREBASE_DATABASE_URL,
//   FIREBASE_MESSAGING_SENDER_ID,
//   FIREBASE_PROJECT_ID,
//   FIREBASE_STORAGE_BUCKET,
// } = process.env;

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDVTd9iR5V3MXg4cMpVHTnsGEuzrjrdowo",
  authDomain: "teacher-escuela.firebaseapp.com",
  databaseURL: "https://teacher-escuela.firebaseio.com",
  projectId: "teacher-escuela",
  storageBucket: "teacher-escuela.appspot.com",
  messagingSenderId: "968636488645",
});

const sagaFirebase = new ReduxSagaFirebase(firebaseApp);

export default sagaFirebase;
