import { ref } from "vue";
import { db, type Proposal } from "../db";
import { peer } from "../peer";

const newProposalTitle = ref("Hello world!");

async function hashMessage(message: any) {
  const msgUint8 = new TextEncoder().encode(JSON.stringify(message));
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

async function addProposal() {
  const proposal: Proposal = {
    to: "0x1234567890",
    from: "0x0987654321",
    title: "Proposal Title " + Math.random(),
    choices: ["Option A", "Option B", "Option C"],
  };

  proposal.hash = await hashMessage(proposal);

  await db.proposals.add(proposal);

  peer.listAllPeers((peers: any) => {
    peers.forEach((peerId: any) => {
      if (peerId === peer.id) return;

      const connection = peer.connect(peerId);
      connection.on("open", () => {
        connection.send({ type: "proposal", payload: proposal });
      });
    });
  });
}

export function useNewProposal() {
  return {
    newProposalTitle,
    addProposal,
  };
}
