import { ActionIcon, Group, Image, Menu, Text } from "@mantine/core";
import { IconLogout, IconUserCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../shared/store/useAuthStore";
import logo from "../../shared/assets/BlueMoon.svg?react";
import classes from "../styles/header.module.css";

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
      <Group gap="sm">
        <Image h={40} w="auto" src={logo} />

        <Text size="xl" className={classes["logo-text"]}>
          BlueMoon
        </Text>
      </Group>

      <Menu shadow="md" width={220} position="bottom-end">
        <Menu.Target>
          <ActionIcon
            size="lg"
            className={classes["icon-button"]}
            aria-label="User menu"
          >
            <IconUserCircle />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown bg="var(--color-bg-card)">
          <Menu.Label c="dimmed">
            {user?.username} ({user?.role})
          </Menu.Label>

          <Menu.Divider />

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
  );
}
