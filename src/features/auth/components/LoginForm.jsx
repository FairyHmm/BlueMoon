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
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form"; // Import Mantine Form
import { useAuthStore } from "../../../shared/store/useAuthStore";
import logo from "../../../shared/assets/BlueMoon.svg?react";

export default function LoginForm() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value) => (value.length < 1 ? "Username required" : null),
      password: (value) => (value.length < 1 ? "Password required" : null),
    },
  });

  const handleSubmit = (values) => {
    const result = login(values.username, values.password);

    if (!result.success)
      form.setErrors({ password: result.message || "Login failed" });
    else navigate("/dashboard", { replace: true });
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

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Username"
              placeholder="Username"
              {...form.getInputProps("username")}
            />

            <PasswordInput
              label="Password"
              placeholder="Password"
              {...form.getInputProps("password")}
            />

            {form.errors.password && (
              <Text c="red" size="sm" ta="center">
                {form.errors.password}
              </Text>
            )}

            <Button type="submit" fullWidth>
              Login
            </Button>
          </Stack>
        </form>
      </Stack>
    </Group>
  );
}
