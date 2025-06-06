declare interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_KEY: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
