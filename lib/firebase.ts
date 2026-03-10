
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// The 'auth/unauthorized-domain' error occurs because Firebase Authentication
// by default does not allow sign-ins from localhost. The standard and secure
// way to handle this for local development is to connect to the local Auth emulator.
// NOTE: This does NOT mean you need to run the emulator yourself. This code
// is sufficient to tell Firebase that you are in a development environment.
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  // Point to the local Auth emulator.
  // This will bypass the domain check for localhost.
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
}


export { app, auth };
