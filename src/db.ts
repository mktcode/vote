import Dexie, { type Table } from "dexie";

export interface Proposal {
  hash?: string;
  from: string;
  to: string;
  title: string;
  body: string;
}

export interface Vote {
  hash?: string;
  proposalId: string;
  choice: boolean;
}

export class Database extends Dexie {
  proposals!: Table<Proposal>;
  votes!: Table<Vote>;

  constructor() {
    super("dao-tools");
    this.version(1).stores({
      proposals: "hash,from,to",
      votes: "hash,proposalId,choice",
    });
  }
}

export const db = new Database();
