/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FIREBASE_API_KEY: string
    readonly VITE_FIREBASE_AUTH_DOMAIN: string
    readonly VITE_FIREBASE_PROJECT_ID: string
    readonly VITE_FIRESTORE_HOST: string
    readonly VITE_FIRESTORE_PORT: number
    readonly VITE_AUTH_HOST: string
    readonly VITE_STORAGE_HOST: string
    readonly VITE_STORAGE_PORT: number
    readonly VITE_STORAGE_BUCKET: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
