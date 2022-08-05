import { useState } from 'react';
import { Button, Paper, SimpleGrid, Text } from '@mantine/core';
import dynamic from 'next/dynamic';

import en from '@/locales/en.json';
import addNoteToIpfs from '@/services/ipfs';

import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(() => import('@uiw/react-markdown-editor').then((mod) => mod.default), { ssr: false });
const MDPreview = dynamic(() => import('@uiw/react-markdown-preview').then((mod) => mod.default), { ssr: false });

const NotesEditor = () => {
  const [note, setNote] = useState(`# Note of  ${new Date().toDateString()}
  
What's up today?`);

  const saveNote = async () => {
    const cid = await addNoteToIpfs(note);
    console.info(cid);
  };

  return (
    <>
      <SimpleGrid cols={2}>
        <div data-color-mode="light">
          <MDEditor value={note} onChange={setNote} />
        </div>
        <div data-color-mode="light">
          <Paper p="md">
            <MDPreview source={note} />
          </Paper>
        </div>
      </SimpleGrid>
      <Text align="right">
        <Button mt="lg" color="indigo" size="lg" onClick={saveNote}>
          {en.notes.save}
        </Button>
      </Text>
    </>
  );
};

export default NotesEditor;
