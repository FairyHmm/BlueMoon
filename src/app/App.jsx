import { MantineProvider } from "@mantine/core";
import { theme } from "./styles/theme";
import AppRoutes from "./routes/AppRoutes";
import "@mantine/core/styles.css";
import "./styles/theme.css";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <AppRoutes />
    </MantineProvider>
  );
}
