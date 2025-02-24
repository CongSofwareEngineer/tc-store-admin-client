interface EnvironmentVariables {
  readonly NEXT_PUBLIC_API_APP: string
  readonly NEXT_PUBLIC_API_KEY: string
  readonly NEXT_PUBLIC_AUTHDOMAIN: string
  readonly NEXT_PUBLIC_DATABASE_URL: string
  readonly NEXT_PUBLIC_PROJECT_ID_FB: string
  readonly NEXT_PUBLIC_STORAGE_BUCKET: string
  readonly NEXT_PUBLIC_MESSAGINGSENDER_ID: string
  readonly NEXT_PUBLIC_APPID: string
  readonly NEXT_PUBLIC_MEASUREMENT_ID: string
  readonly NEXT_PUBLIC_FB_TOKEN_FPIS: string
  readonly NEXT_PUBLIC_INFURA_API_KEY: string
  readonly NEXT_PUBLIC_INFURA_API_KEY_SERET: string
  readonly NEXT_PUBLIC_IPFS: string
  readonly NEXT_PUBLIC_URI_NFT: string
  readonly NEXT_PUBLIC_URI_NFT_CHAIN: string
  readonly NEXT_PUBLIC_WEB3STORAGE_TOKEN: string
  readonly NEXT_PUBLIC_IMG_LOGO: string
  readonly NEXT_PUBLIC_ID_ALLOWED: string
  readonly NEXT_PUBLIC_TITLE: string
  readonly NEXT_PUBLIC_IMAGE: string
  readonly NEXT_PUBLIC_KEY_SALT: string
  readonly NEXT_PUBLIC_ENABLE_DEBUG_API: string
  readonly NEXT_PUBLIC_UPLOAD_CARE: string
  readonly NEXT_PUBLIC_UPLOAD_CARE_URL: string
  readonly NEXT_PUBLIC_KEY_IV_ENCODE: string
  readonly NEXT_PUBLIC_API_KEY_GG_MAP: string
  readonly NEXT_PUBLIC_ENABLE_SERVER_LOCAL: string
  readonly NEXT_PUBLIC_DISABLE_DEV: string
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvironmentVariables {}
}
