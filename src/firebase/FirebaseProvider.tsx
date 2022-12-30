import { connectAuthEmulator, getAuth } from 'firebase/auth'; // Firebase v9+
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
// import { connectFunctionsEmulator } from 'firebase/functions';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { ReactNode } from 'react';

import {
  FirebaseAppProvider,
  FirestoreProvider,
  AuthProvider,
  StorageProvider,
  useFirebaseApp,
} from 'reactfire';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function FirebaseComponents({ children }: { children: ReactNode }) {
  const app = useFirebaseApp(); // a parent component contains a `FirebaseAppProvider`

  // initialize Database and Auth with the normal Firebase SDK functions
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);

  auth.useDeviceLanguage();

  function startEmulators() {
    if (!globalThis.__EMULATORS_STARTED__) {
      globalThis.__EMULATORS_STARTED__ = true;
      // connectFunctionsEmulator()
      connectFirestoreEmulator(db, 'localhost', 8080);
      connectAuthEmulator(auth, 'http://localhost:9099', {
        disableWarnings: true,
      });
      connectStorageEmulator(storage, 'localhost', 9199);
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    startEmulators();
  }

  // // Check for dev/test mode however your app tracks that.
  // // `process.env.NODE_ENV` is a common React pattern
  // if (process.env.NODE_ENV !== 'production') {
  //   // Set up emulators
  //   connectFirestoreEmulator(db, 'localhost', 8080);
  //   // connectAuthEmulator(auth, 'http://localhost:9099');
  // }

  // any child components will be able to use `useUser`, `useDatabaseObjectData`, etc
  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={db}>
        <StorageProvider sdk={storage}>{children}</StorageProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
}

function FirebaseProvider({ children }: { children: ReactNode }) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseComponents>{children}</FirebaseComponents>
    </FirebaseAppProvider>
  );
}
export default FirebaseProvider;
