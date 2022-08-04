import {
  NearContract,
  NearBindgen,
  call,
  view,
  near,
  LookupMap,
} from "near-sdk-js";

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

@NearBindgen
class UserNotes extends NearContract {
  notes: LookupMap<string, string[]>;

  constructor() {
    super();
    this.notes = new LookupMap("user_notes");
  }

  deserialize() {
    super.deserialize();
    this.notes = Object.assign(new LookupMap("user_notes"), this.notes);
  }

  @call
  addNote({ ipfsHash }) {
    assert(ipfsHash.length === 46, "Invalid ipfsHash");
    const accountId = near.signerAccountId();
    near.log(`Adding the ipfsHash ${ipfsHash} to ${accountId}`);
    const notes = this.notes.get(accountId) || [];
    this.notes.set(accountId, [ipfsHash, ...notes]);
  }

  @view
  getAllNotes({ accountId }) {
    near.log(`Getting all the notes from ${accountId}`);
    return this.notes.get(accountId);
  }
}
