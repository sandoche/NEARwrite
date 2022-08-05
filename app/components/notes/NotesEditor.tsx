import { useState } from 'react';
import { Paper, SimpleGrid } from '@mantine/core';
import dynamic from 'next/dynamic';
import rehypeSanitize from 'rehype-sanitize';

import '@uiw/react-markdown-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(() => import('@uiw/react-markdown-editor').then((mod) => mod.default), { ssr: false });
const MDPreview = dynamic(() => import('@uiw/react-markdown-preview').then((mod) => mod.default), { ssr: false });

const NotesEditor = () => {
  const [note, setNote] = useState('');

  return (
    <div data-color-mode="light">
      <SimpleGrid cols={2}>
        <MDEditor
          value={note}
          onChange={setNote}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
        <Paper p="md">
          <MDPreview source={note} />
        </Paper>
      </SimpleGrid>
    </div>
  );
};

export default NotesEditor;
