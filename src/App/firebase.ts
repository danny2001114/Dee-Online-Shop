import { initializeApp, type FirebaseOptions  } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const env = import.meta.env;

const config: FirebaseOptions  = {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_STORAGE_BUCKET
}

export const firebaseApp = initializeApp(config);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);

if (env.DEV) {
    connectFirestoreEmulator(db, env.VITE_FIRESTORE_HOST, env.VITE_FIRESTORE_PORT);
    connectAuthEmulator(auth, env.VITE_AUTH_HOST);
    connectStorageEmulator(storage, env.VITE_STORAGE_HOST, env.VITE_STORAGE_PORT);
}
