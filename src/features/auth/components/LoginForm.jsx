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
      username: (v) => (!v ? "Vui lòng nhập tên đăng nhập" : null),
      password: (v) => (!v ? "Vui lòng nhập mật khẩu" : null),
    },
  });

  const handleSubmit = async (values) => {
    const result = await login(values.username, values.password);

    if (result && !result.success) {
      form.setFieldError("password", result.message || "Thông tin đăng nhập không hợp lệ");
    }
    // Navigation is handled by the useEffect above once user is set.
  };

  return (
    <AuthLayout
      title="Chào mừng trở lại"
      subtitle="Đăng nhập để tiếp tục"
      footerText="Chưa có tài khoản?"
      footerLabel="Đăng ký"
      footerHref="/register"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Tên đăng nhập"
            placeholder="Nhập tên đăng nhập"
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            {...form.getInputProps("password")}
          />
          <Button type="submit" fullWidth loading={form.submitting}>
            Đăng nhập
          </Button>
        </Stack>
      </form>
    </AuthLayout>
  );
}
