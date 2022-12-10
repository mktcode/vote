import { verifyMessage } from "ethers/lib/utils";
import { Peer } from "peerjs";
import { db } from "./db";

export const peer = new Peer({
  host: import.meta.env.VITE_SIGNALING_HOST,
  port: import.meta.env.VITE_SIGNALING_PORT,
  debug: import.meta.env.VITE_SIGNALING_DEBUG,
});


interface Message {
  type: "proposal" | "vote";
  payload: any;
  from: string;
  signature: string;
}

peer.on("connection", (connection: any) => {
  connection.on("data", async (message: Message) => {
    if (message.type !== "proposal") return;
    if (
      message.from !==
      verifyMessage(message.payload.hash, message.signature).toLowerCase()
    )
      return;

    await db.proposals.add(message.payload);
  });
});
