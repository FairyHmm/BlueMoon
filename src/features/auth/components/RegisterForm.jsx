import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useAuthStore } from "../../../shared/store/useAuthStore";

export default function RegisterForm() {
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);
  const user = useAuthStore((s) => s.user);
  const ready = useAuthStore((s) => s.ready);

  useEffect(() => {
    if (ready && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [ready, user, navigate]);

  const form = useForm({
    initialValues: {
      displayName: "",
      username: "",
      password: "",
      confirmPassword: "",
      apartmentId: "",
    },
    validate: {
      displayName: (v) => (!v ? "Vui lòng nhập tên hiển thị" : null),
      username: (v) => (!v ? "Vui lòng nhập tên đăng nhập" : null),
      password: (v) => (v.length < 6 ? "Tối thiểu 6 ký tự" : null),
      confirmPassword: (v, values) =>
        v !== values.password ? "Mật khẩu không khớp" : null,
      apartmentId: (v) => (!v ? "Vui lòng nhập mã căn hộ" : null),
    },
  });

  const handleSubmit = async (values) => {
    const result = await register(
      values.displayName,
      values.username,
      values.password,
      values.apartmentId,
    );

    if (!result.success) {
      if (result.message.includes("Apartment"))
        form.setFieldError("apartmentId", result.message);
      else form.setErrors({ username: result.message });
    }
    // Navigation is handled by the useEffect above once user is set.
  };

  return (
    <AuthLayout
      title="Tạo tài khoản"
      subtitle="Tham gia BlueMoon"
      footerText="Đã có tài khoản?"
      footerLabel="Đăng nhập"
      footerHref="/login"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Họ và tên"
            placeholder="VD: Nguyễn Văn A"
            description="Đây là tên mà cư dân sẽ thấy"
            {...form.getInputProps("displayName")}
          />

          <TextInput
            label="Tên đăng nhập"
            placeholder="alex"
            {...form.getInputProps("username")}
          />

          <PasswordInput
            label="Mật khẩu"
            placeholder="Tạo mật khẩu"
            {...form.getInputProps("password")}
          />

          <PasswordInput
            label="Xác nhận mật khẩu"
            placeholder="Xác nhận mật khẩu"
            {...form.getInputProps("confirmPassword")}
          />

          <TextInput
            label="Mã căn hộ"
            placeholder="101"
            description="Nhập mã căn hộ của bạn"
            {...form.getInputProps("apartmentId")}
          />

          <Button type="submit" fullWidth loading={form.submitting}>
            Tạo tài khoản
          </Button>
        </Stack>
      </form>
    </AuthLayout>
  );
}
