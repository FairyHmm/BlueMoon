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
    const run = () => {
      const user = useAuthStore.getState().user;
      useDbStore.getState().init(user?.id || null);
    };

    // run once after mount
    run();

    // 🔥 THIS is the missing piece
    const unsub = useAuthStore.subscribe((state) => {
      useDbStore.getState().init(state.user?.id || null);
    });

    return unsub;
  }, []);

  return (
    <MantineProvider theme={theme}>
      <AppRoutes />
    </MantineProvider>
  );
}
