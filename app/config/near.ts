import { CONTRACT_ID, HOST } from '@/constants';

const signInOptions = {
  contractId: CONTRACT_ID,
  methodNames: ['addNote'],
  successUrl: `${HOST}/notes`,
  failureUrl: `${HOST}/`,
};

export default signInOptions;
