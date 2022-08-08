# NEARwrite

> NEARwrite is an experimental note taking app storing notes with encryption on NEAR Protocol and IPFS

⚠️ We are currently usin near-sdk-js@next so we do not recommend to use this app in production

## Requirements

- near-cli `npm install -g near-cli`

## Installation

```sh
cd app
npm install

cd ../contract
npm install
```

## Development

### Frontend

```sh
cd app
npm run dev
```

### Smart contract

```sh
cd contract
npm run build
npm run deploy
near call $contract_id init --accountId $contract_id --deposit 0.1
```
