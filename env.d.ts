/// <reference types="vite/client" />

interface Window {
  ethereum: any;
}

declare module "@gun-vue/composables" {
  export function useGun(options?: any): IGun;
}
