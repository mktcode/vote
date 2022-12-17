import { ref } from "vue";
import { useWeb3 } from "./useWeb3";
import { useGun } from '@gun-vue/composables'

const gun = useGun({ peers: [ 'http://192.168.178.29:4200/gun'] });
export interface Proposal {
  from: string;
  title: string;
  description: string;
  authorTimestamp: number;
  start: string;
  end: string;
};

const { account, signer } = useWeb3();

const newProposalForm = ref({
  title: "Hello world!",
  description: "",
  start: "2023-01-01",
  end: "2023-02-01",
});

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
    from: account.value,
    title: newProposalForm.value.title,
    description: newProposalForm.value.description,
    authorTimestamp: Date.now(),
    start: newProposalForm.value.start,
    end: newProposalForm.value.end,
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
    newProposalForm,
    addProposal,
  };
}
