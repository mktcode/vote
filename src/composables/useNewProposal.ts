import { ref } from "vue";
import { useWeb3 } from "./useWeb3";
import { gun } from "./useDatabase";

const { account, signer } = useWeb3();

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
  const proposal = {
    to: "0x1234567890",
    from: account.value,
    title: newProposalTitle.value,
    authorTimestamp: Date.now(),
  };

  const hash = await hashMessage(proposal);
  const signature = await signer.value?.signMessage(hash);

  const signedProposal = gun.get(hash).set({
    ...proposal,
    signature,
  })
  gun.get(`proposals`).set(signedProposal)
}

export function useNewProposal() {
  return {
    newProposalTitle,
    addProposal,
  };
}
