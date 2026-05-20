import { Group, Text, TextInput, ActionIcon, Image } from "@mantine/core";
import { IconSearch, IconBell, IconUserCircle } from "@tabler/icons-react";
import classes from "../styles//header.module.css";
import logo from "../../shared/assets/BlueMoon.svg?react";

export default function Header() {
  return (
    <Group
      component="header"
      justify="space-between"
      className={classes["header-root"]}
    >
      <Group>
        <Image h={"40px"} w="auto" src={logo} />
        <Text size="xl" className={classes["logo-text"]}>
          BlueMoon
        </Text>
      </Group>

      <TextInput
        placeholder="Search..."
        leftSection={<IconSearch size="1.1rem" stroke={1.5} />}
        radius="md"
        className={classes["search-input"]}
        classNames={{ input: classes["inner-input"] }}
      />

      <Group gap="xs" className={classes["action-group"]}>
        <ActionIcon
          size="lg"
          className={classes["icon-button"]}
          aria-label="Notifications"
        >
          <IconBell size="1.4rem" stroke={1.5} />
        </ActionIcon>

        <ActionIcon
          size="lg"
          className={classes["icon-button"]}
          aria-label="User profile"
        >
          <IconUserCircle size="1.4rem" stroke={1.5} />
        </ActionIcon>
      </Group>
    </Group>
  );
}
