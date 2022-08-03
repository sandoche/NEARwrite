import { Worker } from "near-workspaces";
import test from "ava";

test.beforeEach(async (t) => {
  // Init the worker and start a Sandbox server
  const worker = await Worker.init();

  // Prepare sandbox for tests, create accounts, deploy contracts, etc.
  const root = worker.rootAccount;

  // Deploy the counter contract.
  const contract = await root.devDeploy("./build/contract.wasm");

  // Init the contract
  await contract.call(contract, "init", {});

  // Test users
  const alice = await root.createSubAccount("alice");
  const bob = await root.createSubAccount("bob");

  // Save state for test runs
  t.context.worker = worker;
  t.context.accounts = { root, contract, alice, bob };
});

// If the environment is reused, use test.after to replace test.afterEach
test.afterEach(async (t) => {
  await t.context.worker.tearDown().catch((error) => {
    console.log("Failed to tear down the worker:", error);
  });
});

test("Add a hash to the notes of alice", async (t) => {
  const { accounts } = t.context;
  const { contract, alice } = accounts;
  await alice.call(contract, "addNote", {
    ipfsHash: "Qmbx3aPb36KZwrPH1KPT94EsGkyHKVMxf9CaufwQYAkkvX",
  });
  const notes = await alice.view(contract, "getAllNotes", {
    accountId: alice.accountId,
  });
  t.deepEqual(notes, ["Qmbx3aPb36KZwrPH1KPT94EsGkyHKVMxf9CaufwQYAkkvX"]);
});
