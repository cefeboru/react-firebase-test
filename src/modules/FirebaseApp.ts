import * as app from 'firebase/app';
import 'firebase/auth';

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
  private auth: app.auth.Auth;
    /// private db: app.database.Database;
  private googleProvider: app.auth.GoogleAuthProvider;

  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
        // this.db = app.database();
    this.googleProvider = new app.auth.GoogleAuthProvider();
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
}

export default new FirebaseApp();