import { ref } from "vue";

const newProposalTitle = ref("Hello world!");

export function useNewProposal() {
  return {
    newProposalTitle,
  };
}
