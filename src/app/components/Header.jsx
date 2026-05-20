import { Group, Text, TextInput, ActionIcon, Image, Menu } from "@mantine/core";
import {
  IconSearch,
  IconBell,
  IconUserCircle,
  IconLogout,
  IconSettings,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import classes from "../styles/header.module.css";
import logo from "../../shared/assets/BlueMoon.svg?react";
import { useAuthStore } from "../../shared/store/useAuthStore";

export default function Header() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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

        {/* User Menu */}
        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <ActionIcon
              size="lg"
              className={classes["icon-button"]}
              aria-label="User menu"
            >
              <IconUserCircle size="1.4rem" stroke={1.5} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>
              {user?.username} ({user?.role})
            </Menu.Label>
            <Menu.Divider />
            <Menu.Item
              leftSection={<IconSettings size={14} />}
              onClick={() => navigate("/settings")}
            >
              Settings
            </Menu.Item>
            <Menu.Item
              color="red"
              leftSection={<IconLogout size={14} />}
              onClick={handleLogout}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
}
