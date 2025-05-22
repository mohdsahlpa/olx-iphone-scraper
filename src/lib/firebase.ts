
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
// Auth related imports like getAuth, GoogleAuthProvider are removed as Auth0 is now used.

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

// The API key check can remain if other Firebase services are to be used.
// If Firebase is *only* for auth (which is now removed), this whole file might be refactored
// or removed if no other Firebase services are planned. For now, we keep the core app initialization.
if (!apiKey && (authDomain || projectId || storageBucket || messagingSenderId || appId)) {
  // This warning is now more general if other Firebase services might be used.
  // If only auth was used, this specific warning about API key for auth might be less relevant,
  // but it's good practice to have keys for any Firebase service.
  const errorMessage =
    "One or more Firebase environment variables (excluding API key) are set, but NEXT_PUBLIC_FIREBASE_API_KEY is missing. " +
    "If you plan to use Firebase services, ensure all necessary configurations are present in .env.local.\n\n" +
    "Example .env.local content for Firebase (if still needed for other services):\n" +
    "NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyYOUR_API_KEY_HERE\n" +
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com\n" +
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id\n" +
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com\n" +
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id\n" +
    "NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id\n";
  
  console.warn(errorMessage);
  // Not throwing an error anymore, to allow the app to run if Firebase isn't critical path without auth
}


const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

let app: FirebaseApp | null = null;

// Initialize Firebase only if at least an API key or Project ID is provided,
// to prevent errors if no Firebase services are configured/used.
if (apiKey || projectId) {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
} else {
  console.warn("Firebase SDK not initialized because essential configuration (API Key or Project ID) is missing. If you intend to use Firebase services, please provide the necessary environment variables.");
}


// auth and googleProvider are removed as Auth0 is handling authentication.
export { app };
