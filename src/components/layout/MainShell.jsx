import { AppShell } from '@mantine/core';
import Header from './Header';
import Navigation from './Navigation';
import classes from '../../styles/components/shell.module.css';

export default function MainShell({ children }) {
  return (
    <AppShell
      header={{ height: 'var(--bm-header-height)' }}
      navbar={{
        width: 'var(--bm-rail-width)',
        breakpoint: 'md'
      }}
      classNames={{
        header: classes['shell-header'],
        navbar: classes['shell-navbar'],
        main: classes['shell-main'],
      }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navigation />
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
