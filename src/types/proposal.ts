import type { Transaction } from "ethers";

export interface ProposalVote {
  voter: string;
  options: {
    [optionId: string]: {
      votingPower: number;
      [key: string]: any;
    };
  };
  timestamp: number;
  signature: string;
}

export interface ProposalVoting {
  start: number;
  end: number;
  options: {
    [optionId: string]: {
      label: string;
      [key: string]: any;
    };
  };
  evaluationStrategy:
    | "yes-no"
    | "yes-no-abstain"
    | "ranking"
    | "ranked-elemination";
  votingPowerStrategies: {
    [name: string]: Record<string, any>;
  };
  rewardsContract?: string;
  votes?: {
    [voteId: string]: ProposalVote;
  };
}

export interface ProposalTransactionSet {
  transactions: {
    [batchHash: string]: {
      [transactionHash: string]: Transaction;
    };
  };
  executionModuleAddress: string;
  criteria: string | Record<string, any>;
}

export interface ProposalMetadata {
  title: string;
  description: string;
  [key: string]: any;
}

export interface Proposal {
  id: string;
  author: string;
  voting: ProposalVoting;
  transactionSets: {
    [hash: string]: ProposalTransactionSet;
  };
  metadata: ProposalMetadata;
  signature: string;
}
