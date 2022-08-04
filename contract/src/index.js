import {
  NearContract,
  NearBindgen,
  call,
  view,
  near,
  LookupMap,
} from "near-sdk-js";
import assert from "./utilities/assert";

@NearBindgen
class UserNotes extends NearContract {
  constructor() {
    super();
    this.n = new LookupMap("user_notes");
  }

  deserialize() {
    super.deserialize();
    this.n = Object.assign(new LookupMap(), this.n);
  }

  @call
  addNote({ ipfsHash }) {
    assert(ipfsHash.length === 46, "Invalid ipfsHash");
    const accountId = near.signerAccountId();
    near.log(`Adding the ipfsHash ${ipfsHash} to ${accountId}`);
    const notes = this.n.get(accountId);
    this.n.set(accountId, [ipfsHash, ...notes]);
  }

  @view
  getAllNotes({ accountId }) {
    near.log(`Getting all the notes from ${accountId}`);
    return this.n.get(accountId);
  }
}
