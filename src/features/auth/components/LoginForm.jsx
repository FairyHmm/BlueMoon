import {
  Stack,
  TextInput,
  Button,
  Group,
  Title,
  Text,
  PasswordInput,
  Image,
} from "@mantine/core";
import { useNavigate } from "react-router-dom"; // Import this
import { useAuthStore } from "../../../shared/store/useAuthStore";
import { useState } from "react";
import logo from "../../../shared/assets/BlueMoon.svg?react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate(); // Hook to change pages

  const handleSubmit = () => {
    setError("");
    const result = login(username, password);

    if (!result.success) {
      setError(result.message || "Login failed");
    } else {
      // SUCCESS: Manually navigate to Dashboard
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <Group align="center" justify="center" h="100vh" bg="var(--color-bg-body)">
      <Stack
        maw={400}
        w="100%"
        p="lg"
        bg="var(--color-bg-card)"
        style={{
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
        }}
      >
        <Group justify="center">
          <Image h={"40px"} w="auto" src={logo} />
          <Title c="var(--color-primary)">BlueMoon</Title>
        </Group>
        <Text size="sm" ta="center">
          Login to your account
        </Text>

        <TextInput
          label="Username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <PasswordInput
          label="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Text c="red" size="sm" ta="center">
            {error}
          </Text>
        )}

        <Button fullWidth onClick={handleSubmit}>
          Login
        </Button>
      </Stack>
    </Group>
  );
}
