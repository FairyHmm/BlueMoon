import { useEffect } from "react";
import { MantineProvider } from "@mantine/core";
import { theme } from "./styles/theme";
import { useAuthStore } from "../shared/store/useAuthStore";
import AppRoutes from "./routes/AppRoutes";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "./styles/theme.css";

export default function App() {
  useEffect(() => {
    const unsub = useAuthStore.getState().initAuth();
    return unsub;
  }, []);

  return (
    <MantineProvider theme={theme}>
      <AppRoutes />
    </MantineProvider>
  );
}
