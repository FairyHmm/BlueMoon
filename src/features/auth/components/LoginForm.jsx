import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useAuthStore } from "../../../shared/store/useAuthStore";

export default function LoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const form = useForm({
    initialValues: { username: "", password: "" },
    validate: {
      username: (v) => (!v ? "Username required" : null),
      password: (v) => (!v ? "Password required" : null),
    },
  });

  const handleSubmit = async (values) => {
    const result = await login(values.username, values.password);

    if (result && !result.success) {
      form.setFieldError("password", result.message || "Invalid credentials");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue"
      footerText="Don't have an account?"
      footerLabel="Register"
      footerHref="/register"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Username"
            placeholder="Enter username"
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter password"
            {...form.getInputProps("password")}
          />
          <Button type="submit" fullWidth>
            Sign In
          </Button>
        </Stack>
      </form>
    </AuthLayout>
  );
}
