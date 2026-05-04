import { MantineProvider } from '@mantine/core';
import { theme } from './styles/theme';
import './styles/theme.css';
import MainShell from './components/layout/MainShell';
import '@mantine/core/styles.css';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <MainShell>
        <div>Dashboard Content</div>
      </MainShell>
    </MantineProvider>
  );
}
