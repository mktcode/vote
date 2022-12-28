import Gun from "gun/gun";
import "gun/sea";
import "gun/lib/open";
import "gun/lib/load";
import { ref } from "vue";

const gun = Gun({ peers: [import.meta.env.VITE_GUN_PEER] });

const db = gun
  .get(import.meta.env.VITE_GUN_DB_NAME as string)
  .get(import.meta.env.VITE_DAO_ADDRESS as string);

const user = ref<any>(null);
const userManager = gun.user();

function logout() {
  userManager.leave();
  user.value = null;
}

export function useDatabase() {
  return { gun, db, userManager, user, logout };
}
