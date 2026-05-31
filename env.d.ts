/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FIREBASE_API_KEY: string
    readonly VITE_FIREBASE_AUTH_DOMAIN: string
    readonly VITE_FIREBASE_PROJECT_ID: string
    readonly VITE_FIRESTORE_HOST: string
    readonly VITE_FIRESTORE_PORT: number
    readonly VITE_AUTH_HOST: string
    readonly VITE_SUPABASE_URL: string
    readonly VITE_SUPABASE_ANON_KEY: string
    readonly VITE_SUPABASE_BUCKET: string
    readonly VITE_MAX_USERS: number
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
