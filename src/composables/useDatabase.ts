import Gun from "gun/gun";
import "gun/lib/unset";

export const gun = new Gun([
  'http://192.168.178.29:4200/gun'
]);