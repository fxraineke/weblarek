/// <reference types="vite/client" />

declare module "*.scss";

interface ImportMetaEnv {
  readonly VITE_API_ORIGIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
