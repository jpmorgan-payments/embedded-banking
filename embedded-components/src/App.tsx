import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { Welcome } from './components/Welcome/Welcome';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Welcome />
    </MantineProvider>
  );
}
