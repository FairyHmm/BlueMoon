import { SegmentedControl, rem } from '@mantine/core';
import { IconHome, IconUsers, IconReceipt, IconSettings } from '@tabler/icons-react';
import classes from '../../styles/components/navigation.module.css';
import scClasses from '../../styles/mantine/segmented-control.module.css';

const navData = [
  { value: 'dashboard', label: <IconHome style={{ width: rem(22), height: rem(22) }} stroke={1.5} /> },
  { value: 'residents', label: <IconUsers style={{ width: rem(22), height: rem(22) }} stroke={1.5} /> },
  { value: 'finance', label: <IconReceipt style={{ width: rem(22), height: rem(22) }} stroke={1.5} /> },
  { value: 'settings', label: <IconSettings style={{ width: rem(22), height: rem(22) }} stroke={1.5} /> },
];

export default function Navigation() {
  return (
    <div className={classes['nav-wrapper']}>
      <SegmentedControl
        data={navData}
        orientation="vertical"
        fullWidth
        classNames={{
          root: scClasses['base-control'],
          control: scClasses['control-item'],
          label: scClasses['control-label'],
          indicator: scClasses['control-indicator'],
        }}
      />
    </div>
  );
}
