import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useAuthStore } from "../../../shared/store/useAuthStore";

export default function RegisterForm() {
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);

  const form = useForm({
    initialValues: {
      displayName: "",
      username: "",
      password: "",
      confirmPassword: "",
      apartmentId: "",
    },
    validate: {
      displayName: (v) => (!v ? "Display name required" : null),
      username: (v) => (!v ? "Username required" : null),
      password: (v) => (v.length < 6 ? "Minimum 6 characters" : null),
      confirmPassword: (v, values) =>
        v !== values.password ? "Passwords do not match" : null,
      apartmentId: (v) => (!v ? "Apartment ID required" : null),
    },
  });

  const handleSubmit = (values) => {
    const result = register(
      values.displayName,
      values.username,
      values.password,
      values.apartmentId,
    );

    if (!result.success) {
      if (result.message.includes("Apartment"))
        form.setFieldError("apartmentId", result.message);
      else form.setErrors({ username: result.message });
      return;
    }

    navigate("/dashboard");
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Join BlueMoon"
      footerText="Already have an account?"
      footerLabel="Login"
      footerHref="/login"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Full Name"
            placeholder="e.g. Alex Rivers"
            description="This is how residents will see you"
            {...form.getInputProps("displayName")}
          />

          <TextInput
            label="Username"
            placeholder="alex"
            {...form.getInputProps("username")}
          />

          <PasswordInput
            label="Password"
            placeholder="Create password"
            {...form.getInputProps("password")}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm password"
            {...form.getInputProps("confirmPassword")}
          />

          <TextInput
            label="Apartment ID"
            placeholder="101"
            description="Enter your assigned unit code"
            {...form.getInputProps("apartmentId")}
          />

          <Button type="submit" fullWidth>
            Create Account
          </Button>
        </Stack>
      </form>
    </AuthLayout>
  );
}
