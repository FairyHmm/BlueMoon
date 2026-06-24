import { Anchor, Group, Image, Paper, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import logo from "../../../shared/assets/BlueMoon.svg";

export default function AuthLayout({
  children,
  title,
  subtitle,
  footerText,
  footerLabel,
  footerHref,
}) {
  return (
    <Group justify="center" align="center" h="100vh" bg="var(--color-bg-body)">
      <Paper w="85%" maw={420} p="xl" radius="md" withBorder>
        <Stack gap="xl">
          <Stack align="center" gap="xs">
            <Image src={logo} h={40} w="auto" alt="BlueMoon Logo" />
            <Title order={2}>BlueMoon</Title>
            <Text size="sm" c="dimmed">
              {subtitle}
            </Text>
          </Stack>

          <Title order={3} ta="center">
            {title}
          </Title>

          {children}

          <Group justify="center" gap={4}>
            <Text size="sm">{footerText}</Text>
            <Anchor component={Link} to={footerHref} fw={600}>
              {footerLabel}
            </Anchor>
          </Group>
        </Stack>
      </Paper>
    </Group>
  );
}
