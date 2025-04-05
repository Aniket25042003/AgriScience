import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCc-Tg6QfOGWV1BGNXIkk36Jv_-pp4JjBI",
  authDomain: "agriscience-a65ad.firebaseapp.com",
  projectId: "agriscience-a65ad",
  storageBucket: "agriscience-a65ad.firebasestorage.app",
  messagingSenderId: "265446873897",
  appId: "1:265446873897:web:6cdc8988d13df20f3d3538",
  measurementId: "G-SQDLSS2MS0"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export default firebase;
