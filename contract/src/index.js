import {
  NearContract,
  NearBindgen,
  call,
  view,
  near,
  LookupMap,
} from "near-sdk-js";

@NearBindgen
class UserNotes extends NearContract {
  constructor() {
    super();
    this.n = new LookupMap("user_notes");
  }

  @call
  addNote({ uri }) {
    const accountId = near.signerAccountId();
    const notes = this.n.get(accountId);
    this.n.set(accountId, [uri, ...notes]);
  }

  @view
  getAllNotes({ accountId }) {
    return this.n.get(accountId);
  }
}
