import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

export class FirebaseApp {
  private auth: firebase.auth.Auth;
  private db: firebase.database.Database;
  private googleProvider: firebase.auth.GoogleAuthProvider;

  constructor() {
    try {
      const defaultApp = firebase.app();
      this.auth = defaultApp.auth();
      this.db = firebase.database();
    } catch (err) {
      firebase.initializeApp(firebaseConfig);
      this.auth = firebase.auth();
      this.db = firebase.database();
    }
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.googleProvider.addScope('https://www.googleapis.com/auth/youtube.readonly');
  }

  doSignInWithGoogle = () => {
    return this.auth.signInWithPopup(this.googleProvider);
  }

  doSignOut = () => {
    return this.auth.signOut();
  }

  getAuth() {
    return this.auth;
  }

  getDb() {
    return this.db;
  }
}

const instance = new FirebaseApp();

export default instance;