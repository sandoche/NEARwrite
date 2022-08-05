import { useState } from 'react';
import { Button, Paper, SimpleGrid, Text } from '@mantine/core';
import dynamic from 'next/dynamic';
import rehypeSanitize from 'rehype-sanitize';

import en from '@/locales/en.json';

import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(() => import('@uiw/react-markdown-editor').then((mod) => mod.default), { ssr: false });
const MDPreview = dynamic(() => import('@uiw/react-markdown-preview').then((mod) => mod.default), { ssr: false });

const NotesEditor = () => {
  const [note, setNote] = useState(`# Note of  ${new Date().toDateString()}
  
What's up today?`);

  return (
    <>
      <SimpleGrid cols={2}>
        <div data-color-mode="light">
          <MDEditor
            hideToolbar={false}
            value={note}
            onChange={setNote}
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
          />
        </div>
        <div data-color-mode="light">
          <Paper p="md">
            <MDPreview source={note} />
          </Paper>
        </div>
      </SimpleGrid>
      <Text align="right">
        <Button mt="lg" color="indigo" size="lg">
          {en.notes.save}
        </Button>
      </Text>
    </>
  );
};

export default NotesEditor;
