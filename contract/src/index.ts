import { NearContract, NearBindgen, call, view, near } from "near-sdk-js";

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

@NearBindgen
class UserNotes extends NearContract {
  notes: { [key: string]: string[] };

  constructor() {
    super();
    this.notes = {};
  }

  @call
  addNote({ ipfsHash }) {
    assert(ipfsHash.length === 46, "Invalid ipfsHash");

    const accountId = near.signerAccountId();

    near.log(`Adding the ipfsHash ${ipfsHash} to ${accountId}`);
    const notes = this.notes[accountId] || [];

    this.notes[accountId] = [ipfsHash, ...notes];
  }

  @view
  getAllNotes({ accountId }) {
    near.log(`Getting all the notes from ${accountId}`);
    return this.notes[accountId] || [];
  }
}
