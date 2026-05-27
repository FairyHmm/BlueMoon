import { useEffect } from "react";
import { MantineProvider } from "@mantine/core";
import { theme } from "./styles/theme";
import { useDbStore } from "../shared/store/useDbStore";
import AppRoutes from "./routes/AppRoutes";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "./styles/theme.css";

export default function App() {
  useEffect(() => {
    useDbStore.getState().init(null);
  }, []);

  return (
    <MantineProvider theme={theme}>
      <AppRoutes />
    </MantineProvider>
  );
}
