import { store } from 'aleph-js';

const addNote = async (note) => {
  const file = new File([JSON.stringify({ note })], 'note.json', { type: 'text/plain' });

  const uploadedFile = await store.submit(null, {
    fileobject: file,
    storage_engine: 'ipfs',
    api_server: 'https://api2.aleph.im',
  });

  return uploadedFile.content.item_hash;
};

export default addNote;
