import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_APP_NAME}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_FIREBASE_APP_NAME}.firebaseio.com`,
  projectId: `${process.env.REACT_APP_FIREBASE_APP_NAME}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_APP_NAME}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
}

export default Firebase;