import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useAuthStore } from "../../../shared/store/useAuthStore";

export default function LoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const user = useAuthStore((s) => s.user);
  const ready = useAuthStore((s) => s.ready);

  // Navigate only once auth state is confirmed — avoids the flicker from
  // navigating immediately on submit before onAuthStateChanged fires.
  useEffect(() => {
    if (ready && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [ready, user, navigate]);

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
    }
    // Navigation is handled by the useEffect above once user is set.
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
          <Button type="submit" fullWidth loading={form.submitting}>
            Sign In
          </Button>
        </Stack>
      </form>
    </AuthLayout>
  );
}
