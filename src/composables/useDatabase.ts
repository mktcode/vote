import { useGun } from "@gun-vue/composables";
import "gun/sea";
import "gun/lib/open";
import "gun/lib/load";

const gun = useGun({ peers: [import.meta.env.VITE_GUN_PEER] });
const db = gun
  .get(import.meta.env.VITE_GUN_DB_NAME)
  .get(import.meta.env.VITE_DAO_ADDRESS);

export function useDatabase() {
  return { gun, db };
}
