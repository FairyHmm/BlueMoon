import { useEffect } from "react";
import { MantineProvider } from "@mantine/core";
import { theme } from "./styles/theme";
import { useAuthStore } from "../shared/store/useAuthStore";
import { useDbStore } from "../shared/store/useDbStore";
import AppRoutes from "./routes/AppRoutes";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "./styles/theme.css";

export default function App() {
  useEffect(() => {
    const user = useAuthStore.getState().user;

    if (user?.id) {
      useDbStore.getState().init(user.id);
    } else {
      useDbStore.getState().init(null);
    }
  }, []);

  return (
    <MantineProvider theme={theme}>
      <AppRoutes />
    </MantineProvider>
  );
}
