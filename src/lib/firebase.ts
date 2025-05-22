
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

// Check if the API key, which is critical, is provided
if (!apiKey) {
  const errorMessage =
    "Firebase API Key (NEXT_PUBLIC_FIREBASE_API_KEY) is missing or empty. " +
    "This is critical for Firebase initialization and is the likely cause of 'auth/invalid-api-key' errors. " +
    "Please create a .env.local file in the project root with your Firebase configuration.\n\n" +
    "Example .env.local content:\n" +
    "NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyYOUR_API_KEY_HERE\n" +
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com\n" +
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id\n" +
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com\n" +
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id\n" +
    "NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id\n\n" +
    "Ensure these values are correct and obtained from your Firebase project settings.";
  
  console.error(errorMessage);
  throw new Error(
    "Firebase API Key (NEXT_PUBLIC_FIREBASE_API_KEY) is not configured. This will cause Firebase initialization to fail. Check the console for more details and an example .env.local structure."
  );
}

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
