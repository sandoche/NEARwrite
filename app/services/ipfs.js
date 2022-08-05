import { create } from 'ipfs-http-client';

const addNote = async (note) => {
  const ipfs = create({ url: 'https://ipfs.infura.io/5001' });
  const content = { note };
  const { cid } = await ipfs.add(JSON.stringify(content));
  return cid;
};

export default addNote;
