import { AppShell, Box, Button } from "@mantine/core";
import { Home, NavBar, StatusBar, ToolBar } from "./ui";

function App() {
  return (
    <Box>
      <AppShell header={<ToolBar />} navbar={<NavBar />} footer={<StatusBar />}>
        <Home />
      </AppShell>
    </Box>
  );
}
export default App;
