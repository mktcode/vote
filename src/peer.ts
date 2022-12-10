import { Peer } from "peerjs";
import { db } from "./db";

export const peer = new Peer({
  host: "localhost",
  port: 9000,
  path: "/",
  debug: 2,
});

peer.on("connection", (connection: any) => {
  connection.on("data", async (message: any) => {
    if (message.type !== "proposal") return;

    await db.proposals.add(message.payload);
  });
});
