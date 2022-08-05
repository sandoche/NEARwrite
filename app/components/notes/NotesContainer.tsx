import { AppShell, Navbar, Header } from '@mantine/core';

import NotesEditor from '@/components/notes/NotesEditor';
import NotesNavigation from '@/components/notes/NotesNavigation';

const NotesContainer = () => {
  return (
    <AppShell
      padding="md"
      navbar={<NotesNavigation />}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <NotesEditor />
    </AppShell>
  );
};

export default NotesContainer;
