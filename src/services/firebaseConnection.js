import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let firebaseConfig = {
  apiKey: 'AIzaSyDdJvgmnUSAyfpj1u62b3puy7t2G9nIPvc',
  authDomain: 'calls-8f297.firebaseapp.com',
  projectId: 'calls-8f297',
  storageBucket: 'calls-8f297.appspot.com',
  messagingSenderId: '1003262461239',
  appId: '1:1003262461239:web:6ee8f84026dcc1485386b2',
  measurementId: 'G-VFMCHXCZYM',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
