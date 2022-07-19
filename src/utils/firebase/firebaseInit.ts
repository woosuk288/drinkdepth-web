import { initializeApp } from 'firebase/app';
import { ConfirmationResult, getAuth, RecaptchaVerifier } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));

const auth = getAuth(app);
auth.useDeviceLanguage();

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, analytics, db, storage };
export const useAuthFb = () => useAuthState(auth);

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: ConfirmationResult;
    grecaptcha: any;
    fbq: any;
    Kakao: any;
    kakao: any;
    gtag: any;
  }
}
