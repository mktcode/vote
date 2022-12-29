import { ref } from "vue";
import { MerkleTree } from "merkletreejs";
import sha256 from "crypto-js/sha256";
import { db } from "@/database";
import type { Proposal, ProposalVoting } from "@/types/proposal";
import { useWeb3 } from "@/composables/useWeb3";

const { account, signer } = useWeb3();

const newProposalForm = ref({
  title: "Hello world!",
  description: "",
  start: "2023-01-01",
  end: "2023-02-01",
});

async function addProposal() {
  if (!signer.value) return;

  const proposalIdLeaves = [];

  const author = account.value;
  proposalIdLeaves.push(sha256(author));

  const daoAddress = import.meta.env.VITE_DAO_ADDRESS;
  proposalIdLeaves.push(sha256(daoAddress));

  const start = new Date(newProposalForm.value.start).getTime();
  proposalIdLeaves.push(sha256(start.toString()));

  const end = new Date(newProposalForm.value.end).getTime();
  proposalIdLeaves.push(sha256(end.toString()));

  const options = {
    [sha256("Yes").toString()]: { label: "Yes" },
    [sha256("No").toString()]: { label: "No" },
    [sha256("Abstain").toString()]: { label: "Abstain" },
  };
  proposalIdLeaves.push(sha256(JSON.stringify(options)));

  const voting: ProposalVoting = {
    start,
    end,
    options,
    evaluationStrategy: "yes-no-abstain",
    votingPowerStrategies: {
      erc20balance: {
        address: "0x1234567890123456789012345678901234567890",
      },
    },
    rewardsContract: "0x1234567890123456789012345678901234567890",
  };
  proposalIdLeaves.push(sha256(JSON.stringify(voting)));

  const transactionsets = {};
  proposalIdLeaves.push(sha256(JSON.stringify(transactionsets)));

  const metadata = {
    title: newProposalForm.value.title,
    description: newProposalForm.value.description,
  };
  proposalIdLeaves.push(sha256(JSON.stringify(metadata)));

  const timestamp = Date.now();
  proposalIdLeaves.push(sha256(timestamp.toString()));

  const tree = new MerkleTree(proposalIdLeaves, sha256);
  const id = tree.getRoot().toString("hex");

  const signature = await signer.value.signMessage(id);

  const proposal: Proposal = {
    id,
    author,
    voting,
    metadata,
    signature,
    timestamp,
  };

  db.get("proposals").get(id).put(proposal);
}

async function addOption(proposalId: string, option: any) {
  // TODO: Check voting power
}

export function useNewProposal() {
  return {
    newProposalForm,
    addProposal,
    addOption,
  };
}
